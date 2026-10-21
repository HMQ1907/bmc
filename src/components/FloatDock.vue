<script setup>
import AppIcon from './AppIcon.vue'
import { company } from '../data/company.js'
</script>
<template>
  <div class="dock" aria-label="Quick contact">
    <a :href="company.zalo" target="_blank" rel="noopener" class="dock__b dock__zalo" aria-label="Zalo">Zalo</a>
    <a :href="company.whatsapp" target="_blank" rel="noopener" class="dock__b dock__wa" aria-label="WhatsApp"><AppIcon name="chat" :size="20" /></a>
    <a :href="`tel:${company.phoneRaw}`" class="dock__b dock__ph" aria-label="Call"><AppIcon name="phone" :size="20" /></a>
  </div>
</template>
<style scoped>
.dock { position: fixed; right: 18px; bottom: 18px; z-index: 40; display: flex; flex-direction: column; gap: 10px; }
.dock__b { width: 50px; height: 50px; border-radius: 14px; display: grid; place-items: center; color: #fff; font-family: var(--f-head); font-weight: 700; font-size: 12px; box-shadow: 0 10px 24px -8px rgba(0,0,0,.6); transition: transform .25s var(--ease); border: 1px solid rgba(255,255,255,.15); }
.dock__b:hover { transform: translateY(-3px) scale(1.04); }
.dock__zalo { background: #0068ff; }
.dock__wa { background: #1fae5b; }
.dock__ph { background: linear-gradient(135deg, var(--red), var(--red-deep)); animation: ring 2.6s infinite; }
@keyframes ring { 0%, 100% { box-shadow: 0 0 0 0 rgba(255,45,74,.5); } 60% { box-shadow: 0 0 0 12px rgba(255,45,74,0); } }
@media (max-width: 560px) { .dock { right: 12px; bottom: 12px; } .dock__b { width: 44px; height: 44px; } }
</style>
