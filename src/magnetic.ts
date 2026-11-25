import { useEffect, useRef } from 'react'

/**
 * "Magnetic" elements: when the pointer comes near, the element is pulled a little
 * toward it; when the pointer leaves, it springs back with a small elastic wobble.
 * The whole element moves as one piece (no separate outline layer).
 *
 * Only for a real mouse (hover + fine pointer) and never with reduced motion.
 * One shared pointer listener; only the nearest element in reach is pulled.
 */

type Item = {
  el: HTMLElement
  x: number
  y: number
  vx: number
  vy: number
  tx: number
  ty: number
  active: boolean
}

const PULL = 0.42 // share of the pointer offset the element follows
const REACH = 28 // px around the element where the pull starts
const FOLLOW = { stiffness: 320, damping: 30 } // quick, settled follow
const RETURN = { stiffness: 170, damping: 9 } // bouncy release

const items = new Set<Item>()
let pointer: { x: number; y: number } | null = null
let raf = 0
let last = 0

function pickTargets() {
  let nearest: Item | null = null
  let best = Infinity
  const offsets = new Map<Item, { dx: number; dy: number }>()
  for (const it of items) {
    if (!pointer) break
    const r = it.el.getBoundingClientRect()
    // Measure against the resting position, not the displaced one.
    const cx = r.left + r.width / 2 - it.x
    const cy = r.top + r.height / 2 - it.y
    const dx = pointer.x - cx
    const dy = pointer.y - cy
    if (Math.abs(dx) > r.width / 2 + REACH || Math.abs(dy) > r.height / 2 + REACH) continue
    const gap = Math.hypot(Math.max(0, Math.abs(dx) - r.width / 2), Math.max(0, Math.abs(dy) - r.height / 2))
    offsets.set(it, { dx, dy })
    if (gap < best) {
      best = gap
      nearest = it
    }
  }
  for (const it of items) {
    const o = it === nearest ? offsets.get(it) : undefined
    it.active = !!o
    it.tx = o ? o.dx * PULL : 0
    it.ty = o ? o.dy * PULL : 0
  }
}

function tick(now: number) {
  const dt = Math.min(0.032, (now - last) / 1000 || 0.016)
  last = now
  pickTargets()
  let moving = false
  for (const it of items) {
    const s = it.active ? FOLLOW : RETURN
    it.vx += (s.stiffness * (it.tx - it.x) - s.damping * it.vx) * dt
    it.vy += (s.stiffness * (it.ty - it.y) - s.damping * it.vy) * dt
    it.x += it.vx * dt
    it.y += it.vy * dt
    const resting =
      Math.abs(it.x - it.tx) < 0.05 && Math.abs(it.y - it.ty) < 0.05 && Math.abs(it.vx) < 0.05 && Math.abs(it.vy) < 0.05
    if (resting) {
      it.x = it.tx
      it.y = it.ty
      it.vx = it.vy = 0
    } else moving = true
    it.el.style.transform = it.x || it.y ? `translate3d(${it.x.toFixed(2)}px, ${it.y.toFixed(2)}px, 0)` : ''
  }
  raf = moving || [...items].some((it) => it.active) ? requestAnimationFrame(tick) : 0
}

function wake() {
  if (!raf) {
    last = performance.now()
    raf = requestAnimationFrame(tick)
  }
}

function onMove(e: PointerEvent) {
  if (e.pointerType !== 'mouse') return
  pointer = { x: e.clientX, y: e.clientY }
  wake()
}
function onLeave() {
  pointer = null
  wake()
}

export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    const item: Item = { el, x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0, active: false }
    // The spring drives transform itself; a CSS transition on it would smear the motion.
    const prevTransition = el.style.transition
    el.style.transition = 'box-shadow 0.3s ease, background 0.3s ease, border-color 0.3s ease'
    el.style.willChange = 'transform'

    if (items.size === 0) {
      window.addEventListener('pointermove', onMove, { passive: true })
      document.documentElement.addEventListener('pointerleave', onLeave)
    }
    items.add(item)

    return () => {
      items.delete(item)
      el.style.transform = ''
      el.style.transition = prevTransition
      el.style.willChange = ''
      if (items.size === 0) {
        window.removeEventListener('pointermove', onMove)
        document.documentElement.removeEventListener('pointerleave', onLeave)
        cancelAnimationFrame(raf)
        raf = 0
      }
    }
  }, [])
  return ref
}
