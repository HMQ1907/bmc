<script setup>
import { ref, watch } from 'vue'
const props = defineProps({ src: String, alt: { type: String, default: '' }, label: String, eager: Boolean, parallax: { type: Number, default: 0 } })
const state = ref('loading')
watch(() => props.src, () => { state.value = 'loading' })
</script>

<template>
  <div class="simg" :class="`is-${state}`">
    <img v-if="src && state !== 'error'" v-parallax="parallax" :src="src" :alt="alt" :loading="eager ? 'eager' : 'lazy'" decoding="async"
         @load="state = 'ok'" @error="state = 'error'" />
    <div v-if="state !== 'ok'" class="simg__ph" aria-hidden="true">
      <svg viewBox="0 0 120 40" width="96"><path d="M0 20 Q7.5 4 15 20 T30 20 T45 20 T60 20 T75 20 T90 20 T105 20 T120 20" fill="none" stroke="currentColor" stroke-width="2" /></svg>
      <span v-if="state === 'error'" class="mono">{{ label || 'BMC PACK' }}</span>
    </div>
  </div>
</template>

<style scoped>
.simg { position: relative; overflow: hidden; background: radial-gradient(80% 80% at 50% 40%, #142036, #0a0f1a); }
.simg img { width: 100%; height: 100%; object-fit: cover; transition: opacity .6s, transform .8s var(--ease); }
.simg.is-loading img { opacity: 0; }
.simg__ph { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; color: rgba(61,224,255,.35); }
.simg.is-loading .simg__ph svg { animation: flow 1.6s linear infinite; }
.simg__ph span { font-size: 11px; letter-spacing: .12em; color: var(--muted); text-transform: uppercase; padding: 0 12px; text-align: center; }
@keyframes flow { from { transform: translateX(-8px); } to { transform: translateX(8px); } }
</style>
