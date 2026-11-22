import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import ResumeButtons from './ResumeButtons'
import Portrait from './Portrait'
import Sidebar, { navItems } from './Sidebar'
import type { Theme } from '../hooks/useTheme'

// Large screens: the side rail. Phones and tablets: this compact top bar with a menu.
export default function Navbar({ theme, onToggle, active }: { theme: Theme; onToggle: () => void; active: string }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <Sidebar theme={theme} onToggle={onToggle} active={active} />
      <header className="safe-top fixed inset-x-0 top-0 z-40 border-b border-line lg:hidden" style={{ background: 'color-mix(in srgb, var(--bg) 92%, transparent)', backdropFilter: 'blur(8px)' }}>
        <div className="wrap flex h-16 items-center justify-between gap-4">
          <a href="#home" aria-label="Prafulla Kumar Gouda, back to top of page" className="shrink-0 rounded-full ring-2 ring-accent ring-offset-2 ring-offset-bg" onClick={() => setOpen(false)}>
            <Portrait className="h-11 w-11" monogramClass="text-lg" />
          </a>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex"><ResumeButtons compact /></div>
            <ThemeToggle theme={theme} onToggle={onToggle} />
            <button type="button" className="btn !px-0 w-11" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
              {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
            </button>
          </div>
        </div>
        {open && (
          <nav id="mobile-menu" aria-label="Mobile" className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line" style={{ background: 'var(--bg)' }}>
            <ul className="wrap py-2">
              {navItems.map(({ id, label, icon: Icon }) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={() => setOpen(false)} aria-current={active === id ? 'location' : undefined}
                    className={`flex min-h-12 items-center gap-3 border-b border-line text-lg ${active === id ? 'font-semibold text-accent' : 'text-ink'}`}>
                    <Icon size={20} aria-hidden /> {label}
                  </a>
                </li>
              ))}
              <li className="py-4 sm:hidden"><ResumeButtons compact /></li>
            </ul>
          </nav>
        )}
      </header>
    </>
  )
}
