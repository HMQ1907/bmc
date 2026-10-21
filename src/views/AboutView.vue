<script setup>
import FlowLines from '../components/FlowLines.vue'
import SectionHead from '../components/SectionHead.vue'
import SmartImg from '../components/SmartImg.vue'
import AppIcon from '../components/AppIcon.vue'
import CountUp from '../components/CountUp.vue'
import { useI18n } from '../composables/useI18n.js'
import { stats, values, timeline, partnerBenefits, company, IMG } from '../data/company.js'
const { t } = useI18n()
const pillars = [
  { img: `${IMG}/about/about-pillar-manufacturing.webp`, title: { vi: 'Sản xuất nội bộ', en: 'In-house manufacturing' }, desc: { vi: 'Thiết kế, gia công và lắp ráp ngay tại nhà máy, kiểm soát chất lượng nghiêm ngặt.', en: 'Design, machining and assembly under one roof with strict quality control.' } },
  { img: `${IMG}/about/about-pillar-rd.webp`, title: { vi: 'R&D kỹ thuật', en: 'Engineering R&D' }, desc: { vi: 'Công nghệ Ý, tiêu chuẩn châu Âu, thiết kế phù hợp CE.', en: 'Italian technology, European standards, CE-conformant design.' } },
  { img: `${IMG}/about/about-pillar-innovation.webp`, title: { vi: 'Đổi mới liên tục', en: 'Continuous innovation' }, desc: { vi: 'Servo, chuyển phôi chân không, quản lý sản xuất số NDPMS.', en: 'Servo drives, vacuum transfer and NDPMS digital production management.' } }
]
</script>

<template>
  <div>
    <section class="page-hero">
      <FlowLines :count="6" />
      <div style="position:relative;z-index:1" class="container ab-hero">
        <div>
          <div class="crumb"><RouterLink to="/">HOME</RouterLink> / {{ t({ vi: 'GIỚI THIỆU', en: 'ABOUT' }) }}</div>
          <span class="eyebrow">{{ t({ vi: 'Về BMC PACK', en: 'About BMC PACK' }) }}</span>
          <h1 class="h-lg">{{ t({ vi: 'Hai thập kỷ chế tạo máy bao bì carton', en: 'Two decades building corrugated packaging machinery' }) }}</h1>
          <p class="lead">{{ t({ vi: 'Thành lập năm 1999 tại Quảng Đông, BMC PACK thiết kế và chế tạo máy móc bao bì carton sóng với công nghệ Ý và tiêu chuẩn kỹ thuật châu Âu. Sứ mệnh không đổi từ ngày đầu: chế tạo những cỗ máy đáng tin cậy.', en: 'Founded in 1999 in Guangdong, BMC PACK designs and builds corrugated packaging machinery with Italian technology and European engineering standards. Our mission hasn’t changed since day one: build machines worth depending on.' }) }}</p>
        </div>
        <div class="ab-stats">
          <div v-for="s in stats" :key="s.value" class="ab-stat panel">
            <b><CountUp :to="s.value" /><em>{{ s.suffix }}</em></b>
            <span>{{ t(s.label) }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="pillars">
          <article v-for="(p, i) in pillars" :key="i" class="pillar" v-reveal="i * 90">
            <SmartImg :src="p.img" :alt="t(p.title)" class="pillar__img" />
            <div class="pillar__b"><span class="mono">0{{ i + 1 }}</span><h3>{{ t(p.title) }}</h3><p>{{ t(p.desc) }}</p></div>
          </article>
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container tl-wrap">
        <SectionHead :eyebrow="t({ vi: 'Hành trình', en: 'Timeline' })" :title="t({ vi: 'Từ một xưởng máy đến 40+ quốc gia', en: 'From one workshop to 40+ countries' })" />
        <ol class="tl">
          <li v-for="(s, i) in timeline" :key="s.year" v-reveal="i * 80">
            <span class="tl__y mono">{{ s.year }}</span>
            <div><h4>{{ t(s.title) }}</h4><p>{{ t(s.desc) }}</p></div>
          </li>
        </ol>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container">
        <SectionHead center :eyebrow="t({ vi: 'Giá trị cốt lõi', en: 'Core values' })" :title="t({ vi: 'Chúng tôi tin vào điều gì', en: 'What we stand for' })" />
        <div class="vals">
          <div v-for="(v, i) in values" :key="i" class="val panel hud-corners" v-reveal="i * 70">
            <span class="mono">V.0{{ i + 1 }}</span><h4>{{ t(v.title) }}</h4><p>{{ t(v.desc) }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container">
        <SectionHead :eyebrow="t({ vi: 'Hiện diện', en: 'Locations' })" :title="t({ vi: 'Nhà máy & văn phòng', en: 'Factories & offices' })" />
        <div class="locs">
          <div v-for="(l, i) in company.locations" :key="l.tag" class="loc panel" v-reveal="i * 80">
            <span class="tag" :class="{ 'tag--red': l.tag === 'HCM-VN' }">{{ l.tag }}</span>
            <h4>{{ t(l.title) }}</h4>
            <p><AppIcon name="pin" :size="15" /> {{ t(l.address) }}</p>
            <span class="mono loc__n">{{ t(l.note) }}</span>
          </div>
        </div>
      </div>
    </section>

    <section id="partner" class="section">
      <div class="container">
        <div class="partner panel">
          <div>
            <span class="eyebrow">{{ t({ vi: 'Chương trình đối tác', en: 'Partner program' }) }}</span>
            <h2 class="h-lg">{{ t({ vi: 'Trở thành nhà phân phối BMC tại khu vực của bạn', en: 'Become the BMC distributor in your region' }) }}</h2>
            <RouterLink to="/contact" class="btn btn--primary">{{ t({ vi: 'Đăng ký đại lý', en: 'Apply as partner' }) }} <AppIcon name="arrow" /></RouterLink>
          </div>
          <ul class="partner__l">
            <li v-for="(b, i) in partnerBenefits" :key="i"><span class="mono">0{{ i + 1 }}</span><div><h4>{{ t(b.title) }}</h4><p>{{ t(b.desc) }}</p></div></li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ab-hero { display: grid; grid-template-columns: 1.2fr .8fr; gap: 48px; align-items: end; }
.ab-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.ab-stat { padding: 20px; display: flex; flex-direction: column; gap: 4px; }
.ab-stat b { font-family: var(--f-head); font-size: 40px; font-weight: 800; letter-spacing: -.03em; line-height: 1; }
.ab-stat em { font-style: normal; color: var(--red); }
.ab-stat span { font-size: 13px; color: var(--muted); }
.pillars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
.pillar { border: 1px solid var(--line); border-radius: var(--r); overflow: hidden; background: var(--bg-2); }
.pillar__img { aspect-ratio: 4/3; }
.pillar__b { padding: 22px; display: flex; flex-direction: column; gap: 8px; }
.pillar__b span { color: var(--red); font-size: 12px; }
.pillar__b h3 { font-size: 20px; }
.pillar__b p { color: var(--text-2); font-size: 14.5px; }
.tl-wrap { display: grid; grid-template-columns: .8fr 1.2fr; gap: 48px; }
.tl { list-style: none; padding: 0; margin: 0; border-left: 1px solid var(--line-2); }
.tl li { position: relative; display: grid; grid-template-columns: 90px 1fr; gap: 20px; padding: 0 0 36px 28px; }
.tl li::before { content: ''; position: absolute; left: -6px; top: 6px; width: 11px; height: 11px; border-radius: 3px; background: var(--bg); border: 2px solid var(--red); box-shadow: 0 0 12px var(--red-glow); }
.tl__y { color: var(--cyan); font-size: 15px; font-weight: 600; }
.tl h4 { font-size: 19px; margin-bottom: 4px; }
.tl p { color: var(--text-2); }
.vals { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.val { padding: 24px; display: flex; flex-direction: column; gap: 10px; }
.val span { font-size: 11px; color: var(--cyan); }
.val h4 { font-size: 18px; }
.val p { color: var(--text-2); font-size: 14.5px; }
.locs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.loc { padding: 24px; display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
.loc h4 { font-size: 20px; }
.loc p { display: flex; gap: 8px; color: var(--text-2); font-size: 14.5px; }
.loc p svg { flex: none; margin-top: 4px; color: var(--red); }
.loc__n { font-size: 12px; color: var(--muted); margin-top: auto; }
.partner { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; padding: clamp(28px, 5vw, 56px); background: radial-gradient(60% 100% at 0% 0%, rgba(255,45,74,.14), transparent 60%), linear-gradient(180deg, var(--panel-2), var(--panel)); }
.partner h2 { margin: 16px 0 28px; }
.partner__l { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; }
.partner__l li { display: flex; gap: 18px; padding: 20px 0; border-bottom: 1px solid var(--line); }
.partner__l li:first-child { padding-top: 0; }
.partner__l span { color: var(--red); font-size: 13px; padding-top: 3px; }
.partner__l h4 { font-size: 18px; margin-bottom: 4px; }
.partner__l p { color: var(--text-2); font-size: 14.5px; }
@media (max-width: 1000px) {
  .ab-hero, .tl-wrap, .partner { grid-template-columns: 1fr; }
  .vals { grid-template-columns: repeat(2, 1fr); }
  .pillars, .locs { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 600px) {
  .pillars, .locs, .vals { grid-template-columns: 1fr; }
  .tl li { grid-template-columns: 1fr; gap: 4px; }
}
</style>
