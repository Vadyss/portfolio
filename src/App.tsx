import { sections } from './content'
import { useActiveSection } from './hooks'
import { About } from './components/About'
import { Contact, Footer } from './components/Contact'
import { Experience } from './components/Experience'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { SectionRail, SocialRail } from './components/Rails'
import { Stack } from './components/Stack'
import { Spotlight } from './components/ui'

const SECTION_IDS = sections.map((s) => s.id)

export default function App() {
  const active = useActiveSection(SECTION_IDS)

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#060a12]"
      >
        Skip to content
      </a>

      <div aria-hidden className="backdrop-grid pointer-events-none fixed inset-0 z-0" />
      <Spotlight />

      <Header active={active} />
      <SocialRail />
      <SectionRail active={active} />

      <main className="relative z-10 overflow-x-clip">
        <Hero />
        <About />
        <Experience />
        <Stack />
        <Projects />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </>
  )
}
