import { ArrowUpRight, Check, Loader, Lock } from 'lucide-react'
import { GITHUB_URL, projects } from '../content'
import type { ReactNode } from 'react'
import type { Project } from '../content'
import { GithubIcon, Reveal, Section, SectionHeading } from './ui'

function WindowFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-[#0a0f1a] shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="ml-2 truncate font-mono text-[0.68rem] text-faint">{title}</span>
      </div>
      {children}
    </div>
  )
}

function ToolsmithVisual() {
  return (
    <WindowFrame title="toolsmith — new detection">
      <img
        src={`${import.meta.env.BASE_URL}projects/toolsmith.jpg`}
        alt="Toolsmith — request editor for a new detection"
        width={1440}
        height={900}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full"
      />
    </WindowFrame>
  )
}

function RedLabVisual() {
  const steps = ['POST /api/deployments', 'Clone VM template', 'Set CPU · RAM · SSH key', 'Start VM', 'Wait for IP address']
  return (
    <WindowFrame title="red lab — deployment portal">
      <div aria-hidden className="space-y-3 p-5 font-mono text-[0.78rem]">
        {steps.map((s, i) => {
          const done = i < steps.length - 1
          return (
            <div key={s} className="flex items-center gap-3">
              <span
                className={`grid size-5 shrink-0 place-items-center rounded-full border ${
                  done ? 'border-accent/50 bg-accent/15 text-accent' : 'border-line text-muted'
                }`}
              >
                {done ? <Check className="size-3" /> : <Loader className="size-3 animate-spin" />}
              </span>
              <span className={done ? 'text-ink/85' : 'text-muted'}>{s}</span>
            </div>
          )
        })}
        <div className="mt-5! h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
          <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-accent to-accent-2" />
        </div>
        <p className="flex justify-between text-[0.68rem] text-faint">
          <span>applying</span>
          <span>80 %</span>
        </p>
      </div>
    </WindowFrame>
  )
}

function SiemVisual() {
  // Sample report taken from the project's README (documentation IP ranges).
  return (
    <WindowFrame title="python app/main.py">
      <pre aria-hidden className="overflow-x-auto p-5 font-mono text-[0.72rem] leading-6 text-muted">
        <span className="text-faint">$</span> <span className="text-ink">python app/main.py --log auth.log</span>
        {'\n'}Failed logins   : <span className="text-ink">21</span>
        {'\n'}Unique IPs      : <span className="text-ink">17</span>
        {'\n'}
        {'\n'}
        <span className="text-accent">--- Potential Brute Force ---</span>
        {'\n'}  203.0.113.45  | count: 9 | <span className="text-amber-300">MED</span>
        {'\n'}
        <span className="text-accent">--- Compromise ---</span>
        {'\n'}  198.51.100.23 | count: 8 | <span className="text-rose-400">CRITICAL</span>
        {'\n'}
        <span className="text-accent">--- Password Spray ---</span>
        {'\n'}  admin | source IPs: 8 | <span className="text-orange-400">HIGH</span>
      </pre>
    </WindowFrame>
  )
}

const visuals = { toolsmith: ToolsmithVisual, redlab: RedLabVisual, siem: SiemVisual }

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag} className="chip">
          {tag}
        </li>
      ))}
    </ul>
  )
}

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const Visual = project.visual ? visuals[project.visual] : null
  const flip = index % 2 === 1
  return (
    <Reveal>
      <article className="card overflow-hidden p-5 sm:p-8 lg:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className={flip ? 'lg:order-2' : undefined}>{Visual && <Visual />}</div>

          <div>
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-accent">
              <span className="text-faint">0{index + 1}</span>
              {project.kind}
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-4xl">{project.name}</h3>
            {project.meta && <p className="mt-2 font-mono text-[0.7rem] text-faint">{project.meta}</p>}
            <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

            {project.highlights && (
              <ul className="mt-5 space-y-2.5 text-sm text-ink/85">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6">
              <Tags tags={project.tags} />
            </div>

            <a href={project.url} target="_blank" rel="noreferrer" className="btn btn-ghost mt-7">
              <GithubIcon className="size-4" />
              {projects.viewRepo}
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        className="card card-hover group flex h-full flex-col p-6 sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-accent">{project.kind}</p>
          <ArrowUpRight className="size-5 shrink-0 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </div>
        <h3 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">{project.name}</h3>
        {project.meta && <p className="mt-1.5 font-mono text-[0.68rem] text-faint">{project.meta}</p>}
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>
        <div className="mt-6">
          <Tags tags={project.tags} />
        </div>
      </a>
    </Reveal>
  )
}

export function Projects() {
  return (
    <Section id="projects" glow="right">
      <SectionHeading eyebrow={projects.eyebrow} title={projects.title} intro={projects.intro} />

      <div className="space-y-6">
        {projects.featured.map((p, i) => (
          <FeaturedProject key={p.slug} project={p} index={i} />
        ))}
      </div>

      <Reveal className="mb-6 mt-16 flex items-end justify-between gap-4">
        <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{projects.moreTitle}</h3>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2">
        {projects.more.map((p, i) => (
          <ProjectCard key={p.slug} project={p} delay={i * 100} />
        ))}
      </div>

      {/* Client & company work lives in private repositories */}
      <Reveal className="mt-5">
        <div className="card relative overflow-hidden p-6 sm:p-8">
          {/* Redacted "code" lines in the background hint at work that can't be shown. */}
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 flex-col justify-center gap-3 pr-8 opacity-60 md:flex">
            {[72, 48, 86, 60, 38, 78].map((w, i) => (
              <span
                key={i}
                className="h-2 rounded-full bg-white/[0.06]"
                style={{ width: `${w}%`, marginLeft: `${(i % 3) * 8}%` }}
              />
            ))}
          </div>
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-line bg-white/[0.04] text-accent">
              <Lock className="size-5" strokeWidth={1.8} />
            </span>
            <div className="max-w-xl">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{projects.private.eyebrow}</p>
              <h3 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">{projects.private.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{projects.private.description}</p>
              <a
                href="#contact"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all hover:gap-2.5"
              >
                {projects.private.action}
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-10 flex justify-center">
        <a href={`${GITHUB_URL}?tab=repositories`} target="_blank" rel="noreferrer" className="btn btn-primary">
          <GithubIcon className="size-4" />
          {projects.allRepos}
        </a>
      </Reveal>
    </Section>
  )
}
