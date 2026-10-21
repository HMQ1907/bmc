<script setup>
import { computed } from 'vue'
import HeroCanvas from '../components/HeroCanvas.vue'
import CountUp from '../components/CountUp.vue'
import SectionHead from '../components/SectionHead.vue'
import ProductCard from '../components/ProductCard.vue'
import LineFlow from '../components/LineFlow.vue'
import SmartImg from '../components/SmartImg.vue'
import AppIcon from '../components/AppIcon.vue'
import FluteDivider from '../components/FluteDivider.vue'
import QuoteForm from '../components/QuoteForm.vue'
import { useI18n } from '../composables/useI18n.js'
import { stats, whyUs, techHighlights, projects, solutions, process, IMG } from '../data/company.js'
import { categories, featuredProducts, categoryCover, products } from '../data/products.js'

const { t } = useI18n()
const countByCat = computed(() => Object.fromEntries(categories.map((c) => [c.id, products.filter((p) => p.category === c.id).length])))
</script>

<template>
  <div>
    <!-- ============ HERO ============ -->
    <section class="hero">
      <HeroCanvas />
      <div class="hero__glow"></div>
      <div class="container hero__in">
        <div class="hero__copy">
          <span class="tag tag--red hero__tag" v-reveal>
            <i class="dot-live"></i> INDUSTRY 4.0 · {{ t({ vi: 'TỪ NĂM 1999', en: 'SINCE 1999' }) }}
          </span>
          <h1 class="h-xl" v-reveal="80">
            {{ t({ vi: 'Dây chuyền carton sóng', en: 'Corrugated box lines' }) }}<br />
            <span class="grad-text">{{ t({ vi: 'vận hành bền bỉ.', en: 'built for uptime.' }) }}</span>
          </h1>
          <p class="lead" v-reveal="160">
            {{ t({ vi: 'Từ máy tạo sóng, in Flexo servo đến bế và gấp dán — BMC PACK cung cấp dây chuyền trọn gói, lắp đặt tận nơi và hỗ trợ trọn đời cho các nhà máy bao bì trên toàn thế giới.', en: 'From corrugators and servo flexo printing to die-cutting and folder-gluing — BMC PACK delivers complete lines, turnkey installation and lifetime support for packaging plants worldwide.' }) }}
          </p>
          <div class="hero__cta" v-reveal="240">
            <RouterLink to="/contact" class="btn btn--primary">{{ t({ vi: 'Yêu cầu báo giá', en: 'Request a quote' }) }} <AppIcon name="arrow" /></RouterLink>
            <RouterLink to="/products" class="btn btn--ghost">{{ t({ vi: 'Khám phá thiết bị', en: 'Explore machines' }) }}</RouterLink>
          </div>
        </div>

        <aside class="hero__hud panel hud-corners" v-reveal="320">
          <div class="hud__row"><span class="mono">SYS.STATUS</span><span class="mono ok"><i class="dot-live"></i> ONLINE</span></div>
          <div class="hud__big"><b>300</b><span class="mono">m/min</span></div>
          <p class="hud__lbl">{{ t({ vi: 'Tốc độ thiết kế tối đa — dây chuyền High-End 3/5/7 lớp', en: 'Max design speed — High-End 3/5/7-ply line' }) }}</p>
          <div class="hud__bars">
            <div><span class="mono">PLY</span><b>3 / 5 / 7</b></div>
            <div><span class="mono">FLUTE</span><b>A·B·C·E</b></div>
            <div><span class="mono">WIDTH</span><b>≤ 2.5 m</b></div>
          </div>
          <svg class="hud__wave" viewBox="0 0 300 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 20 Q 12.5 2 25 20 T 50 20 T 75 20 T 100 20 T 125 20 T 150 20 T 175 20 T 200 20 T 225 20 T 250 20 T 275 20 T 300 20" /></svg>
        </aside>
      </div>

      <div class="container">
        <div class="stats" v-reveal="200">
          <div v-for="s in stats" :key="s.suffix + s.value" class="stat">
            <div class="stat__v"><CountUp :to="s.value" /><em>{{ s.suffix }}</em></div>
            <div class="stat__l">{{ t(s.label) }}</div>
          </div>
        </div>
      </div>
      <div class="hero__scroll mono" aria-hidden="true"><span></span>SCROLL</div>
    </section>

    <!-- ============ CATEGORIES ============ -->
    <section class="section">
      <div class="container">
        <SectionHead :eyebrow="t({ vi: '01 — Thiết bị', en: '01 — Equipment' })"
                     :title="t({ vi: 'Máy móc cho từng công đoạn của dây chuyền', en: 'Machinery for every stage of the line' })"
                     :sub="t({ vi: 'Sáu nhóm thiết bị, hơn 50 model — từ cuộn giấy đến thùng carton thành phẩm.', en: 'Six machine families, 50+ models — from mill roll to finished carton.' })" />
        <div class="cats">
          <RouterLink v-for="(c, i) in categories" :key="c.id" :to="`/products/${c.id}`" class="cat panel hud-corners" :class="{ 'cat--big': i === 0 }" v-reveal="i * 70">
            <SmartImg :src="categoryCover(c.id)" :alt="t(c.name)" :label="c.short.en" class="cat__img" />
            <div class="cat__shade"></div>
            <div class="cat__body">
              <div class="cat__top"><span class="tag">{{ c.code }}</span><span class="mono cat__n">{{ String(countByCat[c.id]).padStart(2, '0') }} {{ t({ vi: 'model', en: 'models' }) }}</span></div>
              <h3>{{ t(c.name) }}</h3>
              <p>{{ t(c.desc) }}</p>
              <span class="cat__go"><AppIcon name="arrowUpRight" :size="18" /></span>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ============ LINE FLOW ============ -->
    <section class="section section--tight flow">
      <div class="container flow__grid">
        <SectionHead :eyebrow="t({ vi: '02 — Quy trình', en: '02 — Process' })"
                     :title="t({ vi: 'Từ cuộn giấy đến tấm carton — 7 công đoạn, một hệ điều khiển.', en: 'Mill roll to finished sheet — 7 stages, one control system.' })"
                     :sub="t({ vi: 'PLC + servo đồng bộ toàn tuyến, hệ thống quản lý sản xuất NDPMS giám sát thời gian thực, tự động đổi đơn và cảnh báo.', en: 'PLC + servo synchronised end to end, with NDPMS production management for real-time monitoring, automatic order change and alarms.' })">
          <div class="flow__brands mono">Siemens · Schneider Electric · NSK · Omron</div>
        </SectionHead>
        <div v-reveal="120"><LineFlow /></div>
      </div>
    </section>

    <!-- ============ TECH NUMBERS ============ -->
    <section class="section section--tight">
      <div class="container">
        <div class="tech">
          <div v-for="(h, i) in techHighlights" :key="h.k" class="tech__i" v-reveal="i * 80">
            <div class="tech__k"><b>{{ h.k }}</b><span class="mono">{{ h.u }}</span></div>
            <p>{{ t(h.label) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ FLAGSHIPS ============ -->
    <section class="section">
      <div class="container">
        <div class="row-head">
          <SectionHead :eyebrow="t({ vi: '03 — Flagship', en: '03 — Flagship' })"
                       :title="t({ vi: 'Dòng máy chủ lực', en: 'Flagship machines' })" />
          <RouterLink to="/products" class="btn btn--ghost btn--sm row-head__btn" v-reveal>{{ t({ vi: 'Tất cả sản phẩm', en: 'All products' }) }} <AppIcon name="arrow" /></RouterLink>
        </div>
        <div class="grid3">
          <div v-for="(p, i) in featuredProducts" :key="p.slug" v-reveal="i * 90"><ProductCard :product="p" :index="i" /></div>
        </div>
      </div>
    </section>

    <!-- ============ WHY ============ -->
    <section class="section why">
      <div class="container why__grid">
        <div class="why__visual" v-reveal>
          <SmartImg :src="`${IMG}/about/factory-main.webp`" alt="BMC PACK factory" label="Factory" class="why__img" />
          <div class="why__badge panel">
            <span class="mono">20,000 m²</span>
            <b>{{ t({ vi: 'Cơ sở sản xuất Quảng Đông', en: 'Guangdong production base' }) }}</b>
          </div>
          <div class="why__badge why__badge--2 panel">
            <span class="mono">100+</span>
            <b>{{ t({ vi: 'Kỹ sư & kỹ thuật viên', en: 'Engineers & technicians' }) }}</b>
          </div>
        </div>
        <div>
          <SectionHead :eyebrow="t({ vi: '04 — Vì sao chọn BMC', en: '04 — Why BMC' })"
                       :title="t({ vi: 'Đối tác kỹ thuật, không chỉ là nhà cung cấp', en: 'An engineering partner, not just a supplier' })" />
          <div class="why__list">
            <div v-for="(w, i) in whyUs" :key="w.icon" class="why__i" v-reveal="i * 80">
              <span class="why__ic"><AppIcon :name="w.icon" :size="22" /></span>
              <div><h4>{{ t(w.title) }}</h4><p>{{ t(w.desc) }}</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ SOLUTIONS ============ -->
    <section class="section section--tight">
      <div class="container">
        <SectionHead center :eyebrow="t({ vi: '05 — Giải pháp', en: '05 — Solutions' })"
                     :title="t({ vi: 'Bạn đang muốn đạt mục tiêu nào?', en: 'What are you trying to achieve?' })" />
        <div class="sol">
          <RouterLink v-for="(s, i) in solutions" :key="s.code" :to="`/products/${s.cat}`" class="sol__i panel hud-corners" v-reveal="i * 70">
            <span class="mono sol__c">{{ s.code }}</span>
            <h4>{{ t(s.title) }}</h4>
            <p>{{ t(s.desc) }}</p>
            <AppIcon name="arrowUpRight" class="sol__a" />
          </RouterLink>
        </div>
        <div class="steps">
          <div v-for="(p, i) in process" :key="p.n" class="step" v-reveal="i * 90">
            <span class="step__n mono">{{ p.n }}</span>
            <h4>{{ t(p.title) }}</h4>
            <p>{{ t(p.desc) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ PROJECTS ============ -->
    <section class="section">
      <div class="container">
        <SectionHead :eyebrow="t({ vi: '06 — Dự án', en: '06 — Installations' })"
                     :title="t({ vi: 'Được tin tưởng bởi các nhà máy bao bì toàn cầu', en: 'Trusted by packaging plants worldwide' })" />
        <div class="proj">
          <article v-for="(p, i) in projects" :key="p.code" class="proj__i" v-reveal="i * 90">
            <SmartImg :src="p.img" :alt="t(p.title)" :label="t(p.country)" class="proj__img" />
            <div class="proj__body">
              <span class="tag tag--red">{{ p.code }} · {{ t(p.country) }}</span>
              <h3>{{ t(p.title) }}</h3>
              <p>{{ t(p.desc) }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ============ CTA + FORM ============ -->
    <section class="section cta">
      <FluteDivider />
      <div class="container cta__grid">
        <div v-reveal>
          <span class="eyebrow">{{ t({ vi: '07 — Bắt đầu', en: '07 — Get started' }) }}</span>
          <h2 class="h-lg cta__h">{{ t({ vi: 'Sẵn sàng nâng cấp dây chuyền sản xuất?', en: 'Ready to upgrade your production line?' }) }}</h2>
          <p class="lead">{{ t({ vi: 'Chia sẻ thông tin dự án — đội ngũ kỹ sư sẽ đề xuất cấu hình phù hợp cho nhà máy của bạn. Giá phụ thuộc khổ máy, tốc độ, số lớp và mức độ tự động hóa.', en: 'Share your project details and our engineers will recommend the right configuration for your plant. Pricing depends on width, speed, ply count and automation level.' }) }}</p>
          <ul class="cta__list">
            <li><AppIcon name="check" :size="18" /> {{ t({ vi: 'Tư vấn cấu hình & mặt bằng miễn phí', en: 'Free configuration & layout advice' }) }}</li>
            <li><AppIcon name="check" :size="18" /> {{ t({ vi: 'Chạy thử tại xưởng trước khi giao', en: 'Factory run-test before shipping' }) }}</li>
            <li><AppIcon name="check" :size="18" /> {{ t({ vi: 'Hỗ trợ tiếng Việt · English · 中文 · Español', en: 'Support in Vietnamese · English · Chinese · Spanish' }) }}</li>
          </ul>
        </div>
        <div v-reveal="120"><QuoteForm /></div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* HERO */
.hero { position: relative; min-height: 100svh; display: flex; flex-direction: column; justify-content: center; padding: calc(var(--header-h) + 64px) 0 40px; overflow: hidden;
  background: radial-gradient(70% 60% at 75% 35%, rgba(255,45,74,.12), transparent 60%), radial-gradient(60% 50% at 10% 80%, rgba(61,224,255,.08), transparent 60%), var(--bg); }
.hero__glow { position: absolute; inset: auto 0 0; height: 40%; background: linear-gradient(180deg, transparent, var(--bg)); pointer-events: none; }
.hero__in { position: relative; display: grid; grid-template-columns: 1.5fr .6fr; gap: 48px; align-items: end; }
.hero__copy { min-width: 0; display: flex; flex-direction: column; gap: 26px; }
.hero__tag { align-self: flex-start; }
.hero__copy h1 { text-shadow: 0 4px 40px rgba(5,7,13,.6); }
.hero__cta { display: flex; gap: 14px; flex-wrap: wrap; }
.hero__hud { padding: 24px; background: rgba(9,14,24,.55); }
.hud__row { display: flex; justify-content: space-between; font-size: 11px; color: var(--muted); letter-spacing: .08em; }
.hud__row .ok { color: var(--ok); display: inline-flex; gap: 6px; align-items: center; }
.hud__big { display: flex; align-items: baseline; gap: 8px; margin-top: 18px; }
.hud__big b { font-family: var(--f-head); font-size: 64px; font-weight: 800; letter-spacing: -.04em; line-height: 1; }
.hud__big span { color: var(--red); font-size: 14px; }
.hud__lbl { font-size: 13.5px; color: var(--text-2); margin-top: 8px; }
.hud__bars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 20px; }
.hud__bars div { padding: 10px; border: 1px solid var(--line); border-radius: 8px; background: rgba(255,255,255,.02); display: flex; flex-direction: column; gap: 2px; }
.hud__bars span { font-size: 10px; color: var(--muted); letter-spacing: .1em; }
.hud__bars b { font-size: 13px; font-weight: 600; }
.hud__wave { width: 100%; height: 28px; margin-top: 18px; }
.hud__wave path { fill: none; stroke: var(--cyan); stroke-width: 1.5; stroke-dasharray: 6 4; animation: dash 3s linear infinite; }
@keyframes dash { to { stroke-dashoffset: -40; } }

.stats { position: relative; margin-top: clamp(48px, 7vw, 88px); display: grid; grid-template-columns: repeat(4, 1fr); border: 1px solid var(--line); border-radius: var(--r); background: rgba(9,14,24,.6); backdrop-filter: blur(12px); }
.stat { padding: 24px 28px; border-left: 1px solid var(--line); }
.stat:first-child { border-left: 0; }
.stat__v { font-family: var(--f-head); font-size: clamp(34px, 4vw, 52px); font-weight: 800; letter-spacing: -.03em; line-height: 1; }
.stat__v em { font-style: normal; color: var(--red); }
.stat__l { margin-top: 8px; font-size: 13.5px; color: var(--muted); }
.hero__scroll { position: absolute; left: 50%; bottom: 14px; transform: translateX(-50%); font-size: 10px; letter-spacing: .3em; color: var(--muted); display: flex; flex-direction: column; align-items: center; gap: 8px; }
.hero__scroll span { width: 1px; height: 26px; background: linear-gradient(var(--cyan), transparent); animation: sc 2s infinite; }
@keyframes sc { 0% { transform: scaleY(0); transform-origin: top; } 50% { transform: scaleY(1); transform-origin: top; } 51% { transform-origin: bottom; } 100% { transform: scaleY(0); transform-origin: bottom; } }

/* CATEGORIES */
.cats { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 300px; gap: 18px; }
.cat { position: relative; overflow: hidden; display: block; isolation: isolate; }
.cat--big { grid-row: span 2; }
.cat:last-child { grid-column: span 3; }
.cat:last-child :deep(img) { object-position: center 60%; }
.cat__img { position: absolute; inset: 0; z-index: -2; border-radius: var(--r); }
.cat:hover :deep(img) { transform: scale(1.06); }
.cat__shade { position: absolute; inset: 0; z-index: -1; background: linear-gradient(180deg, rgba(5,7,13,.15) 0%, rgba(5,7,13,.55) 45%, rgba(5,7,13,.95) 100%); border-radius: var(--r); }
.cat__body { position: absolute; inset: 0; padding: 22px; display: flex; flex-direction: column; justify-content: flex-end; gap: 8px; }
.cat__top { position: absolute; top: 18px; left: 22px; right: 22px; display: flex; justify-content: space-between; align-items: center; }
.cat__n { font-size: 11px; color: var(--text-2); }
.cat h3 { font-size: 21px; font-weight: 700; padding-right: 44px; }
.cat--big h3 { font-size: clamp(24px, 2.6vw, 34px); }
.cat p { font-size: 14px; color: var(--text-2); max-width: 46ch; }
.cat__go { position: absolute; right: 20px; bottom: 22px; width: 40px; height: 40px; border-radius: 50%; border: 1px solid var(--line-2); display: grid; place-items: center; transition: all .3s var(--ease); background: rgba(5,7,13,.5); }
.cat:hover .cat__go { background: var(--red); border-color: var(--red); transform: rotate(45deg); }

/* FLOW */
.flow { background: linear-gradient(180deg, transparent, rgba(14,21,36,.5), transparent); }
.flow__grid { display: grid; grid-template-columns: .8fr 1.2fr; gap: 56px; align-items: center; }
.flow__grid :deep(.sh) { margin-bottom: 0; }
.flow__brands { font-size: 12px; color: var(--muted); letter-spacing: .06em; padding-top: 14px; border-top: 1px solid var(--line); }

/* TECH */
.tech { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.tech__i { padding: 34px 26px; border-left: 1px solid var(--line); }
.tech__i:first-child { border-left: 0; padding-left: 0; }
.tech__k { display: flex; align-items: baseline; gap: 6px; }
.tech__k b { font-family: var(--f-head); font-size: clamp(36px, 4vw, 56px); font-weight: 800; letter-spacing: -.04em; background: linear-gradient(180deg, #fff, #8ea3c4); -webkit-background-clip: text; background-clip: text; color: transparent; }
.tech__k span { color: var(--cyan); font-size: 13px; }
.tech__i p { margin-top: 8px; font-size: 14px; color: var(--muted); }

/* FLAGSHIPS */
.row-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 20px; }
.row-head__btn { margin-bottom: clamp(36px, 5vw, 64px); }
.grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
.grid3 > div { display: flex; }
.grid3 > div > * { flex: 1; }

/* WHY */
.why__grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(36px, 6vw, 80px); align-items: center; }
.why__visual { position: relative; }
.why__img { aspect-ratio: 4/5; border-radius: var(--r); border: 1px solid var(--line); }
.why__badge { position: absolute; left: -20px; bottom: 40px; padding: 16px 20px; display: flex; flex-direction: column; gap: 2px; background: rgba(9,14,24,.85); }
.why__badge span { color: var(--red); font-size: 22px; font-weight: 600; }
.why__badge b { font-size: 13.5px; font-weight: 500; color: var(--text-2); }
.why__badge--2 { left: auto; right: -20px; bottom: auto; top: 40px; }
.why__badge--2 span { color: var(--cyan); }
.why__list { display: flex; flex-direction: column; gap: 6px; }
.why__i { display: flex; gap: 18px; padding: 20px 0; border-top: 1px solid var(--line); }
.why__ic { flex: none; width: 48px; height: 48px; border-radius: 12px; display: grid; place-items: center; color: var(--red); background: rgba(255,45,74,.08); border: 1px solid rgba(255,45,74,.25); }
.why__i h4 { font-size: 18px; margin-bottom: 4px; }
.why__i p { color: var(--text-2); font-size: 15px; }

/* SOLUTIONS */
.sol { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.sol__i { padding: 24px; display: flex; flex-direction: column; gap: 10px; min-height: 220px; transition: transform .3s var(--ease), background .3s; }
.sol__i:hover { transform: translateY(-4px); background: rgba(255,45,74,.06); }
.sol__c { font-size: 12px; color: var(--red); }
.sol__i h4 { font-size: 19px; }
.sol__i p { font-size: 14px; color: var(--text-2); }
.sol__a { margin-top: auto; color: var(--muted); transition: color .2s, transform .3s; }
.sol__i:hover .sol__a { color: var(--red); transform: rotate(45deg); }
.steps { margin-top: 56px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; position: relative; }
.steps::before { content: ''; position: absolute; top: 19px; left: 20px; right: 20px; height: 1px; background: repeating-linear-gradient(90deg, var(--line-2) 0 6px, transparent 6px 12px); }
.step { position: relative; }
.step__n { position: relative; display: inline-grid; place-items: center; width: 40px; height: 40px; border-radius: 10px; background: var(--bg); border: 1px solid var(--cyan); color: var(--cyan); font-size: 13px; margin-bottom: 16px; }
.step h4 { font-size: 17px; margin-bottom: 6px; }
.step p { font-size: 14px; color: var(--muted); }

/* PROJECTS */
.proj { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
.proj__i { position: relative; border-radius: var(--r); overflow: hidden; border: 1px solid var(--line); background: var(--bg-2); }
.proj__img { aspect-ratio: 16/11; }
.proj__i:hover :deep(img) { transform: scale(1.05); }
.proj__body { padding: 22px; display: flex; flex-direction: column; gap: 10px; align-items: flex-start; }
.proj__body h3 { font-size: 20px; }
.proj__body p { font-size: 14.5px; color: var(--text-2); }

/* CTA */
.cta { padding-top: 0; }
.cta__grid { display: grid; grid-template-columns: .9fr 1.1fr; gap: clamp(32px, 6vw, 72px); align-items: start; padding-top: clamp(64px, 8vw, 104px); }
.cta__h { margin: 18px 0; }
.cta__list { list-style: none; padding: 0; margin: 28px 0 0; display: flex; flex-direction: column; gap: 12px; }
.cta__list li { display: flex; gap: 10px; align-items: center; color: var(--text-2); }
.cta__list svg { color: var(--ok); flex: none; }

@media (max-width: 1080px) {
  .hero__in { grid-template-columns: 1fr; }
  .hero__hud { max-width: 420px; }
  .flow__grid, .why__grid, .cta__grid { grid-template-columns: 1fr; }
  .sol { grid-template-columns: repeat(2, 1fr); }
  .grid3, .proj { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 860px) {
  .cats { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 260px; }
  .cat--big { grid-column: span 2; grid-row: span 1; }
  .cat:last-child { grid-column: span 2; }
  .tech { grid-template-columns: repeat(2, 1fr); }
  .tech__i:nth-child(3) { border-left: 0; padding-left: 0; }
  .tech__i:nth-child(n+3) { border-top: 1px solid var(--line); }
  .steps { grid-template-columns: repeat(2, 1fr); }
  .steps::before { display: none; }
}
@media (max-width: 640px) {
  .hero { min-height: auto; padding-top: calc(var(--header-h) + 48px); }
  .hero__hud { display: none; }
  .stats { grid-template-columns: repeat(2, 1fr); }
  .stat { padding: 18px; }
  .stat:nth-child(3) { border-left: 0; }
  .stat:nth-child(n+3) { border-top: 1px solid var(--line); }
  .hero__scroll { display: none; }
  .cats { grid-template-columns: 1fr; }
  .cat--big, .cat:last-child { grid-column: auto; }
  .grid3, .proj, .sol, .steps { grid-template-columns: 1fr; }
  .row-head { flex-direction: column; align-items: flex-start; gap: 0; }
  .row-head__btn { margin-top: -16px; }
  .why__badge { left: 12px; } .why__badge--2 { right: 12px; }
  .tech__i { padding: 24px 16px; }
}
</style>
