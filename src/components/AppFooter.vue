<script setup>
import AppIcon from './AppIcon.vue'
import FluteDivider from './FluteDivider.vue'
import { useI18n } from '../composables/useI18n.js'
import { company } from '../data/company.js'
import { categories } from '../data/products.js'
const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="ft">
    <FluteDivider />
    <div class="container ft__grid">
      <div class="ft__brand">
        <div class="ft__logo"><strong>BMC<em>PACK</em></strong></div>
        <p class="muted">{{ t({ vi: 'Nhà sản xuất máy móc bao bì carton sóng từ năm 1999 — công nghệ Ý, tiêu chuẩn kỹ thuật châu Âu, hơn 500 nhà máy tại 40+ quốc gia.', en: 'Corrugated packaging machinery manufacturer since 1999 — Italian technology, European engineering standards, 500+ plants in 40+ countries.' }) }}</p>
        <div class="ft__social">
          <a :href="company.facebook" target="_blank" rel="noopener" aria-label="Facebook">FB</a>
          <a :href="company.whatsapp" target="_blank" rel="noopener" aria-label="WhatsApp">WA</a>
          <a :href="company.zalo" target="_blank" rel="noopener" aria-label="Zalo">ZL</a>
        </div>
      </div>
      <div>
        <h4 class="ft__h mono">{{ t({ vi: 'Sản phẩm', en: 'Products' }) }}</h4>
        <ul><li v-for="c in categories" :key="c.id"><RouterLink :to="`/products/${c.id}`">{{ t(c.short) }}</RouterLink></li></ul>
      </div>
      <div>
        <h4 class="ft__h mono">{{ t({ vi: 'Công ty', en: 'Company' }) }}</h4>
        <ul>
          <li><RouterLink to="/about">{{ t({ vi: 'Giới thiệu', en: 'About us' }) }}</RouterLink></li>
          <li><RouterLink to="/products">{{ t({ vi: 'Danh mục máy', en: 'Machine catalogue' }) }}</RouterLink></li>
          <li><RouterLink to="/contact">{{ t({ vi: 'Liên hệ & báo giá', en: 'Contact & quote' }) }}</RouterLink></li>
          <li><RouterLink to="/about">{{ t({ vi: 'Trở thành đại lý', en: 'Become a partner' }) }}</RouterLink></li>
        </ul>
      </div>
      <div>
        <h4 class="ft__h mono">{{ t({ vi: 'Liên hệ', en: 'Contact' }) }}</h4>
        <ul class="ft__contact">
          <li><AppIcon name="phone" :size="15" /><a :href="`tel:${company.phoneRaw}`">{{ company.phone }}</a></li>
          <li><AppIcon name="mail" :size="15" /><a :href="`mailto:${company.email}`">{{ company.email }}</a></li>
          <li v-for="l in company.locations" :key="l.tag"><AppIcon name="pin" :size="15" /><span>{{ t(l.address) }}</span></li>
        </ul>
      </div>
    </div>
    <div class="container ft__bot mono">
      <span>© {{ year }} {{ company.legal }}</span>
      <span>CE-conformant · Italian technology · European standards</span>
    </div>
  </footer>
</template>

<style scoped>
.ft { margin-top: 40px; background: linear-gradient(180deg, transparent, rgba(14,21,36,.6)); }
.ft__grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1.5fr; gap: 40px; padding-top: 64px; padding-bottom: 48px; }
.ft__logo strong { font-family: var(--f-head); font-size: 26px; font-weight: 800; }
.ft__logo em { font-style: normal; color: var(--red); }
.ft__brand p { margin: 16px 0 20px; font-size: 14.5px; max-width: 38ch; }
.ft__social { display: flex; gap: 10px; }
.ft__social a { width: 40px; height: 40px; border-radius: 10px; border: 1px solid var(--line-2); display: grid; place-items: center; font-family: var(--f-mono); font-size: 12px; transition: all .2s; }
.ft__social a:hover { border-color: var(--red); color: var(--red); }
.ft__h { font-size: 11.5px; letter-spacing: .14em; text-transform: uppercase; color: var(--cyan); margin-bottom: 18px; font-weight: 500; }
ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 11px; font-size: 14.5px; color: var(--text-2); }
ul a { transition: color .2s; }
ul a:hover { color: #fff; }
.ft__contact li { display: flex; gap: 10px; align-items: flex-start; }
.ft__contact svg { flex: none; margin-top: 4px; color: var(--red); }
.ft__bot { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding-top: 22px; padding-bottom: 28px; border-top: 1px solid var(--line); font-size: 11.5px; color: var(--muted); }
@media (max-width: 960px) { .ft__grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 560px) { .ft__grid { grid-template-columns: 1fr; gap: 32px; } }
</style>
