import { ShieldCheck } from 'lucide-react'
import { useFileAvailable } from '../hooks/useFileAvailable'

// Shows the official NCC emblem when the real file /public/ncc-logo.png exists, sized like the other card icons.
// Until then the card keeps a neutral icon rather than a redrawn imitation of the emblem.
export default function NccLogo() {
  const url = './ncc-logo.png'
  const has = useFileAvailable(url, 'image')
  return has ? (
    <img src={url} alt="National Cadet Corps emblem" width={24} height={24} className="h-6 w-6 object-contain" />
  ) : (
    <ShieldCheck size={22} aria-hidden />
  )
}
