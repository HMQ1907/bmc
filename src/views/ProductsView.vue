<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import AppIcon from '../components/AppIcon.vue'
import { useI18n } from '../composables/useI18n.js'
import { categories, products } from '../data/products.js'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const q = ref('')

const active = computed(() => route.params.cat || 'all')
const activeCat = computed(() => categories.find((c) => c.id === active.value))
const list = computed(() => {
  const s = q.value.trim().toLowerCase()
  return products.filter((p) => (active.value === 'all' || p.category === active.value) && (!s || p.name.toLowerCase().includes(s)))
})
const setCat = (id) => router.replace(id === 'all' ? '/products' : `/products/${id}`)
const count = (id) => id === 'all' ? products.length : products.filter((p) => p.category === id).length
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <div class="crumb"><RouterLink to="/">HOME</RouterLink> / {{ t({ vi: 'SẢN PHẨM', en: 'PRODUCTS' }) }}</div>
        <span class="eyebrow">{{ t({ vi: 'Danh mục máy', en: 'Machine catalogue' }) }} · {{ products.length }} models</span>
        <h1 class="h-lg">{{ activeCat ? t(activeCat.name) : t({ vi: 'Toàn bộ thiết bị BMC PACK', en: 'The complete BMC PACK range' }) }}</h1>
        <p class="lead">{{ activeCat ? t(activeCat.desc) : t({ vi: 'Dây chuyền sóng, máy in Flexo, máy bồi, máy bế, máy gấp dán và thiết bị phụ trợ — tất cả từ một nhà sản xuất.', en: 'Corrugators, flexo printers, laminators, die-cutters, folder-gluers and auxiliary equipment — all from one manufacturer.' }) }}</p>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container">
        <div class="bar">
          <div class="chips" role="tablist">
            <button class="chip" :class="{ on: active === 'all' }" @click="setCat('all')">{{ t({ vi: 'Tất cả', en: 'All' }) }} <span class="mono">{{ count('all') }}</span></button>
            <button v-for="c in categories" :key="c.id" class="chip" :class="{ on: active === c.id }" @click="setCat(c.id)">
              {{ t(c.short) }} <span class="mono">{{ count(c.id) }}</span>
            </button>
          </div>
          <label class="search">
            <AppIcon name="search" :size="18" />
            <input v-model="q" type="search" :placeholder="t({ vi: 'Tìm model, ví dụ NDDF…', en: 'Search model, e.g. NDDF…' })" />
          </label>
        </div>

        <TransitionGroup name="grid" tag="div" class="plist">
          <ProductCard v-for="(p, i) in list" :key="p.slug" :product="p" :index="i" />
        </TransitionGroup>
        <p v-if="!list.length" class="empty muted">{{ t({ vi: 'Không tìm thấy model phù hợp.', en: 'No matching models.' }) }}</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.bar { display: flex; justify-content: space-between; gap: 20px; align-items: center; flex-wrap: wrap; margin-bottom: 32px; position: sticky; top: calc(var(--header-h) - 1px); z-index: 5; padding: 14px 0; background: rgba(5,7,13,.85); backdrop-filter: blur(12px); border-bottom: 1px solid var(--line); }
.chips { display: flex; gap: 8px; flex-wrap: wrap; }
.chip { display: inline-flex; align-items: center; gap: 8px; padding: 9px 14px; border-radius: 10px; border: 1px solid var(--line-2); font-size: 14px; color: var(--text-2); transition: all .2s; }
.chip span { font-size: 11px; color: var(--muted); }
.chip:hover { border-color: var(--cyan); color: #fff; }
.chip.on { background: var(--red); border-color: var(--red); color: #fff; box-shadow: 0 6px 20px -6px var(--red-glow); }
.chip.on span { color: rgba(255,255,255,.8); }
.search { display: flex; align-items: center; gap: 10px; padding: 0 14px; height: 44px; border-radius: 10px; border: 1px solid var(--line-2); min-width: 260px; color: var(--muted); }
.search:focus-within { border-color: var(--cyan); }
.search input { flex: 1; background: none; border: 0; color: var(--text); font: inherit; font-size: 14.5px; outline: none; min-width: 0; }
.plist { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
.empty { padding: 60px 0; text-align: center; }
.grid-enter-active { transition: opacity .4s, transform .4s var(--ease); }
.grid-enter-from { opacity: 0; transform: translateY(16px); }
@media (max-width: 640px) {
  .bar { position: static; }
  .chips { flex-wrap: nowrap; overflow-x: auto; width: 100%; padding-bottom: 4px; scrollbar-width: none; }
  .chip { flex: none; }
  .search { width: 100%; min-width: 0; }
}
</style>
