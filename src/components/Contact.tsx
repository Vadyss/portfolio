import { useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowUp, ArrowUpRight, Check, Copy, Mail, Phone } from 'lucide-react'
import { contact, footer, GITHUB_URL, GITHUB_USER, profile } from '../content'
import { GithubIcon, Reveal, Section } from './ui'

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable — the visible value can still be selected */
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`${contact.copy}: ${value}`}
      title={copied ? contact.copied : contact.copy}
      className="grid size-9 shrink-0 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-accent/50 hover:text-accent"
    >
      {copied ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
    </button>
  )
}

function ContactCard({
  icon,
  label,
  value,
  note,
  href,
  action,
  external,
  copyValue,
}: {
  icon: ReactNode
  label: string
  value: string
  note?: string
  href: string
  action: string
  external?: boolean
  copyValue?: string
}) {
  return (
    <div className="card card-hover flex h-full flex-col p-6 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <span className="grid size-11 place-items-center rounded-xl border border-line bg-white/[0.04] text-ink/80">
          {icon}
        </span>
        {copyValue && <CopyButton value={copyValue} />}
      </div>
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-muted">{label}</p>
      <p className="mt-1.5 font-display text-lg font-medium tracking-tight text-ink [overflow-wrap:anywhere] sm:text-xl">{value}</p>
      {note && <p className="mt-1 text-sm text-faint">{note}</p>}
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-accent transition-all hover:gap-2.5"
      >
        {action}
        <ArrowUpRight className="size-4" />
      </a>
    </div>
  )
}

export function Contact() {
  return (
    <Section id="contact" glow="center">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="eyebrow mb-4">{contact.eyebrow}</p>
        <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
          {contact.title}
        </h2>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3">
        <Reveal delay={0} className="h-full">
          <ContactCard
            icon={<Mail className="size-5" />}
            label={contact.personalEmail}
            value={profile.emailPersonal}
            href={`mailto:${profile.emailPersonal}`}
            action={contact.actions.email}
            copyValue={profile.emailPersonal}
          />
        </Reveal>
        <Reveal delay={80} className="h-full">
          <ContactCard
            icon={<Phone className="size-5" />}
            label={contact.phone}
            value={profile.phoneDisplay}
            href={profile.phoneHref}
            action={contact.actions.call}
            copyValue={profile.phoneDisplay}
          />
        </Reveal>
        <Reveal delay={160} className="h-full">
          <ContactCard
            icon={<GithubIcon className="size-5" />}
            label={contact.github}
            value={`@${GITHUB_USER}`}
            href={GITHUB_URL}
            action={contact.actions.profile}
            external
          />
        </Reveal>
      </div>
    </Section>
  )
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      {/* Oversized outlined wordmark */}
      <p
        aria-hidden
        className="pointer-events-none select-none whitespace-nowrap pt-10 text-center font-display text-[15vw] font-bold uppercase leading-[0.85] tracking-tighter text-transparent lg:text-[12rem]"
        style={{
          WebkitTextStroke: '1px color-mix(in oklab, var(--accent) 35%, transparent)',
          maskImage: 'linear-gradient(to bottom, #000 30%, transparent 95%)',
        }}
      >
        {profile.name}
      </p>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-faint sm:flex-row sm:px-8 lg:px-16">
        <p>
          © {new Date().getFullYear()} {profile.name}. {footer.built}
        </p>
        <a href="#home" className="inline-flex items-center gap-2 text-muted transition-colors hover:text-accent">
          {footer.top}
          <ArrowUp className="size-4" />
        </a>
      </div>
    </footer>
  )
}
