// Inertial smooth scrolling (Lenis) shared across the app.
import Lenis from 'lenis'

let lenis = null
const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function initSmoothScroll() {
  if (lenis || reduce) return lenis
  lenis = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.4
  })
  const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf) }
  requestAnimationFrame(raf)
  return lenis
}

export function getLenis() { return lenis }

export function scrollToTarget(target, opts = {}) {
  const offset = opts.offset ?? 0
  if (lenis) { lenis.scrollTo(target, { offset, immediate: !!opts.immediate, duration: opts.duration ?? 1.4 }); return }
  if (typeof target === 'number') { window.scrollTo({ top: target, behavior: opts.immediate ? 'auto' : 'smooth' }); return }
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: opts.immediate ? 'auto' : 'smooth' })
}
