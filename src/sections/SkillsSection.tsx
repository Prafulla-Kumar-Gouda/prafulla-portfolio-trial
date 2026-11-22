import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import SkillIcon from '../components/SkillIcon'
import { coreSkills, skillEvidence, skillGroups } from '../data/skills'
import { reveal } from '../motion'

export default function SkillsSection() {
  const [i, setI] = useState(0)
  const g = skillGroups[i]
  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <div className="wrap">
        <SectionHeading id="skills" title="Technical Skills" />

        <div {...reveal(1)} className="panel mb-5 flex flex-wrap items-center gap-x-5 gap-y-3 p-4 sm:p-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold"><span className="h-2 w-2 rounded-full bg-accent" aria-hidden />Core analytics stack</h3>
          <ul className="flex flex-wrap gap-2.5" aria-label="Core analytics stack">
            {coreSkills.map((s, idx) => (
              <li key={s} {...reveal(idx + 2)} className="flex items-center gap-2.5 rounded-xl border border-accent bg-surface2 py-1.5 pl-1.5 pr-3.5 text-[0.95rem] font-semibold">
                <SkillIcon name={s} />{s}
              </li>
            ))}
          </ul>
        </div>

        <div {...reveal(1)} className="panel overflow-hidden">
          <div role="tablist" aria-label="Skill categories" className="chip-row border-b border-line bg-surface2 p-2 sm:flex-wrap sm:gap-1">
            {skillGroups.map((s, idx) => (
              <button key={s.title} role="tab" id={`sk-${idx}`} aria-selected={i === idx} aria-controls="sk-panel" type="button" onClick={() => setI(idx)}
                className={`min-h-11 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${i === idx ? 'bg-accent text-accentink' : 'text-muted hover:text-ink'}`}>
                {s.title.replace(' and ', ' & ')}
              </button>
            ))}
          </div>
          <div id="sk-panel" role="tabpanel" aria-labelledby={`sk-${i}`} className="p-5 sm:p-6">
            <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-[repeat(auto-fit,minmax(15.5rem,1fr))] sm:gap-3 max-sm:[&>li:last-child:nth-child(odd)]:col-span-2">
              {g.items.map((s, idx) => (
                <li key={s} {...reveal((idx % 6) + 1)} className="tag flex items-center gap-2.5 !rounded-xl !py-2.5 !pl-2 !pr-3 !text-[0.95rem] !leading-snug sm:gap-3 sm:!pl-2.5 sm:!pr-4 sm:!text-base">
                  <SkillIcon name={s} />{s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h3 {...reveal()} className="mt-6 flex items-center gap-2 text-sm font-semibold"><span className="h-2 w-2 rounded-full bg-accent" aria-hidden />Where these skills are used</h3>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:[&>li:last-child:nth-child(3n+1)]:col-span-3">
          {skillEvidence.map((e, idx) => (
            <li key={e.skills + e.project} {...reveal((idx % 3) + 1)}>
              <a href="#projects" className="panel panel-hover block h-full p-4 no-underline">
                <p className="font-semibold leading-snug">{e.skills}</p>
                <p className="mt-1 text-sm text-accent">{e.project}</p>
                <p className="mt-1 text-sm text-muted">{e.use}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
