import { Briefcase, Code2, Flag, GraduationCap, Home, Mail, Rocket, User, type LucideIcon } from 'lucide-react'
import Portrait from './Portrait'
import ThemeToggle from './ThemeToggle'
import ResumeButtons from './ResumeButtons'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { profile } from '../data/profile'
import type { Theme } from '../hooks/useTheme'

export const navItems: { id: string; label: string; icon: LucideIcon }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'projects', label: 'Projects', icon: Rocket },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'leadership', label: 'Leadership', icon: Flag },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'contact', label: 'Contact', icon: Mail },
]
const updated = new Date(__BUILD_DATE__).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })

// Compact dashboard-style side rail for large screens. Phones and tablets use the top bar instead.
export default function Sidebar({ theme, onToggle, active }: { theme: Theme; onToggle: () => void; active: string }) {
  return (
    <aside aria-label="Site navigation" className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-line bg-sidebar lg:flex">
      <div className="sb-profile px-5 pb-4 pt-6">
        <a href="#home" aria-label={`${profile.name}, back to top of page`} className="block w-fit rounded-2xl transition-transform hover:scale-105">
          <Portrait className="sb-avatar-img h-16 w-16 !rounded-2xl border border-line" monogramClass="text-2xl" />
        </a>
        <p className="mt-3 font-display text-lg font-semibold leading-tight">{profile.name}</p>
        <p className="mt-1 text-sm leading-snug text-muted">Data Analytics &amp; Business Intelligence</p>
        <p className="sb-location mt-1 text-sm text-muted">Bengaluru, India</p>
        <p className="sb-badge mt-3 inline-flex items-center gap-2 rounded-full border border-line bg-bg px-3 py-1 text-[0.8125rem] font-semibold">
          <span className="h-2 w-2 rounded-full bg-secondary" aria-hidden /> Open to opportunities
        </p>
      </div>

      <nav aria-label="Primary" className="flex-1 overflow-y-auto px-3 py-2">
        <ul className="grid gap-1">
          {navItems.map(({ id, label, icon: Icon }) => {
            const on = active === id
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={on ? 'location' : undefined}
                  className={`sb-link flex min-h-11 items-center gap-3 rounded-xl border px-3.5 text-[0.95rem] no-underline transition-colors ${
                    on ? 'border-accent/40 bg-hover font-medium text-ink shadow-[inset_3px_0_0_var(--accent)]' : 'border-transparent text-ink hover:bg-hover'
                  }`}
                >
                  <Icon size={18} aria-hidden className={on ? 'text-accent' : 'text-muted'} />
                  {label}
                  {on && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="sb-foot grid gap-2 border-t border-line p-4">
        <div className="flex items-center gap-2">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn !min-h-11 flex-1 !gap-2 !px-3 text-sm"><LinkedinIcon size={16} /> LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn !min-h-11 flex-1 !gap-2 !px-3 text-sm"><GithubIcon size={16} /> GitHub</a>
        </div>
        <div className="flex items-center gap-2">
          <ResumeButtons compact label="Resume" className="btn-outline-accent flex-1" />
          <ThemeToggle theme={theme} onToggle={onToggle} />
        </div>
        <p className="sb-updated text-center text-[0.8125rem] text-muted">Last updated {updated}</p>
      </div>
    </aside>
  )
}
