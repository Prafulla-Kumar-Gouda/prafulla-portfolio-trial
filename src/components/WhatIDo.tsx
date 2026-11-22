import { useState } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { projects } from '../data/projects'
import { reveal } from '../motion'

// "What I do" cards. Every word below comes from the project data already on the site: nothing is added.
const order = ['ai-bi', 'weather', 'food', 'testing']
const items = order.map((id) => projects.find((p) => p.id === id)!).filter(Boolean).map((p) => ({
  id: p.id,
  title: p.kind.split('|')[0].trim(),         // Data Analytics, Data Science, Web Development, Software Testing
  sub: p.title.split(' — ')[0],               // the project that shows it
  text: p.summary,
  tech: p.tech,
}))

export default function WhatIDo() {
  const [open, setOpen] = useState(0)
  return (
    <div className="mt-16 grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
      <h3 {...reveal()} className="font-display text-[clamp(2.8rem,7vw,5rem)] font-semibold uppercase leading-[0.95]">
        What<br />I <span className="text-accent">Do</span>
      </h3>
      <ul className="grid gap-3">
        {items.map((it, n) => {
          const on = open === n
          return (
            <li key={it.id} {...reveal(n + 1)} className="brackets">
              <h4>
                <button
                  type="button"
                  id={`wid-${it.id}`}
                  aria-expanded={on}
                  aria-controls={`wid-panel-${it.id}`}
                  onClick={() => setOpen(on ? -1 : n)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                >
                  <span>
                    <span className="block font-display text-xl font-semibold uppercase tracking-wide sm:text-2xl">{it.title}</span>
                    <span className="mt-0.5 block text-sm text-muted">{it.sub}</span>
                  </span>
                  <ChevronDown size={20} aria-hidden className={`shrink-0 text-accent transition-transform duration-300 ${on ? 'rotate-180' : ''}`} />
                </button>
              </h4>
              <div id={`wid-panel-${it.id}`} role="region" aria-labelledby={`wid-${it.id}`} data-open={on} className="acc-panel">
                <div>
                  <div className="px-6 pb-5">
                    <p className="text-muted">{it.text}</p>
                    <p className="mt-4 text-[0.8125rem] font-semibold text-muted">Skillset &amp; tools</p>
                    <ul className="mt-2 flex flex-wrap gap-2" aria-label={`${it.title} tools`}>{it.tech.map((t) => <li key={t} className="tag">{t}</li>)}</ul>
                    <a href={`#project-${it.id}`} className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent hover:underline">
                      See the project <ArrowUpRight size={15} aria-hidden />
                    </a>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
