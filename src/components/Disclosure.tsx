import { useId, useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

// Inline "Read more": collapsed by default, opens in place when the visitor asks.
export default function Disclosure({ children, more = 'Read more', less = 'Show less', openOnDesktop = false }: { children: ReactNode; more?: string; less?: string; openOnDesktop?: boolean }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <div>
      <button type="button" className={`mt-2 inline-flex min-h-11 items-center gap-1.5 rounded-md py-1 font-semibold text-accent hover:underline ${openOnDesktop ? 'lg:hidden' : ''}`} aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        {open ? less : more}
        <ChevronDown size={16} aria-hidden className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div id={id} hidden={!open && !openOnDesktop} className={`pt-3 ${!open && openOnDesktop ? 'max-lg:hidden' : ''}`}>{children}</div>
    </div>
  )
}
