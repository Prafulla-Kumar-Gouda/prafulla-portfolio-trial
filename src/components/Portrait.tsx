import { profile } from '../data/profile'
import photo from '../assets/profile.jpg'

// Circular portrait. To change the photo, replace src/assets/profile.jpg (square crop around the face works best).
export default function Portrait({ className = '' }: { className?: string; monogramClass?: string }) {
  return (
    <span className={`relative block overflow-hidden rounded-full bg-surface2 ${className}`}>
      <img src={photo} alt={`Portrait of ${profile.name}`} width={640} height={640} className="h-full w-full object-cover" />
    </span>
  )
}
