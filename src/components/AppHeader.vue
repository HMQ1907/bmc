<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppIcon from './AppIcon.vue'
import { useI18n } from '../composables/useI18n.js'
import { company } from '../data/company.js'

const { t, lang, toggleLang } = useI18n()
const route = useRoute()
const scrolled = ref(false)
const open = ref(false)

const nav = [
  { to: '/', label: { vi: 'Trang chủ', en: 'Home' } },
  { to: '/products', label: { vi: 'Sản phẩm', en: 'Products' } },
  { to: '/about', label: { vi: 'Giới thiệu', en: 'About' } },
  { to: '/contact', label: { vi: 'Liên hệ', en: 'Contact' } }
]

const onScroll = () => { scrolled.value = window.scrollY > 24 }
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
watch(() => route.fullPath, () => { open.value = false })
watch(open, (v) => { document.body.style.overflow = v ? 'hidden' : '' })

const isActive = (to) => to === '/' ? route.path === '/' : route.path.startsWith(to.replace(/s$/, ''))
</script>

<template>
  <header class="hdr" :class="{ 'is-scrolled': scrolled || open }">
    <div class="topbar">
      <div class="container topbar__in">
        <span class="mono topbar__status"><i class="dot-live"></i> {{ t({ vi: 'Hỗ trợ kỹ thuật 24/7 · 40+ quốc gia', en: '24/7 technical support · 40+ countries' }) }}</span>
        <div class="topbar__links">
          <a :href="`tel:${company.phoneRaw}`"><AppIcon name="phone" :size="14" /> {{ company.phone }}</a>
          <a :href="`mailto:${company.email}`"><AppIcon name="mail" :size="14" /> {{ company.email }}</a>
        </div>
      </div>
    </div>
    <div class="container hdr__in">
      <RouterLink to="/" class="brand" aria-label="BMC PACK">
        <span class="brand__mark">
          <img :src="company.logo" alt="" width="36" height="36" @error="(e) => (e.target.style.display = 'none')" />
        </span>
        <span class="brand__txt">
          <strong>BMC<em>PACK</em></strong>
          <small class="mono">{{ t({ vi: 'MÁY BAO BÌ CARTON', en: 'CORRUGATED MACHINERY' }) }}</small>
        </span>
      </RouterLink>

      <nav class="nav" aria-label="Main">
        <RouterLink v-for="n in nav" :key="n.to" :to="n.to" class="nav__a" :class="{ on: isActive(n.to) }">{{ t(n.label) }}</RouterLink>
      </nav>

      <div class="hdr__act">
        <button class="lang mono" @click="toggleLang" :aria-label="lang === 'vi' ? 'Switch to English' : 'Chuyển sang tiếng Việt'">
          <span :class="{ on: lang === 'vi' }">VI</span><i>/</i><span :class="{ on: lang === 'en' }">EN</span>
        </button>
        <RouterLink to="/contact" class="btn btn--primary btn--sm hdr__cta">{{ t({ vi: 'Nhận báo giá', en: 'Get a quote' }) }}</RouterLink>
        <button class="burger" @click="open = !open" :aria-expanded="open" aria-label="Menu">
          <AppIcon :name="open ? 'close' : 'menu'" :size="22" />
        </button>
      </div>
    </div>

    <Transition name="drawer">
      <div v-if="open" class="drawer">
        <RouterLink v-for="(n, i) in nav" :key="n.to" :to="n.to" class="drawer__a">
          <span class="mono">0{{ i + 1 }}</span>{{ t(n.label) }}
        </RouterLink>
        <RouterLink to="/contact" class="btn btn--primary">{{ t({ vi: 'Nhận báo giá', en: 'Get a quote' }) }} <AppIcon name="arrow" /></RouterLink>
        <div class="drawer__contact mono">
          <a :href="`tel:${company.phoneRaw}`">{{ company.phone }}</a>
          <a :href="`mailto:${company.email}`">{{ company.email }}</a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.hdr { position: fixed; inset: 0 0 auto; z-index: 50; transition: background .3s, border-color .3s; border-bottom: 1px solid transparent; }
.hdr.is-scrolled { background: rgba(5, 7, 13, .78); backdrop-filter: blur(16px) saturate(140%); border-bottom-color: var(--line); }
.topbar { border-bottom: 1px solid var(--line); font-size: 12px; color: var(--muted); transition: margin .3s, opacity .3s; }
.hdr.is-scrolled .topbar { margin-top: -37px; opacity: 0; }
.topbar__in { display: flex; justify-content: space-between; align-items: center; height: 36px; gap: 16px; }
.topbar__status { display: inline-flex; align-items: center; gap: 8px; letter-spacing: .04em; }
.topbar__links { display: flex; gap: 22px; }
.topbar__links a { display: inline-flex; align-items: center; gap: 6px; transition: color .2s; }
.topbar__links a:hover { color: var(--cyan); }

.hdr__in { display: flex; align-items: center; justify-content: space-between; height: var(--header-h); gap: 24px; }
.brand { display: flex; align-items: center; gap: 12px; }
.brand__mark { width: 40px; height: 40px; border-radius: 10px; display: grid; place-items: center; background: #fff; box-shadow: 0 0 0 1px var(--line-2), 0 0 24px -6px var(--red-glow); overflow: hidden; }
.brand__mark img { width: 34px; height: 34px; object-fit: contain; }
.brand__txt { display: flex; flex-direction: column; line-height: 1.1; }
.brand__txt strong { font-family: var(--f-head); font-size: 19px; font-weight: 800; letter-spacing: -.01em; }
.brand__txt em { font-style: normal; color: var(--red); margin-left: 2px; }
.brand__txt small { font-size: 9.5px; letter-spacing: .16em; color: var(--muted); margin-top: 3px; }

.nav { display: flex; gap: 4px; padding: 5px; border-radius: 12px; border: 1px solid var(--line); background: rgba(255,255,255,.02); }
.nav__a { position: relative; padding: 8px 16px; border-radius: 8px; font-size: 14.5px; font-weight: 500; color: var(--text-2); transition: color .2s, background .2s; }
.nav__a:hover { color: #fff; background: rgba(255,255,255,.04); }
.nav__a.on { color: #fff; background: rgba(255,45,74,.12); box-shadow: inset 0 0 0 1px rgba(255,45,74,.3); }

.hdr__act { display: flex; align-items: center; gap: 12px; }
.lang { display: inline-flex; align-items: center; gap: 4px; height: 42px; padding: 0 12px; border: 1px solid var(--line-2); border-radius: 10px; font-size: 12.5px; color: var(--muted); }
.lang i { font-style: normal; opacity: .4; }
.lang .on { color: #fff; }
.lang:hover { border-color: var(--cyan); }
.burger { display: none; width: 42px; height: 42px; border: 1px solid var(--line-2); border-radius: 10px; place-items: center; }

.drawer { position: fixed; inset: calc(var(--header-h)) 0 0; background: rgba(5,7,13,.97); backdrop-filter: blur(20px); padding: 28px var(--gutter); display: flex; flex-direction: column; gap: 6px; overflow-y: auto; }
.drawer__a { display: flex; align-items: baseline; gap: 14px; font-family: var(--f-head); font-size: 30px; font-weight: 700; padding: 12px 0; border-bottom: 1px solid var(--line); }
.drawer__a span { font-size: 12px; color: var(--red); }
.drawer .btn { margin-top: 24px; }
.drawer__contact { display: flex; flex-direction: column; gap: 8px; margin-top: 24px; font-size: 13px; color: var(--muted); }
.drawer-enter-active, .drawer-leave-active { transition: opacity .3s, transform .3s var(--ease); }
.drawer-enter-from, .drawer-leave-to { opacity: 0; transform: translateY(-10px); }

@media (max-width: 1020px) {
  .nav { display: none; }
  .burger { display: grid; }
}
@media (max-width: 720px) {
  .topbar { display: none; }
  .hdr__cta { display: none; }
  .brand__txt small { display: none; }
}
</style>
