import { useEffect, useRef, useState } from 'react'

// Keeps the highlighted navigation tab in step with the page, in both directions:
//  - scrolling by hand: an IntersectionObserver watches a thin band across the viewport and the section inside it is active;
//  - clicking a tab (or back/forward, or a typed address): the tab is highlighted at once and scroll-driven updates pause
//    until the smooth scroll has finished, so the highlight does not flicker through the sections in between.
// While scrolling, the address bar follows the section (#about, #skills ...) without adding history entries, so a refresh
// or a copied link returns to the same place. Home clears the hash.
export function useScrollSpy(ids: readonly string[]) {
  const initial = () => {
    const h = window.location.hash.slice(1)
    return ids.includes(h) ? h : ids[0]
  }
  const [active, setActive] = useState<string>(initial)
  const locked = useRef(false)
  const timer = useRef<number | undefined>(undefined)
  const visible = useRef(new Set<string>())
  const evaluateRef = useRef<() => void>(() => {})

  useEffect(() => {
    const evaluate = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      let next: string | undefined
      if (atBottom) next = ids[ids.length - 1]
      else if (window.scrollY < 8) next = ids[0]
      else next = [...ids].reverse().find((id) => visible.current.has(id))
      if (next) setActive((prev) => (prev === next ? prev : next))
    }
    evaluateRef.current = evaluate

    const unlock = () => {
      locked.current = false
      window.clearTimeout(timer.current)
      evaluate()
    }
    const lock = () => {
      locked.current = true
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(unlock, 1200) // fallback if the browser has no scrollend event
      window.addEventListener('scrollend', unlock, { once: true })
    }

    const io = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.current.add(e.target.id) : visible.current.delete(e.target.id)))
        if (!locked.current) evaluate()
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }, // a band across the upper-middle of the screen
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io?.observe(el)
    })

    // The first and last sections need a nudge: the top of the page, and a last section too short to reach the band.
    const onScroll = () => { if (!locked.current) evaluate() }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Tab click, back/forward or a typed address: highlight immediately and pause scroll-driven updates.
    const onHash = () => {
      const h = window.location.hash.slice(1)
      if (ids.includes(h)) { setActive(h); lock() }
    }
    window.addEventListener('hashchange', onHash)

    // Arriving on a link such as site/#education: go there once the page has been drawn.
    const h = window.location.hash.slice(1)
    if (ids.includes(h) && h !== ids[0]) {
      lock()
      requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(h)?.scrollIntoView({ behavior: 'auto' })))
    }

    return () => {
      io?.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('hashchange', onHash)
      window.removeEventListener('scrollend', unlock)
      window.clearTimeout(timer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Mirror the active section in the address bar (no new history entries). Project details links are left alone.
  useEffect(() => {
    if (locked.current) return
    const hash = window.location.hash
    if (hash.startsWith('#project-')) return
    const wanted = active === ids[0] ? '' : `#${active}`
    if (hash !== wanted && !(wanted === '' && hash === '')) {
      window.history.replaceState(window.history.state, '', wanted === '' ? window.location.pathname + window.location.search : wanted)
    }
  }, [active, ids])

  return active
}
