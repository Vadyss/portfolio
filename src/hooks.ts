import { useEffect, useRef, useState } from 'react'

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Adds `is-visible` to the element the first time it scrolls into view. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

/** Returns the id of the section currently nearest the middle of the viewport. */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e)
    if (!els.length || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}

// Glyphs close to the average letter width, so lines keep their shape while scrambling.
const GLYPHS = '<>/\\[]{}=+*?#$%&'

/**
 * Cycles through `phrases`, resolving each one out of scrambled glyphs.
 * With reduced motion the phrases simply swap.
 */
export function useScramble(phrases: string[], holdMs = 3200): [text: string, index: number] {
  const [text, setText] = useState(phrases[0] ?? '')
  const [current, setCurrent] = useState(0)
  const key = phrases.join('|')

  useEffect(() => {
    const list = key.split('|')
    let index = 0
    let frame = 0
    let raf = 0
    let timer = 0
    let cancelled = false
    setText(list[0] ?? '')
    setCurrent(0)
    if (list.length < 2) return

    const reduced = prefersReducedMotion()

    const run = () => {
      if (cancelled) return
      index = (index + 1) % list.length
      const target = list[index]
      setCurrent(index)
      if (reduced) {
        setText(target)
        timer = window.setTimeout(run, holdMs)
        return
      }
      frame = 0
      const total = 28
      const tick = () => {
        if (cancelled) return
        frame++
        const progress = frame / total
        let out = ''
        for (let i = 0; i < target.length; i++) {
          const ch = target[i]
          if (ch === ' ' || ch === '\u2060' || i / target.length < progress) out += ch
          else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        }
        setText(out)
        if (frame < total) raf = requestAnimationFrame(tick)
        else {
          setText(target)
          timer = window.setTimeout(run, holdMs)
        }
      }
      raf = requestAnimationFrame(tick)
    }

    timer = window.setTimeout(run, holdMs)
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
  }, [key, holdMs])

  return [text, current]
}
