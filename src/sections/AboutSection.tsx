import SectionHeading from '../components/SectionHeading'
import { ArrowUpRight, Briefcase, FolderGit2, GraduationCap, Medal, Target } from 'lucide-react'
import { pillars } from '../data/profile'
import { projects } from '../data/projects'
import { reveal } from '../motion'
import ScrubText from '../components/ScrubText'
import WhatIDo from '../components/WhatIDo'

// Every figure here is a plain count or fact from the rest of the page; nothing is estimated.
const kpis = [
  { icon: GraduationCap, value: '8.4/10', label: 'CGPA, BCA (Honours)', chip: 'Chanakya University', href: '#education', go: 'Education' },
  { icon: FolderGit2, value: String(projects.length), label: 'Projects built', chip: '1 live app', href: '#projects', go: 'Featured Projects' },
  { icon: Briefcase, value: '2', label: 'Internships', chip: '1 current', href: '#experience', go: 'Experience' },
  { icon: Medal, value: 'B & C', label: 'NCC certificates', chip: 'Army Wing SUO', href: '#leadership', go: 'Leadership' },
]
const facts = [
  { title: 'Data Science', sub: 'Degree specialisation', href: '#education', go: 'Education' },
  { title: 'Business Intelligence app', sub: 'Deployed on Streamlit', href: '#projects', go: 'Featured Projects' },
  { title: 'NCC Army Wing', sub: 'Senior Under Officer', href: '#leadership', go: 'Leadership' },
  { title: 'Event management', sub: 'Chanakya University', href: '#leadership', go: 'Leadership' },
]

// The About section is the single introduction on the page (the hero stays a short headline).
export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="wrap">
        <SectionHeading id="about" title="About Me" />
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="max-w-2xl">
            <ScrubText
              className="text-lg"
              text="I am a BCA (Honours) graduate in Data Science from Chanakya University, Bengaluru. I work with Python, SQL and BI tools to turn raw data into analysis that supports decisions."
            />
            <ScrubText
              className="mt-4 text-muted"
              text="I have built practical projects across analytics, web development and test automation, and I communicate with different audiences as a Science Communicator Intern."
            />
            <div {...reveal(3)} className="mt-5 rounded-xl border p-4" style={{ borderColor: 'color-mix(in srgb, var(--accent) 40%, var(--line))', background: 'color-mix(in srgb, var(--accent) 7%, var(--surface))' }}>
              <h3 className="flex items-center gap-2 text-sm font-semibold"><Target size={16} className="text-accent" aria-hidden /> What I'm looking for</h3>
              <p className="mt-2">
                I'm looking for entry-level opportunities in Data Analytics and Business Intelligence where I can apply my skills in
                Python, SQL, data analysis, and visualization to solve practical problems and support informed decisions.
              </p>
            </div>
          </div>
        <ul className="grid gap-3 lg:grid-rows-3">
          {pillars.map((p, idx) => (
            <li key={p.title} {...reveal(idx + 1)} className="panel panel-hover flex flex-col justify-center px-5 py-4" style={{ borderLeft: '4px solid var(--accent)' }}>
              <h3 className="text-base font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-muted">{p.text}</p>
            </li>
          ))}
        </ul>

        </div>

        <h3 {...reveal()} className="mt-10 flex items-center gap-2 text-sm font-semibold"><span className="h-2 w-2 rounded-full bg-accent" aria-hidden />Career at a glance</h3>
        <ul className="mt-3 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {kpis.map(({ icon: Icon, value, label, chip, href, go }, idx) => (
            <li key={label} {...reveal(idx + 1)}>
              <a href={href} className="panel panel-hover group block h-full p-4 no-underline sm:p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-surface2 text-accent ring-1 ring-line"><Icon size={18} aria-hidden /></span>
                  <span className="rounded-md border border-line bg-bg px-2 py-0.5 text-[0.8125rem] font-semibold text-muted max-sm:hidden">{chip}</span>
                </div>
                <p className="mt-3 font-display text-2xl font-semibold text-secondary sm:mt-4 sm:text-3xl">{value}</p>
                <p className="mt-0.5 flex items-center justify-between gap-2 text-sm text-muted">
                  <span>{label}<span className="sr-only">, go to {go}</span></span>
                  <ArrowUpRight size={16} aria-hidden className="shrink-0 transition-colors group-hover:text-accent" />
                </p>
              </a>
            </li>
          ))}
        </ul>
        <ul {...reveal(2)} className="mt-4 grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-surface lg:grid-cols-4">
          {facts.map((f) => (
            <li key={f.title} className="border-line max-lg:nth-[odd]:border-r max-lg:nth-[-n+2]:border-b lg:not-last:border-r">
              <a href={f.href} className="block h-full px-4 py-3.5 text-center no-underline transition-colors hover:bg-hover">
                <p className="font-semibold leading-snug">{f.title}</p>
                <p className="mt-0.5 text-sm text-muted">{f.sub}<span className="sr-only">, go to {f.go}</span></p>
              </a>
            </li>
          ))}
        </ul>
        <WhatIDo />
      </div>
    </section>
  )
}
