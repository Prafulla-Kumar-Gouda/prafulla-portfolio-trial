import { CalendarDays } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { reveal } from '../motion'

// Everything below comes from the owner's own description of each role. No deliverables or results are claimed.
const scDuties = [
  'Engages visitors on the science centre floor and explains exhibits.',
  'Facilitates hands-on activities and demonstrations.',
  'Shares floor observations with the team.',
  'Shares ideas for research that can improve how science is communicated and facilitated.',
]
const scSkills = ['Visitor engagement', 'Science communication', 'Hands-on facilitation', 'Research ideas']

const dmDuties = [
  'Carried out keyword research.',
  'Worked on on-page SEO and content optimization.',
  'Analysed backlinks.',
  'Supported social media marketing.',
  'Tracked digital performance.',
]
const dmTools = ['Google Analytics', 'Google Search Console', 'Google Ads', 'SEMrush', 'Ahrefs', 'Canva']
const dmSkills = ['Analytical thinking', 'Search performance analysis', 'Keyword research', 'Content optimization', 'Digital campaign support', 'Performance monitoring']

function Tags({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-[0.8125rem] font-semibold text-muted">{label}</h4>
      <ul className="mt-2 flex flex-wrap gap-2" aria-label={label}>{items.map((t) => <li key={t} className="tag">{t}</li>)}</ul>
    </div>
  )
}

export default function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section">
      <div className="wrap">
        <SectionHeading id="experience" title="Experience">Two internships: one in science communication, one in digital marketing.</SectionHeading>
        <ol className="grid gap-5">
          <li>
            <article {...reveal(1)} className="panel p-5 sm:p-8" style={{ borderLeft: '3px solid var(--accent)' }}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold">Science Communicator Intern</h3>
                  <p className="mt-1 text-muted">Param Foundation · PARSEC Whitefield, Bengaluru</p>
                </div>
                <p className="inline-flex items-center gap-2 rounded-full border border-secondary px-3.5 py-1 text-sm font-semibold text-secondary">
                  <span className="h-2 w-2 rounded-full bg-secondary" aria-hidden /> Currently working
                </p>
              </div>
              <div className="mt-5 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:gap-10">
                <div>
                  <h4 className="text-[0.8125rem] font-semibold text-muted">Responsibilities</h4>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-muted marker:text-muted">{scDuties.map((t) => <li key={t}>{t}</li>)}</ul>
                </div>
                <Tags label="Skills used" items={scSkills} />
              </div>
            </article>
          </li>
          <li>
            <article {...reveal(1)} className="panel p-5 sm:p-8" style={{ borderLeft: '3px solid var(--accent)' }}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold">Digital Marketing Intern</h3>
                  <p className="mt-1 text-muted">Digital iMac · Bengaluru, India</p>
                </div>
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-secondary"><CalendarDays size={16} aria-hidden /> Jan 2026 – Jun 2026</p>
              </div>
              <div className="mt-5 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:gap-10">
                <div>
                  <h4 className="text-[0.8125rem] font-semibold text-muted">Responsibilities</h4>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-muted marker:text-muted">{dmDuties.map((t) => <li key={t}>{t}</li>)}</ul>
                </div>
                <div className="grid gap-5">
                  <Tags label="Tools and platforms" items={dmTools} />
                  <Tags label="Skills used" items={dmSkills} />
                </div>
              </div>
            </article>
          </li>
        </ol>
      </div>
    </section>
  )
}
