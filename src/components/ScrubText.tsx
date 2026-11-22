import { useEffect, useRef, type CSSProperties } from 'react'
import { motionOn, onScrollFrame } from '../scrollFrame'

// Paragraph whose words brighten one after another as it scrolls into the middle of the screen. Only ONE CSS variable
// (--p) is updated per frame; each word's brightness is calculated by CSS. Without motion the text is fully visible.
export default function ScrubText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !motionOn()) return
    return onScrollFrame(() => {
      const r = el.getBoundingClientRect()
      const h = window.innerHeight
      const p = Math.min(1, Math.max(0, (h * 0.9 - r.top) / (h * 0.45)))
      el.style.setProperty('--p', p.toFixed(3))
    })
  }, [])
  const words = text.split(' ')
  return (
    <p ref={ref} data-scrub className={className}>
      {words.map((w, n) => (
        <span key={n}>
          <span className="sw" style={{ '--k': (n / words.length).toFixed(3) } as CSSProperties}>{w}</span>{' '}
        </span>
      ))}
    </p>
  )
}
