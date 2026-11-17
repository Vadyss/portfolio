import { BrainCircuit, GraduationCap, ShieldCheck } from 'lucide-react'
import { experience } from '../content'
import { Reveal, Section, SectionHeading } from './ui'

export function Experience() {
  return (
    <Section id="experience" glow="left">
      <SectionHeading eyebrow={experience.eyebrow} title={experience.title} intro={experience.intro} />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {experience.items.map((item, i) => {
          const Icon = item.icon === 'ai' ? BrainCircuit : item.icon === 'school' ? GraduationCap : ShieldCheck
          return (
            <Reveal key={item.company} delay={i * 120}>
              <article className="card card-hover group h-full overflow-hidden p-7 sm:p-9">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: 'color-mix(in oklab, var(--accent) 22%, transparent)' }}
                />
                <div className="relative flex items-start justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl border border-line bg-white/[0.04] text-accent">
                    <Icon className="size-6" strokeWidth={1.6} />
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[0.68rem] uppercase tracking-widest text-muted">
                    <span className="size-1.5 rounded-full bg-accent" />
                    {item.status}
                  </span>
                </div>

                <p className="relative mt-8 font-mono text-xs uppercase tracking-[0.18em] text-muted">
                  {item.company}
                </p>
                <h3 className="relative mt-2 text-2xl font-semibold tracking-tight sm:text-2xl">{item.area}</h3>

                <ul className="relative mt-7 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li key={tag} className="chip">
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
