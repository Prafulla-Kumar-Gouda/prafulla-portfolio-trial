import { useEffect, useState } from 'react'
import { Download, Mail } from 'lucide-react'
import { LinkedinIcon } from './BrandIcons'
import { useResumeAvailable } from '../hooks/useResumeAvailable'
import { profile } from '../data/profile'

// Phone and tablet only: once the visitor has scrolled past the first screen, keep the two most useful actions in reach.
export default function MobileActionBar() {
  const [show, setShow] = useState(false)
  const { available, url } = useResumeAvailable()
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!show) return null
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface lg:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="mx-auto flex max-w-xl gap-3 px-4 py-2.5">
        <a href="#contact" className="btn btn-primary flex-1"><Mail size={17} aria-hidden /> Contact</a>
        {available ? (
          <a href={url} download={profile.resumeFile} className="btn btn-outline-accent flex-1"><Download size={17} aria-hidden /> Resume</a>
        ) : (
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn flex-1"><LinkedinIcon size={17} /> LinkedIn</a>
        )}
      </div>
    </nav>
  )
}
