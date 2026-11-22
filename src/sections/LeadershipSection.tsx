import { CalendarDays, Medal, ShieldCheck, Trophy } from 'lucide-react'
import NccLogo from '../components/NccLogo'
import { reveal } from '../motion'

const credentials = [
  { icon: <ShieldCheck size={22} aria-hidden />, title: 'Senior Under Officer (SUO)', text: 'NCC Army Wing, Chanakya University' },
  { icon: <Medal size={22} aria-hidden />, title: 'Republic Day Parade Commander', text: 'Karnataka & Goa Directorate' },
  { icon: <NccLogo />, title: 'NCC “B” & “C” Certificate Holder', text: 'National Cadet Corps' },
  { icon: <CalendarDays size={22} aria-hidden />, title: 'University Event Management', text: 'Chanakya University' },
]
const experiences = ['Training, camps, drills, parades and ceremonial activities', 'NCC camps and treks', 'Coordinating cadets during training and activities']
const workplace = [
  { t: 'Accountability', d: 'Parade and drill work depends on each person owning their part. I carry that into project deadlines.' },
  { t: 'Coordination', d: 'Helping organise people and activities in structured settings is the same skill as running a team project.' },
  { t: 'Teamwork under discipline', d: 'I am used to following a plan, adjusting with the group and keeping standards when things get tiring.' },
]

export default function LeadershipSection() {
  return (
    <section id="leadership" aria-labelledby="leadership-title" className="section">
      <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div>
          <h2 id="leadership-title" {...reveal()} className="title-bar text-[clamp(1.9rem,4.2vw,2.75rem)] font-semibold">Leadership Beyond Technology</h2>
          <p {...reveal(2)} className="mt-4 text-muted">
            Served in a leadership role within the NCC Army Wing at Chanakya University, coordinating cadets and representing my
            institution in organised parade activities.
          </p>
          <div className="mt-6">
            <h3 {...reveal()} className="text-sm font-semibold">What this brings to a workplace</h3>
            <dl className="mt-3 space-y-3">
              {workplace.map((w, idx) => (
                <div key={w.t} {...reveal(idx + 1)} className="border-l-[3px] border-accent pl-4"><dt className="font-semibold">{w.t}</dt><dd className="text-sm text-muted">{w.d}</dd></div>
              ))}
            </dl>
            <h3 {...reveal()} className="mt-5 text-sm font-semibold">Also part of the experience</h3>
            <ul {...reveal(1)} className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted marker:text-muted">{experiences.map((e) => <li key={e}>{e}</li>)}</ul>
          </div>
        </div>

        <div className="grid gap-3">
          {credentials.map((c, idx) => (
            <div key={c.title} {...reveal(idx + 1)} className="flex gap-4 panel-hover rounded-xl border border-line bg-surface p-4">
              <span className="mt-0.5 text-accent">{c.icon}</span>
              <div><p className="font-semibold">{c.title}</p><p className="text-sm text-muted">{c.text}</p></div>
            </div>
          ))}
          <div {...reveal(5)} className="flex gap-4 panel-hover rounded-xl border border-line bg-surface p-4">
            <span className="mt-0.5 text-accent"><Trophy size={22} aria-hidden /></span>
            <div>
              <h3 className="font-semibold">Sports &amp; Teamwork</h3>
              <p className="text-sm">Volleyball Team Captain, Chanakya University</p>
              <p className="text-sm text-muted">Captain of the runner-up volleyball team at the Annual Sports Day, 2023–24.</p>
              <p className="mt-2 text-sm text-muted">Led and coordinated teammates during the university volleyball competition, strengthening teamwork, communication, discipline, and collective responsibility.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
