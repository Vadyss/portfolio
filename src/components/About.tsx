import { about } from '../content'
import { Reveal, Section } from './ui'

export function About() {
  return (
    <Section id="about" glow="right">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-white/25" />
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

      {/* Quiet fact row: plain figures, no gradient, divided by hairlines. */}
      <Reveal className="mt-16">
        <dl className="grid divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {about.stats.map((s) => (
            <div key={s.value} className="py-6 sm:px-8 sm:first:pl-0">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-4xl font-semibold tracking-tight text-ink">{s.value}</dd>
              <dd className="mt-1.5 text-sm text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  )
}
