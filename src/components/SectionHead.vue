<script setup>
import SplitText from './SplitText.vue'
defineProps({ eyebrow: String, title: String, sub: String, center: Boolean })
</script>
<template>
  <div class="sh" :class="{ 'sh--c': center }">
    <span v-if="eyebrow" class="eyebrow" v-reveal>{{ eyebrow }}</span>
    <SplitText :text="title" tag="h2" class="h-lg" />
    <p v-if="sub" class="lead" v-reveal="200">{{ sub }}</p>
    <slot />
  </div>
</template>
<style scoped>
.sh { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 18px; margin-bottom: clamp(36px, 5vw, 64px); max-width: 780px; }
.sh--c { align-items: center; text-align: center; margin-left: auto; margin-right: auto; }
.sh--c .lead { margin: 0 auto; }
</style>
