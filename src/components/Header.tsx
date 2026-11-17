import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { hero, sections } from '../content'

export function Header({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const links = sections.filter((s) => s.id !== 'home')

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled ? 'border-b border-line bg-bg/75 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:h-20 sm:px-8">
          {/* Left spacer keeps the nav centred. */}
          <div aria-hidden className="flex-1" />

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {links.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={active === s.id ? 'true' : undefined}
                className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                  active === s.id ? 'bg-white/[0.06] text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {s.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-1 items-center justify-end gap-3">
            <a href="#contact" className="btn btn-primary hidden !px-4 !py-2.5 text-xs sm:inline-flex">
              {hero.ctaPrimary}
              <ArrowUpRight className="size-3.5" />
            </a>
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="grid size-10 place-items-center rounded-xl border border-line bg-white/[0.03] lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {/* Reading progress */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-gradient-to-r from-accent to-accent-2"
          style={{ transform: `scaleX(${progress})` }}
        />
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-30 flex flex-col bg-bg/95 px-6 pb-10 pt-24 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-2">
          {sections.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 py-2 font-display text-3xl font-semibold tracking-tight"
            >
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <span className={active === s.id ? 'text-gradient' : 'text-ink'}>{s.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}
