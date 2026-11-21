import type { CSSProperties, ReactNode } from 'react'
import { useReveal } from '../hooks'

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}

export function Section({
  id,
  children,
  glow = 'left',
}: {
  id: string
  children: ReactNode
  glow?: 'left' | 'right' | 'center'
}) {
  // Soft glow "blob". The gradient fades to fully transparent at the element's own
  // edge (closest-side) and the element may overflow the section, so there is never
  // a visible seam where one section's background meets the next.
  const pos =
    glow === 'left'
      ? 'left-[-18rem] top-0'
      : glow === 'right'
        ? 'right-[-18rem] top-0'
        : 'left-1/2 top-[-6rem] -translate-x-1/2'
  return (
    <section id={id} className="relative py-24 sm:py-32">
      <div
        aria-hidden
        className={`pointer-events-none absolute -z-10 size-[46rem] ${pos}`}
        style={{
          background:
            'radial-gradient(circle closest-side, color-mix(in oklab, var(--accent) 10%, transparent), color-mix(in oklab, var(--accent-2) 4%, transparent) 55%, transparent)',
        }}
      />
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-16">{children}</div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string
  title: string
  intro?: string
}) {
  return (
    <Reveal className="mb-12 max-w-2xl sm:mb-16">
      <p className="eyebrow mb-4 flex items-center gap-3">
        <span className="h-px w-8 bg-white/25" />
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
      {intro && <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
    </Reveal>
  )
}

export function GithubIcon({ className = 'size-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 .5C5.650.5.500 5.650.500 12c0 5.080 3.290 9.390 7.860 10.910.570.110.780-.250.780-.550 0-.270-.010-1.170-.020-2.120-3.200.700-3.870-1.360-3.870-1.360-.520-1.330-1.280-1.680-1.280-1.680-1.040-.710.080-.700.080-.700 1.150.080 1.760 1.180 1.760 1.180 1.030 1.760 2.690 1.250 3.350.960.100-.740.400-1.250.730-1.540-2.550-.290-5.240-1.280-5.240-5.680 0-1.250.450-2.280 1.180-3.080-.120-.290-.510-1.460.110-3.040 0 0 .960-.310 3.150 1.180a10.900 10.900 0 0 1 5.740 0c2.190-1.490 3.150-1.180 3.150-1.180.620 1.580.230 2.750.110 3.040.730.800 1.180 1.830 1.180 3.080 0 4.410-2.690 5.380-5.250 5.670.410.360.780 1.060.780 2.140 0 1.540-.010 2.790-.010 3.170 0 .310.210.670.790.550A11.510 11.510 0 0 0 23.500 12C23.500 5.650 18.350.500 12 .500Z" />
    </svg>
  )
}
