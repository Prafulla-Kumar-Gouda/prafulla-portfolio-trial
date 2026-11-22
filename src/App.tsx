import { useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import BackToTop from './components/BackToTop'
import MobileActionBar from './components/MobileActionBar'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import { navItems } from './components/Sidebar'
import HeroSection from './sections/HeroSection'
import FeaturedPreview from './components/FeaturedPreview'
import AboutSection from './sections/AboutSection'
import SkillsSection from './sections/SkillsSection'
import ProjectsSection from './sections/ProjectsSection'
import ExperienceSection from './sections/ExperienceSection'
import LeadershipSection from './sections/LeadershipSection'
import EducationSection from './sections/EducationSection'
import ContactSection from './sections/ContactSection'
import { useScrollSpy } from './hooks/useScrollSpy'
import { useTheme } from './hooks/useTheme'

const sectionIds = navItems.map((n) => n.id)

// One continuous page: scroll through it, or use the navigation tabs to jump to a section.
export default function App() {
  const { theme, toggle } = useTheme()
  const active = useScrollSpy(sectionIds)
  const mainRef = useRef<HTMLElement>(null)

  // If the visitor changes their reduced-motion setting while the page is open, switch the motion layer on or off.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => document.documentElement.classList.toggle('motion-ready', !mq.matches && 'IntersectionObserver' in window)
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  return (
    <>
      <a
        href="#main-content"
        onClick={(e) => { e.preventDefault(); mainRef.current?.focus() }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accentink"
      >
        Skip to content
      </a>
      <Navbar theme={theme} onToggle={toggle} active={active} />
      <div className="lg:pl-60">
        <main id="main-content" ref={mainRef} tabIndex={-1}>
          <div id="home">
            <HeroSection />
            <FeaturedPreview />
          </div>
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <LeadershipSection />
          <EducationSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
      <Cursor />
      <BackToTop />
      <MobileActionBar />
    </>
  )
}
