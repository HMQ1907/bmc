<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SmartImg from '../components/SmartImg.vue'
import AppIcon from '../components/AppIcon.vue'
import ProductCard from '../components/ProductCard.vue'
import QuoteForm from '../components/QuoteForm.vue'
import { useI18n } from '../composables/useI18n.js'
import { categories, products, modelCode } from '../data/products.js'
import { lineStages, company } from '../data/company.js'

const { t } = useI18n()
const route = useRoute()
const p = computed(() => products.find((x) => x.slug === route.params.slug))
const cat = computed(() => p.value && categories.find((c) => c.id === p.value.category))
const shot = ref(0)
watch(() => route.params.slug, () => { shot.value = 0 })
const related = computed(() => p.value ? products.filter((x) => x.category === p.value.category && x.slug !== p.value.slug).slice(0, 3) : [])
const code = computed(() => p.value && (modelCode(p.value.name) || cat.value.code))
const toQuote = () => {
  const el = document.getElementById('quote')
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' })
}
</script>

<template>
  <div v-if="p">
    <section class="page-hero pd-hero">
      <div class="container pd">
        <div class="pd__media">
          <div class="pd__main panel hud-corners">
            <SmartImg :src="p.gallery[shot]" :alt="p.name" :label="cat.short.en" eager />
            <span class="tag pd__count mono">{{ String(shot + 1).padStart(2, '0') }} / {{ String(p.gallery.length).padStart(2, '0') }}</span>
          </div>
          <div v-if="p.gallery.length > 1" class="pd__thumbs">
            <button v-for="(g, i) in p.gallery" :key="g" :class="{ on: i === shot }" @click="shot = i" :aria-label="`Image ${i + 1}`">
              <SmartImg :src="g" alt="" />
            </button>
          </div>
        </div>

        <div class="pd__info">
          <div class="crumb"><RouterLink to="/">HOME</RouterLink> / <RouterLink to="/products">{{ t({ vi: 'SẢN PHẨM', en: 'PRODUCTS' }) }}</RouterLink> / <RouterLink :to="`/products/${cat.id}`">{{ cat.code }}</RouterLink></div>
          <div class="pd__tags">
            <span class="tag">{{ code }}</span>
            <span v-if="p.featured" class="tag tag--red">Flagship</span>
          </div>
          <h1 class="pd__title">{{ p.name }}</h1>
          <p v-if="p.tagline" class="pd__tagline mono">{{ t(p.tagline) }}</p>
          <p class="lead">{{ p.summary ? t(p.summary) : t(cat.desc) }}</p>

          <div v-if="p.keys" class="pd__keys">
            <div v-for="k in p.keys" :key="k[1]"><b>{{ k[0] }}</b><span class="mono">{{ k[1] }}</span></div>
          </div>

          <div class="pd__cta">
            <button type="button" class="btn btn--primary" @click="toQuote">{{ t({ vi: 'Nhận báo giá model này', en: 'Get a quote for this model' }) }} <AppIcon name="arrow" /></button>
            <a :href="company.zalo" target="_blank" rel="noopener" class="btn btn--ghost">Zalo / WhatsApp</a>
          </div>
          <a :href="p.source" target="_blank" rel="noopener" class="pd__src mono">{{ t({ vi: 'Trang sản phẩm gốc', en: 'Original product page' }) }} <AppIcon name="external" :size="13" /></a>
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container pd-body">
        <div class="pd-body__main">
          <!-- Specs -->
          <div v-if="p.specs || p.specsTable" class="block">
            <h2 class="block__h"><span class="mono">// </span>{{ t({ vi: 'Thông số kỹ thuật', en: 'Technical specifications' }) }}</h2>
            <dl v-if="p.specs" class="specs">
              <div v-for="(s, i) in p.specs" :key="i"><dt>{{ t(s[0]) }}</dt><dd class="mono">{{ t(s[1]) }}</dd></div>
            </dl>
            <div v-if="p.specsTable" class="tbl-wrap">
              <table class="tbl">
                <thead><tr><th v-for="(h, i) in p.specsTable.head" :key="i">{{ t(h) }}</th></tr></thead>
                <tbody><tr v-for="(r, i) in p.specsTable.rows" :key="i"><td v-for="(c, j) in r" :key="j" :class="{ mono: j > 0 }">{{ t(c) }}</td></tr></tbody>
              </table>
            </div>
          </div>

          <!-- Features -->
          <div v-if="p.features" class="block">
            <h2 class="block__h"><span class="mono">// </span>{{ t({ vi: 'Điểm nổi bật', en: 'Key features' }) }}</h2>
            <ul class="feats">
              <li v-for="(f, i) in p.features" :key="i"><span class="mono">{{ String(i + 1).padStart(2, '0') }}</span>{{ t(f) }}</li>
            </ul>
          </div>

          <!-- Generic block for models without detailed data -->
          <div v-if="!p.specs && !p.specsTable" class="block panel generic">
            <h2 class="block__h"><span class="mono">// </span>{{ t({ vi: 'Cấu hình theo yêu cầu', en: 'Configured to order' }) }}</h2>
            <p class="muted">{{ t({ vi: 'Model này được cấu hình theo khổ máy, tốc độ và mức độ tự động hóa của từng nhà máy. Gửi yêu cầu để nhận bảng thông số chi tiết và báo giá.', en: 'This model is configured to each plant’s width, speed and automation level. Send a request to receive the full spec sheet and quotation.' }) }}</p>
            <ul class="feats">
              <li><span class="mono">01</span>{{ t({ vi: 'Linh kiện Siemens, Schneider Electric, NSK, Omron', en: 'Siemens, Schneider Electric, NSK, Omron components' }) }}</li>
              <li><span class="mono">02</span>{{ t({ vi: 'Chạy thử tại xưởng trước khi giao hàng', en: 'Factory run-tested before shipping' }) }}</li>
              <li><span class="mono">03</span>{{ t({ vi: 'Lắp đặt, chạy thử và đào tạo vận hành tại chỗ', en: 'On-site installation, commissioning and operator training' }) }}</li>
            </ul>
          </div>

          <div v-if="p.category === 'corrugated'" class="block">
            <h2 class="block__h"><span class="mono">// </span>{{ t({ vi: 'Vị trí trong dây chuyền', en: 'Position in the line' }) }}</h2>
            <ol class="mini-line">
              <li v-for="s in lineStages" :key="s.code"><span class="mono">{{ s.code }}</span>{{ t(s.name) }}</li>
            </ol>
          </div>
        </div>

        <aside id="quote" class="pd-body__side">
          <QuoteForm :preset="cat.name.en" />
        </aside>
      </div>
    </section>

    <section v-if="related.length" class="section section--tight">
      <div class="container">
        <h2 class="h-md rel-h">{{ t({ vi: 'Model cùng nhóm', en: 'Related models' }) }}</h2>
        <div class="rel">
          <ProductCard v-for="(r, i) in related" :key="r.slug" :product="r" :index="i" />
        </div>
      </div>
    </section>
  </div>

  <section v-else class="page-hero">
    <div class="container">
      <h1 class="h-lg">{{ t({ vi: 'Không tìm thấy sản phẩm', en: 'Product not found' }) }}</h1>
      <RouterLink to="/products" class="btn btn--primary" style="margin-top: 24px">{{ t({ vi: 'Về danh mục', en: 'Back to catalogue' }) }}</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.pd { display: grid; grid-template-columns: 1.1fr .9fr; gap: clamp(28px, 5vw, 64px); align-items: start; }
.pd__main { position: relative; aspect-ratio: 4/3; overflow: hidden; }
.pd__main .simg { position: absolute; inset: 0; border-radius: var(--r); }
.pd__main :deep(img) { object-fit: contain; background: #fff; }
.pd__count { position: absolute; right: 12px; bottom: 12px; background: rgba(5,7,13,.7); }
.pd__thumbs { display: flex; gap: 10px; margin-top: 12px; overflow-x: auto; padding-bottom: 4px; }
.pd__thumbs button { flex: none; width: 84px; height: 64px; border-radius: 8px; overflow: hidden; border: 1.5px solid var(--line); opacity: .6; transition: all .2s; }
.pd__thumbs button .simg { width: 100%; height: 100%; }
.pd__thumbs button.on, .pd__thumbs button:hover { border-color: var(--red); opacity: 1; }
.pd__info { display: flex; flex-direction: column; gap: 16px; }
.pd__info .crumb { margin-bottom: 0; }
.pd__tags { display: flex; gap: 8px; flex-wrap: wrap; }
.pd__title { font-size: clamp(26px, 3.2vw, 42px); font-weight: 800; letter-spacing: -.025em; }
.pd__tagline { color: var(--red); font-size: 13px; letter-spacing: .04em; }
.pd__keys { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 6px; }
.pd__keys div { padding: 14px; border: 1px solid var(--line); border-radius: 10px; background: rgba(255,255,255,.02); }
.pd__keys b { display: block; font-family: var(--f-head); font-size: 26px; font-weight: 800; letter-spacing: -.03em; }
.pd__keys span { font-size: 11px; color: var(--cyan); }
.pd__cta { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 8px; }
.pd__src { display: inline-flex; gap: 6px; align-items: center; font-size: 12px; color: var(--muted); }
.pd__src:hover { color: var(--cyan); }

.pd-body { display: grid; grid-template-columns: 1.3fr .7fr; gap: clamp(28px, 4vw, 56px); align-items: start; }
.pd > *, .pd-body > * { min-width: 0; }
.pd-body__side { position: sticky; top: calc(var(--header-h) + 20px); }
.block { margin-bottom: 48px; }
.block.generic { padding: 28px; }
.block__h { font-size: 24px; margin-bottom: 20px; }
.block__h span { color: var(--red); }
.specs { margin: 0; border-top: 1px solid var(--line); }
.specs div { display: grid; grid-template-columns: 1fr 1.2fr; gap: 16px; padding: 13px 0; border-bottom: 1px solid var(--line); }
.specs dt { color: var(--muted); font-size: 14.5px; }
.specs dd { margin: 0; font-size: 14px; color: #fff; }
.tbl-wrap { overflow-x: auto; border: 1px solid var(--line); border-radius: var(--r); }
.tbl { width: 100%; border-collapse: collapse; font-size: 13.5px; min-width: 560px; }
.tbl th { text-align: left; font-family: var(--f-mono); font-size: 11px; letter-spacing: .06em; text-transform: uppercase; color: var(--cyan); padding: 14px; background: rgba(61,224,255,.05); border-bottom: 1px solid var(--line-2); white-space: nowrap; }
.tbl td { padding: 12px 14px; border-bottom: 1px solid var(--line); white-space: nowrap; }
.tbl tr:last-child td { border-bottom: 0; }
.tbl tbody tr:hover td { background: rgba(255,45,74,.05); }
.feats { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 4px; }
.feats li { display: flex; gap: 16px; padding: 14px 0; border-bottom: 1px dashed var(--line-2); color: var(--text-2); }
.feats span { color: var(--red); font-size: 12px; padding-top: 3px; }
.mini-line { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 8px; counter-reset: s; }
.mini-line li { display: flex; gap: 8px; align-items: center; padding: 8px 12px; border: 1px solid var(--line); border-radius: 8px; font-size: 13.5px; }
.mini-line span { color: var(--cyan); font-size: 11px; }
.rel-h { margin-bottom: 28px; }
.rel { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

@media (max-width: 1000px) {
  .pd, .pd-body { grid-template-columns: 1fr; }
  .pd-body__side { position: static; }
  .rel { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .rel { grid-template-columns: 1fr; }
  .specs div { grid-template-columns: 1fr; gap: 2px; }
}
</style>
