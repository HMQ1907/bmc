<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import FloatDock from './components/FloatDock.vue'
import { scrollToTarget } from './composables/useSmoothScroll.js'
const toTop = () => scrollToTarget(0, { immediate: true })
</script>

<template>
  <!-- Shared liquid-wave distortion filter (used on image hover) -->
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <filter id="bmc-wave" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.008 0.022" numOctaves="2" seed="3" result="n">
        <animate attributeName="baseFrequency" dur="7s" values="0.008 0.022;0.014 0.03;0.008 0.022" repeatCount="indefinite" />
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="22" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </svg>
  <AppHeader />
  <main>
    <RouterView v-slot="{ Component, route }">
      <Transition name="page" mode="out-in" @before-enter="toTop">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </main>
  <AppFooter />
  <FloatDock />
</template>

<style>
.page-enter-active, .page-leave-active { transition: opacity .45s ease, transform .45s var(--ease), filter .45s; }
.page-enter-from { opacity: 0; transform: translateY(14px); filter: blur(6px); }
.page-leave-to { opacity: 0; filter: blur(6px); }
</style>
