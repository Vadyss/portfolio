import { Mail, Phone } from 'lucide-react'
import { GITHUB_URL, profile, sections } from '../content'
import { GithubIcon } from './ui'

/** Left rail with quick contact links (desktop only). */
export function SocialRail() {
  const link =
    'grid size-9 place-items-center rounded-lg text-muted transition-all hover:-translate-y-0.5 hover:text-accent'
  return (
    <div className="fixed bottom-0 left-6 z-20 hidden flex-col items-center gap-2 xl:flex">
      <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub" className={link}>
        <GithubIcon className="size-[18px]" />
      </a>
      <a href={`mailto:${profile.emailPersonal}`} aria-label="E-mail" className={link}>
        <Mail className="size-[18px]" />
      </a>
      <a href={profile.phoneHref} aria-label={profile.phoneDisplay} className={link}>
        <Phone className="size-[18px]" />
      </a>
      <span className="mt-2 h-24 w-px bg-gradient-to-b from-white/30 to-transparent" />
    </div>
  )
}

/** Right rail with one bar per section, highlighting the active one. */
export function SectionRail({ active }: { active: string }) {
  return (
    <nav
      aria-label="Sections"
      className="fixed right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex"
    >
      {sections.map((s) => {
        const on = active === s.id
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={s.label}
            aria-current={on ? 'true' : undefined}
            className="group flex items-center gap-3 py-1"
          >
            <span
              className={`font-mono text-[0.65rem] uppercase tracking-widest transition-all duration-300 ${
                on
                  ? 'translate-x-0 text-ink opacity-100'
                  : 'translate-x-2 text-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
              }`}
            >
              {s.label}
            </span>
            <span
              className={`w-[3px] rounded-full transition-all duration-300 ${
                on ? 'h-9 bg-accent shadow-[0_0_14px_var(--accent)]' : 'h-5 bg-white/20 group-hover:bg-white/50'
              }`}
            />
          </a>
        )
      })}
    </nav>
  )
}
