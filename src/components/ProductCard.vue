<script setup>
import { computed } from 'vue'
import SmartImg from './SmartImg.vue'
import AppIcon from './AppIcon.vue'
import { useI18n } from '../composables/useI18n.js'
import { categories, modelCode } from '../data/products.js'

const props = defineProps({ product: { type: Object, required: true }, index: { type: Number, default: 0 } })
const { t } = useI18n()
const cat = computed(() => categories.find((c) => c.id === props.product.category))
const code = computed(() => modelCode(props.product.name) || `${cat.value.code}-${String(props.index + 1).padStart(2, '0')}`)
</script>

<template>
  <RouterLink :to="`/product/${product.slug}`" class="pc panel hud-corners">
    <div class="pc__media">
      <SmartImg :src="product.image" :alt="product.name" :label="cat.short.en" />
      <span class="tag pc__cat">{{ cat.code }}</span>
      <span v-if="product.featured" class="tag tag--red pc__feat">Flagship</span>
    </div>
    <div class="pc__body">
      <span class="pc__code mono">{{ code }}</span>
      <h3 class="pc__name">{{ product.name }}</h3>
      <div v-if="product.keys" class="pc__keys">
        <span v-for="k in product.keys" :key="k[1]"><b>{{ k[0] }}</b>{{ k[1] }}</span>
      </div>
      <span class="pc__more">{{ t({ vi: 'Xem chi tiết', en: 'View details' }) }} <AppIcon name="arrowUpRight" :size="16" /></span>
    </div>
  </RouterLink>
</template>

<style scoped>
.pc { display: flex; flex-direction: column; overflow: visible; transition: transform .4s var(--ease), border-color .3s, box-shadow .4s; }
.pc:hover { transform: translateY(-6px); border-color: var(--line-2); box-shadow: 0 30px 60px -30px rgba(255,45,74,.35); }
.pc__media { position: relative; aspect-ratio: 4 / 3; border-radius: var(--r) var(--r) 0 0; overflow: hidden; }
.pc__media .simg { position: absolute; inset: 0; }
.pc__media::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 55%, rgba(5,7,13,.85)); pointer-events: none; }
.pc:hover :deep(img) { transform: scale(1.05); }
.pc__cat { position: absolute; top: 12px; left: 12px; z-index: 1; backdrop-filter: blur(6px); background: rgba(5,7,13,.6); }
.pc__feat { position: absolute; top: 12px; right: 12px; z-index: 1; backdrop-filter: blur(6px); }
.pc__body { padding: 18px 20px 20px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
.pc__code { font-size: 11px; color: var(--cyan); letter-spacing: .08em; }
.pc__name { font-size: 17px; font-weight: 600; line-height: 1.35; letter-spacing: -.01em; }
.pc__keys { display: flex; gap: 14px; flex-wrap: wrap; font-family: var(--f-mono); font-size: 11px; color: var(--muted); }
.pc__keys b { color: #fff; font-size: 15px; margin-right: 3px; font-weight: 600; }
.pc__more { margin-top: auto; padding-top: 10px; display: inline-flex; align-items: center; gap: 6px; font-size: 13.5px; font-weight: 600; color: var(--text-2); transition: color .2s; }
.pc:hover .pc__more { color: var(--red); }
</style>
