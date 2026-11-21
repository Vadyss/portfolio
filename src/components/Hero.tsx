import { ArrowUpRight, ChevronsDown, MapPin } from 'lucide-react'
import { hero, profile } from '../content'
import { useScramble } from '../hooks'

function CodeCard() {
  // Decorative "identity" snippet — purely visual, hidden from assistive tech.
  const line = 'flex gap-4'
  const num = 'w-4 select-none text-right text-faint'
  return (
    <div
      aria-hidden
      className="card w-[22rem] shrink-0 overflow-hidden whitespace-nowrap font-mono text-[0.78rem] leading-6 shadow-2xl shadow-black/50"
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="ml-2 text-[0.7rem] text-faint">adam.py</span>
      </div>
      <div className="px-4 py-4 text-muted">
        <div className={line}>
          <span className={num}>1</span>
          <span>
            <span className="text-accent-2">class</span> <span className="text-ink">Adam</span>(Developer):
          </span>
        </div>
        <div className={line}>
          <span className={num}>2</span>
          <span className="pl-4">
            study = <span className="text-accent">"IT @ SSPŠ"</span>
          </span>
        </div>
        <div className={line}>
          <span className={num}>3</span>
          <span className="pl-4">
            city = <span className="text-accent">"Prague"</span>
          </span>
        </div>
        <div className={line}>
          <span className={num}>4</span>
          <span className="pl-4">
            stack = [<span className="text-accent">"Python"</span>, <span className="text-accent">"React"</span>]
          </span>
        </div>
        <div className={line}>
          <span className={num}>5</span>
          <span className="pl-4">
            focus = [<span className="text-accent">"agents"</span>, <span className="text-accent">"security"</span>]
          </span>
        </div>
        <div className={line}>
          <span className={num}>6</span>
          <span />
        </div>
        <div className={line}>
          <span className={num}>7</span>
          <span className="pl-4">
            <span className="text-accent-2">def</span> <span className="text-ink">build</span>(self, idea):
          </span>
        </div>
        <div className={line}>
          <span className={num}>8</span>
          <span className="pl-8">
            <span className="text-accent-2">return</span> ship(idea)
            <span className="ml-0.5 inline-block h-4 w-[7px] translate-y-[3px] animate-blink bg-accent" />
          </span>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  const phrases = hero.phrases
  const [text] = useScramble(phrases)

  return (
    <section id="home" className="relative flex min-h-svh items-center pb-24 pt-28">
      {/* Hero glow — fades out within its own box, so it never ends in a hard edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[40%] -z-10 size-[64rem] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'radial-gradient(circle closest-side, color-mix(in oklab, var(--accent) 16%, transparent), color-mix(in oklab, var(--accent-2) 6%, transparent) 50%, transparent)',
        }}
      />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:px-16">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {profile.role}
          </p>

          <p className="font-display text-lg font-medium text-ink/90 sm:text-2xl">
            {hero.greeting} <span className="font-bold uppercase tracking-wide text-white">{profile.name}</span>
          </p>

          <h1 className="relative mt-4 grid text-[2.6rem] font-bold leading-[1.08] tracking-tight sm:text-6xl xl:text-7xl">
            <span className="sr-only">{phrases.join(' ')}</span>
            {/* Every phrase is laid out invisibly in the same grid cell, so the
                heading is always as tall as the tallest one; the animated text
                is positioned on top and can never push the layout around. */}
            {phrases.map((p) => (
              <span key={p} aria-hidden className="invisible col-start-1 row-start-1">
                {p}
              </span>
            ))}
            <span aria-hidden className="text-gradient absolute inset-x-0 top-0 pb-2">
              {text}
            </span>
          </h1>

          <p className="mt-10 max-w-xl sm:mt-12 text-base leading-relaxed text-muted sm:text-lg">{hero.lead}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn btn-primary">
              {hero.ctaPrimary}
              <ArrowUpRight className="size-4" />
            </a>
            <a href="#projects" className="btn btn-ghost">
              {hero.ctaSecondary}
            </a>
            <span className="ml-1 inline-flex items-center gap-1.5 text-sm text-faint">
              <MapPin className="size-4" />
              {profile.location}
            </span>
          </div>
        </div>

        <div className="hidden justify-end lg:flex">
          <CodeCard />
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 font-mono text-xs uppercase tracking-[0.25em] text-faint transition-colors hover:text-ink"
      >
        {hero.scroll}
        <ChevronsDown className="size-4" />
      </a>
    </section>
  )
}
