import { useState, type ReactNode } from 'react'
import { Download, ExternalLink } from 'lucide-react'
import Modal from '../components/Modal'
import { GithubIcon } from '../components/BrandIcons'
import ArchitectureDiagram from './ArchitectureDiagram'
import { featured, projects } from '../data/projects'

const tabs = ['Overview', 'How it works', 'Analysis methods', 'Features', 'Screenshots', 'Testing & limits', 'Learning'] as const
type Tab = (typeof tabs)[number]

function Bullets({ items }: { items: readonly string[] }) {
  return <ul className="mt-2 list-disc space-y-1.5 pl-5 text-muted marker:text-muted">{items.map((i) => <li key={i}>{i}</li>)}</ul>
}
function Section({ title, children }: { title: string; children: ReactNode }) {
  return <div><h3 className="text-lg font-semibold">{title}</h3>{children}</div>
}

export default function CaseStudyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const p = projects[0]
  const [tab, setTab] = useState<Tab>('Overview')
  const [shotId, setShotId] = useState(featured.screens[0].id)
  const shot = featured.screens.find((s) => s.id === shotId) ?? featured.screens[0]

  return (
    <Modal open={open} onClose={onClose} title="AI Business Intelligence">
      <div role="tablist" aria-label="Case study sections" className="chip-row sm:flex-wrap">
        {tabs.map((t) => (
          <button key={t} role="tab" id={`cs-${t}`} aria-selected={tab === t} aria-controls="cs-panel" type="button" onClick={() => setTab(t)} className={`btn !min-h-11 ${tab === t ? 'btn-primary' : ''}`}>{t}</button>
        ))}
      </div>

      <div id="cs-panel" role="tabpanel" aria-labelledby={`cs-${tab}`} className="mt-6 min-h-[18rem]">
        {tab === 'Overview' && (
          <div className="grid gap-6">
            <Section title="What it is"><p className="mt-2 text-muted">{p.summary}</p></Section>
            <Section title="Problem and solution">
              <p className="mt-2 text-muted">{featured.problem}</p>
              <p className="mt-2 text-muted">The application brings those steps into one dashboard: upload a file, and it detects the business columns, cleans the data and produces analysis, customer segments, a forecast, recommendations and written insights wherever the data allows.</p>
            </Section>
            <p className="border-l-[3px] border-secondary pl-4 text-sm text-muted">{featured.caveat}</p>
            <Section title="Built with">
              <ul className="mt-2 flex flex-wrap gap-2">{featured.stack.map((t) => <li key={t} className="tag">{t}</li>)}</ul>
            </Section>
          </div>
        )}
        {tab === 'How it works' && (
          <div>
            <h3 className="text-lg font-semibold">System architecture</h3>
            <div className="mt-3"><ArchitectureDiagram /></div>
            <h3 className="mt-7 text-lg font-semibold">Workflow</h3>
            <ol className="mt-3 border-l border-line">
              {featured.workflow.map((w, i) => (
                <li key={w.step} className="relative pb-5 pl-7 last:pb-0">
                  <span className="absolute -left-[0.8rem] top-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-accent bg-bg text-[0.8125rem] font-semibold text-accent" aria-hidden>{i + 1}</span>
                  <p className="font-semibold leading-snug">{w.step}</p>
                  <p className="text-sm text-muted">{w.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        )}
        {tab === 'Analysis methods' && (
          <div className="grid gap-6">
            <p className="text-sm text-muted">What is statistical, what is machine learning and what is rule-based, as implemented in the code.</p>
            {featured.methods.map((m) => (
              <Section key={m.title} title={m.title}><Bullets items={m.points} /></Section>
            ))}
          </div>
        )}
        {tab === 'Features' && (
          <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {featured.features.map((f) => (
              <div key={f.title} className="border-t border-line pt-3">
                <h3 className="font-semibold">{f.title}</h3>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-muted marker:text-muted">{f.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
              </div>
            ))}
          </div>
        )}
        {tab === 'Screenshots' && (
          <div>
            <p className="mb-3 text-sm text-muted">Real screenshots from the project repository (example outputs from a sample dataset).</p>
            <div role="group" aria-label="Choose a screenshot" className="chip-row sm:flex-wrap">
              {featured.screens.map((s) => (
                <button key={s.id} type="button" aria-pressed={shotId === s.id} onClick={() => setShotId(s.id)} className={`btn !min-h-11 !text-sm ${shotId === s.id ? 'btn-primary' : ''}`}>{s.label}</button>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-line bg-surface2 p-3">
              <img key={shot.id} src={shot.src} width={shot.w} height={shot.h} alt={shot.alt} className="mx-auto h-auto max-h-[55vh] w-auto max-w-full rounded-lg border border-line object-contain" />
            </div>
          </div>
        )}
        {tab === 'Testing & limits' && (
          <div className="grid gap-6">
            <Section title="Validation and testing"><Bullets items={featured.validation} /></Section>
            <Section title="Limitations"><Bullets items={featured.limitations} /></Section>
            <Section title="Ideas for next steps"><Bullets items={featured.next} />
              <p className="mt-2 text-sm text-muted">These are possible directions, not implemented features.</p></Section>
          </div>
        )}
        {tab === 'Learning' && (
          <div className="grid gap-6">
            <Section title="What I learned"><Bullets items={featured.learned} /></Section>
            <Section title="Challenges and solutions">
              <ul className="mt-2 grid gap-3">
                {featured.challenges.map((c) => (
                  <li key={c.challenge} className="rounded-xl border border-line bg-surface2 p-3.5 text-sm">
                    <p className="font-semibold">{c.challenge}</p>
                    <p className="mt-1 text-muted">{c.solution}</p>
                  </li>
                ))}
              </ul>
            </Section>
            <p className="text-sm text-muted">Drawn from the repository's code and commit history (8 to 22 Oct 2026).</p>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-5">
        <a className="btn btn-primary" href={p.live} target="_blank" rel="noopener noreferrer"><ExternalLink size={17} aria-hidden /> Open live application</a>
        <a className="btn" href={p.github} target="_blank" rel="noopener noreferrer"><GithubIcon size={17} /> GitHub repository</a>
        <a className="btn" href={featured.sample.href} download={featured.sample.file}><Download size={17} aria-hidden /> Sample dataset (CSV)</a>
      </div>
      <p className="mt-3 text-sm text-muted">{featured.sample.note} {featured.hostingNote}</p>
    </Modal>
  )
}
