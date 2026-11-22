import { useEffect, useState } from 'react'

// The focus words swap with a clean masked slide: the old word rises and fades out, the new one rises in.
// Screen readers get the full list once; the animated copy is hidden from them. Visitors who prefer reduced motion get a
// still line, and rotation pauses while the pointer is over it.
export default function RotatingText({ words }: { words: string[] }) {
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [i, setI] = useState(0)
  const [prev, setPrev] = useState(-1)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reduce || paused) return
    const t = window.setInterval(() => {
      if (document.hidden) return
      setI((n) => { setPrev(n); return (n + 1) % words.length })
    }, 2800)
    return () => window.clearInterval(t)
  }, [reduce, paused, words.length])

  if (reduce) return <span className="text-[0.6em] normal-case">{words.join(' | ')}</span>
  return (
    <span onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <span className="sr-only">{words.join(', ')}</span>
      <span className="rot" aria-hidden>
        {words.map((w, n) => (
          <span key={w} className={`rot-w ${n === i ? 'is-on' : n === prev ? 'is-off' : ''}`}>{w}</span>
        ))}
      </span>
    </span>
  )
}
