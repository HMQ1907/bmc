<script setup>
import FlowLines from '../components/FlowLines.vue'
import QuoteForm from '../components/QuoteForm.vue'
import AppIcon from '../components/AppIcon.vue'
import { useI18n } from '../composables/useI18n.js'
import { company } from '../data/company.js'
const { t } = useI18n()
const channels = [
  { icon: 'phone', label: { vi: 'Hotline', en: 'Hotline' }, value: company.phone, href: `tel:${company.phoneRaw}` },
  { icon: 'mail', label: { vi: 'Email', en: 'Email' }, value: company.email, href: `mailto:${company.email}` },
  { icon: 'chat', label: { vi: 'WhatsApp', en: 'WhatsApp' }, value: company.phone, href: company.whatsapp },
  { icon: 'chat', label: { vi: 'Zalo', en: 'Zalo' }, value: company.phone, href: company.zalo }
]
</script>

<template>
  <div>
    <section class="page-hero">
      <FlowLines :count="6" />
      <div style="position:relative;z-index:1" class="container">
        <div class="crumb"><RouterLink to="/">HOME</RouterLink> / {{ t({ vi: 'LIÊN HỆ', en: 'CONTACT' }) }}</div>
        <span class="eyebrow">{{ t({ vi: 'Liên hệ & báo giá', en: 'Contact & quote' }) }}</span>
        <h1 class="h-lg">{{ t({ vi: 'Nói chuyện với kỹ sư của chúng tôi', en: 'Talk to our engineers' }) }}</h1>
        <p class="lead">{{ t({ vi: 'Cho chúng tôi biết sản lượng mục tiêu, loại thùng và diện tích xưởng — chúng tôi sẽ đề xuất cấu hình phù hợp và báo giá chi tiết.', en: 'Tell us your target output, box types and floor space — we’ll recommend a configuration and send a detailed quotation.' }) }}</p>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container ct">
        <div class="ct__side">
          <a v-for="c in channels" :key="c.label.en" :href="c.href" target="_blank" rel="noopener" class="ch panel hud-corners">
            <span class="ch__ic"><AppIcon :name="c.icon" :size="20" /></span>
            <span><small class="mono">{{ t(c.label) }}</small><b>{{ c.value }}</b></span>
            <AppIcon name="arrowUpRight" class="ch__go" :size="18" />
          </a>
          <div class="locs">
            <div v-for="l in company.locations" :key="l.tag" class="loc">
              <span class="tag" :class="{ 'tag--red': l.tag === 'HCM-VN' }">{{ l.tag }}</span>
              <h4>{{ t(l.title) }}</h4>
              <p>{{ t(l.address) }}</p>
            </div>
          </div>
        </div>
        <QuoteForm />
      </div>
    </section>
  </div>
</template>

<style scoped>
.ct { display: grid; grid-template-columns: .85fr 1.15fr; gap: clamp(28px, 4vw, 56px); align-items: start; }
.ct__side { display: flex; flex-direction: column; gap: 12px; }
.ch { display: flex; align-items: center; gap: 16px; padding: 18px 20px; transition: transform .25s var(--ease); }
.ch:hover { transform: translateX(4px); }
.ch__ic { width: 46px; height: 46px; border-radius: 12px; display: grid; place-items: center; background: rgba(255,45,74,.1); color: var(--red); border: 1px solid rgba(255,45,74,.25); flex: none; }
.ch small { display: block; font-size: 11px; color: var(--muted); letter-spacing: .1em; text-transform: uppercase; }
.ch b { font-weight: 600; font-size: 16px; word-break: break-all; }
.ch__go { margin-left: auto; color: var(--muted); flex: none; }
.locs { margin-top: 20px; display: flex; flex-direction: column; }
.loc { padding: 18px 0; border-top: 1px solid var(--line); display: flex; flex-direction: column; gap: 6px; align-items: flex-start; }
.loc h4 { font-size: 17px; }
.loc p { font-size: 14px; color: var(--text-2); }
@media (max-width: 960px) { .ct { grid-template-columns: 1fr; } }
</style>
