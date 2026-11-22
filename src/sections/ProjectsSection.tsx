import { useEffect, useState } from 'react'
import { BarChart3, BookOpen, Cog, Download, ExternalLink, Globe, LayoutDashboard, type LucideIcon } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { GithubIcon } from '../components/BrandIcons'
import SkillIcon from '../components/SkillIcon'
import CaseStudyModal from './CaseStudyModal'
import ProjectModal from './ProjectModal'
import { featured, filters, projects, type Category, type Project } from '../data/projects'
import { reveal } from '../motion'

type Filter = (typeof filters)[number]

const categoryIcon: Record<Category, LucideIcon> = {
  'Data Science': BarChart3,
  'Business Intelligence': LayoutDashboard,
  'Web Development': Globe,
  Automation: Cog,
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-[0.8125rem] font-semibold text-muted">{label}</h4>
      <div className="mt-1">{children}</div>
    </div>
  )
}

function FeaturedCard({ p, onMore }: { p: Project; onMore: () => void }) {
  const shot = featured.screens[0]
  return (
    <article {...reveal()} className="panel overflow-hidden" style={{ borderLeft: '4px solid var(--accent)' }}>
      <div className="grid lg:grid-cols-[1.2fr_1fr]">
        <div className="p-5 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md border border-accent/50 bg-accent/10 px-2.5 py-0.5 text-sm font-semibold text-accent">Featured project</span>
            {p.categories.map((c) => <span key={c} className="tag !py-0.5 !text-[0.8125rem]">{c}</span>)}
          </div>
          <h3 className="mt-3 text-[clamp(1.5rem,3vw,2.1rem)] font-semibold">{p.title}</h3>
          <p className="mt-3 text-muted">{p.summary}</p>
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <Block label="Problem"><p>{p.problem}</p></Block>
            <Block label="Implemented">
              <ul className="list-disc space-y-1 pl-5 marker:text-muted">{p.highlights?.map((h) => <li key={h}>{h}</li>)}</ul>
            </Block>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
            {p.tech.slice(0, 6).map((t) => <li key={t} className="tag">{t}</li>)}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <a className="btn btn-primary" href={p.live} target="_blank" rel="noopener noreferrer"><ExternalLink size={17} aria-hidden /> Live Demo</a>
            <a className="btn" href={p.github} target="_blank" rel="noopener noreferrer"><GithubIcon size={17} /> GitHub</a>
            <button type="button" className="btn" onClick={onMore} aria-haspopup="dialog"><BookOpen size={17} aria-hidden /> Read more</button>
          </div>
          <p className="mt-4 text-sm text-muted">
            <a href={featured.sample.href} download={featured.sample.file} className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-accent hover:underline">
              <Download size={15} aria-hidden /> Sample dataset to try (CSV)
            </a>
            <span className="block">{featured.hostingNote}</span>
          </p>
        </div>
        <div className="relative hidden min-h-[19rem] border-line bg-surface2 lg:block lg:border-l">
          <img src={shot.src} width={shot.w} height={shot.h} alt={shot.alt} loading="lazy" {...reveal()} className="absolute inset-0 h-full w-full object-cover object-left-top" />
          <span className="absolute bottom-3 right-3 rounded-full border border-secondary bg-bg px-2.5 py-1 text-[0.8125rem] font-semibold text-secondary">Live demo available</span>
        </div>
      </div>
    </article>
  )
}

function SmallCard({ p, onMore, i = 0 }: { p: Project; onMore: () => void; i?: number }) {
  const Icon = categoryIcon[p.categories[0]]
  const stack = p.tech.slice(0, 4)
  return (
    <article {...reveal(i + 1)} className="panel panel-hover flex flex-col overflow-hidden">
      {/* Preview area: only a real screenshot would go here. These projects have none published, so it shows the
          technologies actually used instead of a made-up picture. */}
      <div className="relative flex min-h-[10.5rem] items-end justify-center border-b border-line bg-surface2 px-4 pb-4 pt-12">
        {p.preview && <img src={p.preview.src} width={p.preview.w} height={p.preview.h} alt={p.preview.alt} loading="lazy" {...reveal()} className="absolute inset-0 h-full w-full object-cover object-top" style={p.preview.position ? { objectPosition: p.preview.position } : undefined} />}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[0.8125rem] font-semibold text-accentink"><Icon size={13} aria-hidden />{p.categories[0]}</span>
        <span className="absolute right-3 top-3 rounded-full border border-line bg-bg px-2.5 py-1 text-[0.8125rem] font-semibold text-muted">{p.badge ?? 'Academic project'}</span>
        <ul className={`flex-wrap items-start justify-center gap-x-4 gap-y-3 ${p.preview ? 'sr-only' : 'flex'}`} aria-label="Main technologies used">
          {stack.map((t) => (
            <li key={t} className="flex w-16 flex-col items-center gap-1.5 text-center">
              <SkillIcon name={t} large />
              <span className="text-[0.8125rem] font-medium leading-tight">{t}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-muted">{p.kind}</p>
        <h3 className="mt-0.5 text-xl font-semibold leading-snug">{p.title}</h3>
        <div className="mt-4 grid gap-3 text-sm">
          {p.problem && <Block label="Problem"><p className="text-muted">{p.problem}</p></Block>}
          <Block label="Solution"><p className="text-muted">{p.summary}</p></Block>
          {p.highlights && (
            <div className="max-sm:hidden"><Block label="Implemented">
              <ul className="list-disc space-y-1 pl-5 marker:text-muted">{p.highlights.map((c) => <li key={c}>{c}</li>)}</ul>
            </Block></div>
          )}
        </div>
        <div className="mt-auto flex gap-3 pt-5">
          {p.github && <a className="btn !min-h-11 flex-1" href={p.github} target="_blank" rel="noopener noreferrer"><GithubIcon size={17} /> Code</a>}
          {p.live && <a className="btn !min-h-11 flex-1" href={p.live} target="_blank" rel="noopener noreferrer"><ExternalLink size={17} aria-hidden /> Live Demo</a>}
          <button type="button" className="btn !min-h-11 flex-1" onClick={onMore} aria-haspopup="dialog"><BookOpen size={17} aria-hidden /> Read more</button>
        </div>
      </div>
    </article>
  )
}

export default function ProjectsSection() {
  const [filter, setFilter] = useState<Filter>('All Projects')
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Project | null>(null)
  const openProject = (id: string) => {
    window.history.replaceState(null, '', `#project-${id}`)
    if (id === 'ai-bi') setOpen(true)
    else setSelected(projects.find((x) => x.id === id) ?? null)
  }
  const closeProject = () => {
    setOpen(false)
    setSelected(null)
    window.history.replaceState(null, '', '#projects')
  }
  // A link such as #project-food opens that project's details view directly.
  useEffect(() => {
    const apply = (initial = false) => {
      const m = window.location.hash.match(/^#project-([\w-]+)$/)
      if (!m) {
        // The address changed to the plain Projects page: make sure no details view is left open over it.
        if (window.location.hash === '#projects') { setOpen(false); setSelected(null) }
        return
      }
      document.getElementById('projects')?.scrollIntoView({ behavior: initial ? 'auto' : 'smooth' })
      const id = m[1]
      if (id === 'ai-bi') setOpen(true)
      else {
        const p = projects.find((x) => x.id === id && x.details)
        if (p) setSelected(p)
      }
    }
    const onHash = () => apply()
    apply(true)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  const shown = projects.filter((p) => filter === 'All Projects' || p.categories.includes(filter as Category))

  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <div className="wrap">
        <SectionHeading id="projects" title="Featured Projects">Selected work in data analytics, business intelligence, web development and test automation.</SectionHeading>
        <div role="group" aria-label="Filter projects by category" {...reveal(1)} className="chip-row mb-6 sm:flex-wrap">
          {filters.map((f) => (
            <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)} className={`btn !min-h-11 !rounded-full !px-5 ${filter === f ? 'btn-primary' : ''}`}>{f}</button>
          ))}
        </div>
        <p className="sr-only" role="status" aria-live="polite">Showing {shown.length} {shown.length === 1 ? 'project' : 'projects'}</p>
        <div className="grid gap-5">
          {shown.filter((p) => p.id === 'ai-bi').map((p) => <FeaturedCard key={p.id} p={p} onMore={() => openProject(p.id)} />)}
          {/* Two columns; if the last card would sit alone it spans the row, so no empty cell is left. */}
          <div className="grid gap-5 md:grid-cols-2 md:[&>article:last-child:nth-child(odd)]:col-span-2">
            {shown.filter((p) => p.id !== 'ai-bi').map((p, idx) => <SmallCard key={p.id} p={p} i={idx % 2} onMore={() => openProject(p.id)} />)}
          </div>
        </div>
      </div>
      <CaseStudyModal open={open} onClose={closeProject} />
      <ProjectModal project={selected} onClose={closeProject} />
    </section>
  )
}
