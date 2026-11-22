import { CalendarDays, GraduationCap, Languages, School } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { reveal } from '../motion'

const foundation = ['Programming', 'Databases', 'Data analytics', 'Statistics', 'Data science concepts']
const subjects = ['Computer Science', 'Mathematics', 'English', 'Physics', 'Chemistry']
const languages = ['English', 'Hindi', 'Odia']

export default function EducationSection() {
  return (
    <section id="education" aria-labelledby="education-title" className="section">
      <div className="wrap">
        <SectionHeading id="education" title="Education" />
        <div className="grid gap-5 lg:grid-cols-3">
          <article {...reveal(1)} className="panel panel-hover flex flex-col p-6">
            <GraduationCap className="text-accent" size={24} aria-hidden />
            <h3 className="mt-2 text-xl font-semibold">Bachelor of Computer Applications (BCA) Honours — Data Science</h3>
            <p className="mt-1 text-muted">Chanakya University, Bengaluru</p>
            <p className="mt-3 flex items-center gap-2 text-sm font-semibold"><CalendarDays size={16} className="text-accent" aria-hidden /> 2022 – 2026 · <span className="text-secondary">CGPA 8.4/10</span></p>
            <ul className="mt-auto flex flex-wrap gap-2 pt-5" aria-label="Technical foundation">{foundation.map((f) => <li key={f} className="tag">{f}</li>)}</ul>
          </article>
          <article {...reveal(2)} className="panel panel-hover flex flex-col p-6">
            <School className="text-secondary" size={24} aria-hidden />
            <h3 className="mt-2 text-xl font-semibold">Kendriya Vidyalaya Konam Nagercoil</h3>
            <p className="mt-1 text-muted">Senior Secondary and Secondary Education</p>
            <p className="mt-5 text-[0.8125rem] font-semibold text-muted">Subjects studied</p>
            <ul className="mt-2 flex flex-wrap gap-2" aria-label="Subjects studied">{subjects.map((f) => <li key={f} className="tag">{f}</li>)}</ul>
          </article>
          <article {...reveal(3)} className="panel panel-hover flex flex-col p-6">
            <Languages className="text-accent" size={24} aria-hidden />
            <h3 className="mt-2 text-xl font-semibold">Languages</h3>
            <ul className="mt-4 flex flex-1 flex-col gap-3 max-sm:flex-row max-sm:flex-wrap">
              {languages.map((l) => (
                <li key={l} className="flex flex-1 items-center rounded-xl border border-line bg-surface2 px-5 py-3 text-xl font-medium max-sm:flex-none max-sm:text-base">{l}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}
