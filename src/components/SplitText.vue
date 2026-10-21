<script setup>
/**
 * Word-by-word masked reveal (rise + un-blur), like the Montfort reference.
 * - active === null  → animates when scrolled into view
 * - active true/false → controlled (used inside the scroll story)
 */
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
const props = defineProps({
  text: { type: String, default: '' },
  tag: { type: String, default: 'span' },
  active: { type: Boolean, default: null },
  stagger: { type: Number, default: 45 },
  delay: { type: Number, default: 0 }
})
const el = ref(null)
const inView = ref(false)
const words = computed(() => props.text.split(/\s+/).filter(Boolean))
const on = computed(() => (props.active === null ? inView.value : props.active))
let io
onMounted(() => {
  if (props.active !== null) return
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { inView.value = true; return }
  io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { inView.value = true; io.disconnect() } }, { threshold: 0.2 })
  io.observe(el.value)
})
onBeforeUnmount(() => io && io.disconnect())
</script>

<template>
  <component :is="tag" ref="el" class="st" :class="{ 'is-on': on }" :aria-label="text">
    <template v-for="(w, i) in words" :key="i + w"><span class="st-w" aria-hidden="true"><span class="st-i" :style="{ transitionDelay: `${on ? delay + i * stagger : 0}ms` }">{{ w }}</span></span>{{ i < words.length - 1 ? ' ' : '' }}</template>
  </component>
</template>

<style>
.st-w { display: inline-block; overflow: hidden; vertical-align: top; padding: .14em 0 .08em; margin: -.14em 0 -.08em; }
.st-i { display: inline-block; transform: translateY(110%) rotate(3deg); opacity: 0; filter: blur(8px);
  transition: transform 1s cubic-bezier(.2,.8,.2,1), opacity .9s ease, filter 1s ease; will-change: transform; }
.st.is-on .st-i { transform: none; opacity: 1; filter: blur(0); }
@media (prefers-reduced-motion: reduce) { .st-i { transform: none; opacity: 1; filter: none; } }
</style>
