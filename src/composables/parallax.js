// v-parallax="0.15" — element drifts relative to its viewport position while scrolling.
const items = new Set()
let running = false
const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function tick() {
  const vh = window.innerHeight
  items.forEach((it) => {
    const r = it.el.getBoundingClientRect()
    if (r.bottom < -200 || r.top > vh + 200) return
    const center = r.top + r.height / 2 - vh / 2
    it.el.style.transform = `translate3d(0, ${(-center * it.speed).toFixed(1)}px, 0) scale(${it.scale})`
  })
  if (items.size) requestAnimationFrame(tick)
  else running = false
}

export const parallax = {
  mounted(el, binding) {
    if (reduce || !binding.value) return
    const speed = Number(binding.value)
    items.add({ el, speed, scale: 1 + Math.abs(speed) * 0.9 })
    el.style.willChange = 'transform'
    if (!running) { running = true; requestAnimationFrame(tick) }
  },
  unmounted(el) {
    items.forEach((it) => it.el === el && items.delete(it))
  }
}
