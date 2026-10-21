<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
const props = defineProps({ to: { type: Number, required: true }, duration: { type: Number, default: 1800 } })
const val = ref(0)
const el = ref(null)
let io
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { val.value = props.to; return }
  io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return
    io.disconnect()
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - start) / props.duration)
      val.value = Math.round(props.to * (1 - Math.pow(1 - p, 4)))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, { threshold: 0.4 })
  io.observe(el.value)
})
onBeforeUnmount(() => io && io.disconnect())
</script>
<template><span ref="el">{{ val }}</span></template>
