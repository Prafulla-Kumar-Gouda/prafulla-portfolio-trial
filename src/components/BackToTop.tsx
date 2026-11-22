import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!show) return null
  return (
    <aside aria-label="Back to top">
    <a href="#home" className="btn btn-primary fixed right-4 z-30 !px-0 w-12 h-12 rounded-full max-lg:bottom-[calc(4.75rem+env(safe-area-inset-bottom))]!" style={{ bottom: 'max(1.25rem, env(safe-area-inset-bottom))' }} aria-label="Back to top">
      <ArrowUp size={20} aria-hidden />
    </a>
    </aside>
  )
}
