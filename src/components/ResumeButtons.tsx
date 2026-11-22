import { Download, Eye } from 'lucide-react'
import { useResumeAvailable } from '../hooks/useResumeAvailable'
import { profile } from '../data/profile'

export default function ResumeButtons({ compact = false, label = 'Download Resume', className = '' }: { compact?: boolean; label?: string; className?: string }) {
  const { available, url } = useResumeAvailable()

  if (!available) {
    return (
      <span
        className={`btn ${className}`}
        role="link"
        aria-disabled="true"
        title={`Add ${profile.resumeFile} to the /public folder to enable this button`}
      >
        <Download size={17} aria-hidden /> {label}
      </span>
    )
  }
  // Use the solid gold look unless the caller asked for another style; mixing both made gold text on a gold background.
  const look = /btn-(primary|outline-accent)/.test(className) ? '' : 'btn-primary'
  return (
    <>
      <a className={`btn ${look} ${className}`} href={url} download={profile.resumeFile}>
        <Download size={17} aria-hidden /> {label}
      </a>
      {!compact && (
        <a className="btn" href={url} target="_blank" rel="noopener noreferrer">
          <Eye size={17} aria-hidden /> View Resume
        </a>
      )}
    </>
  )
}