// v-reveal — fades/slides elements in when they enter the viewport.
// Usage: v-reveal, v-reveal="120" (delay ms)
let io = null
const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function getObserver() {
  if (io) return io
  io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-in')
        io.unobserve(e.target)
      }
    })
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
  return io
}

export const reveal = {
  mounted(el, binding) {
    if (reduce || !('IntersectionObserver' in window)) return
    el.classList.add('rv')
    if (binding.value) el.style.transitionDelay = `${binding.value}ms`
    getObserver().observe(el)
  },
  unmounted(el) {
    io && io.unobserve(el)
  }
}
