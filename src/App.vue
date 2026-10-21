<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import FloatDock from './components/FloatDock.vue'
</script>

<template>
  <AppHeader />
  <main>
    <RouterView v-slot="{ Component, route }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </main>
  <AppFooter />
  <FloatDock />
</template>

<style>
.page-enter-active, .page-leave-active { transition: opacity .35s ease, transform .35s var(--ease); }
.page-enter-from { opacity: 0; transform: translateY(12px); }
.page-leave-to { opacity: 0; }
</style>
