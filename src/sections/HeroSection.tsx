import { useEffect, useRef } from 'react'
import { ArrowDown, ArrowRight, CalendarDays, FlaskConical, GraduationCap, Mail, Medal } from 'lucide-react'
import { GithubIcon } from '../components/BrandIcons'
import ResumeButtons from '../components/ResumeButtons'
import Portrait from '../components/Portrait'
import RotatingText from '../components/RotatingText'
import { profile } from '../data/profile'
import { reveal } from '../motion'
import { motionOn, onScrollFrame } from '../scrollFrame'

// Facts already shown further down the page, kept to what is confirmed.
const facts = [
  { icon: GraduationCap, title: 'BCA (Honours)', sub: 'Data Science' },
  { icon: Medal, title: 'Senior Under Officer', sub: 'NCC Army Wing' },
  { icon: FlaskConical, title: 'Science Communicator', sub: 'Intern, currently' },
  { icon: CalendarDays, title: 'Event management', sub: 'Chanakya University' },
]
// Data Science (the owner's degree specialisation) followed by the three areas in the existing headline
const focus = ['Data Science', ...profile.headline.split('|').map((s) => s.trim())]
const [firstName, ...restName] = profile.name.split(' ')

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)

  // Scroll choreography: as you scroll away from the hero, the two text groups drift apart and the portrait settles back.
  // One CSS variable (--hp, 0 to 1) is updated per frame; the movement itself is CSS.
  useEffect(() => {
    const el = ref.current
    if (!el || !motionOn()) return
    return onScrollFrame(() => {
      const p = Math.min(1, Math.max(0, window.scrollY / (el.offsetHeight * 0.75)))
      el.style.setProperty('--hp', p.toFixed(3))
    })
  }, [])

  return (
    <section ref={ref} aria-labelledby="hero-title" className="hero overflow-x-clip pt-8 pb-10 sm:pt-12 sm:pb-12 lg:pt-12">
      <div className="wrap">
        <div className="flex justify-center">
          <p {...reveal()} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-secondary" aria-hidden />
            Open to Entry-Level Opportunities
          </p>
        </div>

        <div className="mt-8 grid items-center gap-7 xl:grid-cols-[1fr_auto_1fr] xl:gap-8">
          <div className="hero-left text-center max-xl:order-2 xl:text-right">
            <p {...reveal(1)} className="text-lg text-accent">Hello! I'm</p>
            <p {...reveal(2)} className="mt-1 font-display text-[clamp(2rem,4.4vw,3.4rem)] font-medium uppercase leading-[1.03] tracking-wide">
              {firstName}<br />{restName.join(' ')}
            </p>
          </div>

          <div className="hero-center relative mx-auto grid place-items-center max-xl:order-1">
            <span className="hero-glow" aria-hidden />
            <div
              {...reveal()}
              className="portrait-hover relative z-10 box-border aspect-square w-[min(74vw,16rem)] rounded-full border-2 border-accent p-2 xl:w-[20rem]"
              style={{ boxShadow: '0 0 0 7px var(--bg), 0 0 0 8px var(--line)' }}
            >
              <Portrait className="h-full w-full" />
            </div>
          </div>

          <div className="hero-right text-center max-xl:order-3 xl:text-left">
            <p {...reveal(1)} className="text-lg text-accent">Passionate about</p>
            <div {...reveal(2)} className="mt-1 font-display text-[clamp(1.8rem,3.6vw,2.7rem)] font-semibold uppercase leading-[1.1]">
              <RotatingText words={focus} />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-3xl text-center">
          <h1 id="hero-title" {...reveal(1)} className="text-[clamp(2.1rem,5vw,3.6rem)] font-semibold leading-[1.05]">
            Turning Data Into <span className="text-accent">Decisions.</span>
          </h1>
          <p {...reveal(2)} className="mx-auto mt-4 max-w-xl text-muted">
            I turn raw data into useful insights and build practical analytical applications, from data cleaning and forecasting to
            interactive dashboards.
          </p>
          <div {...reveal(3)} className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center">
            <a href="#projects" className="btn btn-primary col-span-2 sm:col-span-1"><ArrowDown size={17} aria-hidden /> Explore My Projects</a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn"><GithubIcon size={17} /> <span>View <span className="hidden sm:inline">My </span>GitHub</span></a>
            <a href="#contact" className="btn"><Mail size={17} aria-hidden /> Contact Me</a>
            <ResumeButtons compact label="Download My Resume" className="btn-outline-accent max-sm:col-span-2" />
          </div>
          <div {...reveal(4)}>
            <a href="#about" className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-md text-sm text-muted transition-colors hover:text-ink">
              Explore portfolio <ArrowRight size={16} aria-hidden />
            </a>
          </div>
        </div>

        <ul className="m-0 mx-auto mt-8 grid max-w-4xl list-none grid-cols-2 gap-2.5 p-0 lg:grid-cols-4">
          {facts.map(({ icon: Icon, title, sub }, idx) => (
            <li key={title} {...reveal(idx + 1)} className="flex items-center gap-2.5 rounded-xl border border-line bg-surface px-3 py-2.5">
              <Icon size={18} className="shrink-0 text-accent" aria-hidden />
              <span className="min-w-0">
                <span className="block text-[0.8125rem] font-semibold leading-snug sm:text-sm">{title}</span>
                <span className="block text-[0.8125rem] text-muted">{sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
