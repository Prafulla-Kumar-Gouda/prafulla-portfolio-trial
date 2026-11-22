import type { ReactNode } from 'react'
import { ExternalLink } from 'lucide-react'
import Modal from '../components/Modal'
import { GithubIcon } from '../components/BrandIcons'
import type { Project } from '../data/projects'

function Section({ title, children }: { title: string; children: ReactNode }) {
  return <div><h3 className="text-lg font-semibold">{title}</h3><div className="mt-2">{children}</div></div>
}
function List({ items, marker = 'marker:text-muted' }: { items: string[]; marker?: string }) {
  return <ul className={`list-disc space-y-1.5 pl-5 text-muted ${marker}`}>{items.map((i) => <li key={i}>{i}</li>)}</ul>
}

// One layout for every project. Sections appear only when there is a real record behind them.
export default function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const d = project?.details
  return (
    <Modal open={!!project && !!d} onClose={onClose} title={project?.title ?? ''}>
      {project && d && (
        <div className="grid gap-7">
          <p className="text-sm text-muted">{project.kind}</p>
          <Section title="Overview"><p className="text-muted">{d.overview}</p></Section>
          <div className="grid gap-6 sm:grid-cols-2">
            {project.problem && <Section title="Problem addressed"><p className="text-muted">{project.problem}</p></Section>}
            <Section title="Solution"><p className="text-muted">{d.solution}</p></Section>
          </div>
          <Section title="Key features"><List items={d.covers} /></Section>
          {d.findings && <Section title="Key findings"><List items={d.findings} /></Section>}
          {d.images && (
            <Section title="Sample outputs">
              <p className="mb-3 text-sm text-muted">Charts drawn from the results of the SQL queries.</p>
              <ul className="grid gap-4 sm:grid-cols-2">
                {d.images.map((im) => (
                  <li key={im.src}>
                    <figure className="m-0 overflow-hidden rounded-xl border border-line bg-surface2">
                      <img src={im.src} width={im.w} height={im.h} alt={im.alt} loading="lazy" className="h-auto w-full" />
                      <figcaption className="px-3 py-2 text-sm text-muted">{im.caption}</figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </Section>
          )}
          <div className="grid gap-6 sm:grid-cols-2">
            <Section title="Technologies used">
              <ul className="flex flex-wrap gap-2">{d.builtWith.map((t) => <li key={t} className="tag">{t}</li>)}</ul>
            </Section>
            <Section title="Skills it shows">
              <ul className="flex flex-wrap gap-2">{d.skills.map((t) => <li key={t} className="tag">{t}</li>)}</ul>
            </Section>
          </div>
          {d.learned && <Section title="What I learned"><List items={d.learned} /></Section>}
          {d.challenges && (
            <Section title="Challenges and solutions">
              <ul className="grid gap-3">
                {d.challenges.map((c) => (
                  <li key={c.challenge} className="rounded-xl border border-line bg-surface2 p-3.5 text-sm">
                    <p className="font-semibold">{c.challenge}</p>
                    <p className="mt-1 text-muted">{c.solution}</p>
                  </li>
                ))}
              </ul>
            </Section>
          )}
          {d.limitations && <Section title="Current limitations"><List items={d.limitations} marker="marker:text-amber" /></Section>}
          {d.footnote && <p className="border-l-[3px] border-secondary pl-4 text-sm text-muted">{d.footnote}</p>}
          {(project.github || project.live) && (
            <div className="flex flex-wrap gap-3 border-t border-line pt-5">
              {project.live && <a className="btn btn-primary" href={project.live} target="_blank" rel="noopener noreferrer"><ExternalLink size={17} aria-hidden /> Live Demo</a>}
              {project.github && <a className="btn" href={project.github} target="_blank" rel="noopener noreferrer"><GithubIcon size={17} /> GitHub repository</a>}
            </div>
          )}
        </div>
      )}
    </Modal>
  )
}
