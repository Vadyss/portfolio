import { GraduationCap } from 'lucide-react'
import { GITHUB_URL, stack } from '../content'
import { GithubIcon, Reveal, Section, SectionHeading } from './ui'

export function Stack() {
  const all = stack.groups.flatMap((g) => g.items)
  const learning = stack.learning

  return (
    <Section id="stack" glow="center">
      <SectionHeading eyebrow={stack.eyebrow} title={stack.title} intro={stack.intro} />

      <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
        {stack.focus.map((f, i) => (
          <Reveal key={f.value} delay={i * 60}>
            <p className="text-sm text-muted">{f.label}</p>
            <p className="mt-1 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">{f.value}</p>
          </Reveal>
        ))}
        <Reveal delay={stack.focus.length * 60} className="flex items-end">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="btn btn-primary">
            <GithubIcon className="size-4" />
            {stack.cta}
          </a>
        </Reveal>
      </div>

      {/* Scrolling strip of everything in the toolbox */}
      <Reveal className="mt-16">
        {/* Hairlines above and below, faded at both ends, with a slow ticker between. */}
        <div className="marquee-mask relative overflow-hidden py-6">
          <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          <ul aria-hidden className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {/* Each item carries its own trailing dot and spacing (no flex gap), so the
                duplicated list loops at exactly -50% without a visible jump. */}
            {[...all, ...all].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-8 pr-8 font-display text-lg tracking-tight text-muted transition-colors duration-300 hover:text-ink sm:text-xl"
              >
                {item}
                <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_color-mix(in_oklab,var(--accent)_70%,transparent)]" />
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stack.groups.map((g, i) => (
          <Reveal key={g.title} delay={i * 80}>
            <div className="card h-full p-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{g.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-ink/85">
                {g.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="size-1 rounded-full bg-white/30" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Currently learning */}
      <Reveal className="mt-4">
        <div className="card flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-line bg-white/[0.04] text-accent">
            <GraduationCap className="size-6" strokeWidth={1.6} />
          </span>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{learning.eyebrow}</p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">{learning.title}</h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">{learning.description}</p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
