<script setup>
defineProps({ eyebrow: String, title: String, sub: String, center: Boolean })
</script>
<template>
  <div class="sh" :class="{ 'sh--c': center }" v-reveal>
    <span v-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
    <h2 class="h-lg">{{ title }}<slot name="title" /></h2>
    <p v-if="sub" class="lead">{{ sub }}</p>
    <slot />
  </div>
</template>
<style scoped>
.sh { display: flex; flex-direction: column; gap: 18px; margin-bottom: clamp(36px, 5vw, 64px); max-width: 780px; }
.sh--c { align-items: center; text-align: center; margin-left: auto; margin-right: auto; }
.sh--c .lead { margin: 0 auto; }
</style>
