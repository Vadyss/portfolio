import { about } from '../content'
import { Reveal, Section } from './ui'

export function About() {
  return (
    <Section id="about" glow="right">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-accent/60" />
            {about.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl sm:leading-[1.1]">
            {about.title}
          </h2>
        </Reveal>

        <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 90}>
              <p className={i === 0 ? 'text-ink' : undefined}>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-3">
        {about.stats.map((s, i) => (
          <Reveal key={s.value} delay={i * 100}>
            <div className="card h-full p-7">
              <p className="text-gradient font-display text-5xl font-bold tracking-tight sm:text-6xl">{s.value}</p>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-muted">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
