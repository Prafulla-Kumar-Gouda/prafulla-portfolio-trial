// Scroll reveal: ONE shared IntersectionObserver toggles the class "in" on elements tagged with data-reveal; the animation
// itself is a CSS transition (fade + upward movement). An element reveals when ~12% of it is visible and resets once it has
// fully left the screen, so it plays again when scrolled back into view. Hidden start states exist only under
// html.motion-ready (set by a small script in index.html when IntersectionObserver is supported and reduced motion is off).
let io: IntersectionObserver | null | undefined

function observer() {
  if (io !== undefined) return io
  if (typeof IntersectionObserver === 'undefined') return (io = null)
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.intersectionRatio >= 0.12) e.target.classList.add('in')
        else if (!e.isIntersecting) e.target.classList.remove('in')
      }
    },
    { threshold: [0, 0.12], rootMargin: '0px 0px -6% 0px' },
  )
  ;(window as unknown as { __motionReady?: boolean }).__motionReady = true // tells index.html the animation layer started
  return io
}

// Stable ref callback (React 19 runs the returned function on unmount).
const refObserve = (el: Element | null) => {
  const o = observer()
  if (!el || !o) return
  o.observe(el)
  return () => o.unobserve(el)
}

// Spread onto any element: <li {...reveal(2)}>. The number is the stagger position (0 to 6): higher appears later.
export const reveal = (step = 0) => ({ ref: refObserve, 'data-reveal': '', 'data-d': step > 0 ? Math.min(step, 6) : undefined })
