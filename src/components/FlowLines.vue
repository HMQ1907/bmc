<script setup>
/**
 * Decorative undulating "silk" lines (SVG). Each line morphs between two
 * sine shapes (SMIL) and carries a travelling light pulse.
 */
const props = defineProps({ count: { type: Number, default: 7 }, tone: { type: String, default: 'mix' } })
const W = 1440, H = 800, N = 64
const uid = Math.random().toString(36).slice(2, 8)

function wave(base, amp, freq, phase, tilt) {
  let d = ''
  for (let i = 0; i <= N; i++) {
    const x = (i / N) * W
    const y = base + Math.sin((i / N) * Math.PI * 2 * freq + phase) * amp + (i / N - 0.5) * tilt
    d += `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`
  }
  return d
}
const lines = Array.from({ length: props.count }, (_, k) => {
  const base = H * 0.25 + (k / props.count) * H * 0.55
  const amp = 40 + k * 9
  const f = 1.1 + (k % 3) * 0.25
  return {
    a: wave(base, amp, f, k * 0.7, 120 - k * 30),
    b: wave(base + 20, amp * 1.25, f, k * 0.7 + 2.2, -80 + k * 25),
    dur: 9 + k * 1.7,
    pulse: 6 + (k % 4) * 1.5,
    delay: -k * 1.3,
    op: 0.3 + (k % 3) * 0.1
  }
})
</script>

<template>
  <svg class="flow" :viewBox="`0 0 ${W} ${H}`" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient :id="`fg-${uid}`" x1="0" x2="1">
        <stop offset="0" stop-color="#3de0ff" stop-opacity="0" />
        <stop offset=".35" :stop-color="tone === 'red' ? '#ff2d4a' : '#3de0ff'" />
        <stop offset=".7" stop-color="#ff2d4a" />
        <stop offset="1" stop-color="#ff2d4a" stop-opacity="0" />
      </linearGradient>
    </defs>
    <g v-for="(l, i) in lines" :key="i">
      <path :d="l.a" fill="none" :stroke="`url(#fg-${uid})`" stroke-width="1" :opacity="l.op">
        <animate attributeName="d" :dur="`${l.dur}s`" repeatCount="indefinite" :values="`${l.a};${l.b};${l.a}`" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1" />
      </path>
      <path :d="l.a" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-dasharray="90 1900" opacity=".75" class="flow__pulse">
        <animate attributeName="d" :dur="`${l.dur}s`" repeatCount="indefinite" :values="`${l.a};${l.b};${l.a}`" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1" />
        <animate attributeName="stroke-dashoffset" :dur="`${l.pulse}s`" :begin="`${l.delay}s`" repeatCount="indefinite" values="1990;0" />
      </path>
    </g>
  </svg>
</template>

<style scoped>
.flow { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; mix-blend-mode: screen; }
.flow__pulse { filter: drop-shadow(0 0 4px #3de0ff); }
</style>
