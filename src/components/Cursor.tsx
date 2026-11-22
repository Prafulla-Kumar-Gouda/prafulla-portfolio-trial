import { useEffect, useRef } from 'react'

// A soft gold ring that trails the mouse (desktop with a mouse only). It grows over links and buttons. The normal cursor
// stays visible, and the animation loop stops as soon as the ring has caught up, so nothing runs while the mouse is still.
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0, shown = false
    const loop = () => {
      x += (tx - x) * 0.2; y += (ty - y) * 0.2
      el.style.transform = `translate3d(${x - 14}px, ${y - 14}px, 0)`
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.4 ? requestAnimationFrame(loop) : 0
    }
    const move = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY
      if (!shown) { shown = true; x = tx; y = ty; el.classList.add('on') }
      if (!raf) raf = requestAnimationFrame(loop)
    }
    const over = (e: MouseEvent) => el.classList.toggle('big', !!(e.target as Element).closest?.('a, button, [role=tab], input, textarea, label'))
    const leave = () => { shown = false; el.classList.remove('on') }
    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    document.documentElement.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.documentElement.removeEventListener('mouseleave', leave)
      cancelAnimationFrame(raf)
    }
  }, [])
  return <div ref={ref} className="cursor-ring" aria-hidden />
}
