<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import SplitText from '../SplitText.vue'
import AppIcon from '../AppIcon.vue'
import { useI18n } from '../../composables/useI18n.js'
import { lineStages } from '../../data/company.js'

const { t } = useI18n()
const section = ref(null)
const host = ref(null)
const p = ref(0)          // smoothed progress 0..1
const stage = ref(0)
const webgl = ref(true)
let story = null, raf = 0, target = 0, io, visible = false, last = 0

const acts = [
  { id: 'a', from: 0.0, to: 0.15 },
  { id: 'a2', from: 0.15, to: 0.25 },
  { id: 'b', from: 0.28, to: 0.46 },
  { id: 'c', from: 0.56, to: 0.79 },
  { id: 'd', from: 0.86, to: 1.01 }
]
const isOn = (id) => { const a = acts.find((x) => x.id === id); return p.value >= a.from && p.value < a.to }
const chapter = computed(() => (p.value < 0.25 ? 0 : p.value < 0.5 ? 1 : p.value < 0.82 ? 2 : 3))
const chapters = [
  { vi: 'Di sản', en: 'Heritage' }, { vi: 'Năng lượng 4.0', en: 'Industry 4.0' },
  { vi: 'Dây chuyền', en: 'The line' }, { vi: 'Bắt đầu', en: 'Begin' }
]

function measure() {
  const el = section.value
  if (!el) return
  const r = el.getBoundingClientRect()
  const total = r.height - window.innerHeight
  target = Math.min(1, Math.max(0, -r.top / total))
}

function loop() {
  raf = requestAnimationFrame(loop)
  if (!visible) return
  const now = performance.now()
  const dt = Math.min(0.1, (now - (last || now)) / 1000); last = now
  measure()
  p.value += (target - p.value) * (1 - Math.exp(-dt * 5))
  if (Math.abs(target - p.value) < 0.0002) p.value = target
  if (story) {
    story.state.p = p.value
    story.frame()
    stage.value = story.out.stage
  }
}

const onMove = (e) => {
  if (!story) return
  story.state.mx += ((e.clientX / window.innerWidth - 0.5) - story.state.mx) * 0.5
  story.state.my += ((e.clientY / window.innerHeight - 0.5) - story.state.my) * 0.5
}

onMounted(async () => {
  const { createStory } = await import('./storyScene.js')
  try {
    story = createStory(host.value, { mobile: window.innerWidth < 760 })
  } catch (e) {
    webgl.value = false
  }
  const ro = new ResizeObserver(() => story && story.resize())
  ro.observe(host.value)
  section.value._ro = ro
  io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { rootMargin: '200px 0px' })
  io.observe(section.value)
  window.addEventListener('pointermove', onMove, { passive: true })
  measure(); p.value = target
  loop()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  io && io.disconnect()
  section.value && section.value._ro && section.value._ro.disconnect()
  window.removeEventListener('pointermove', onMove)
  story && story.dispose()
})
</script>

<template>
  <section ref="section" class="story" :class="{ 'no-gl': !webgl }" aria-label="BMC PACK story">
    <div class="story__pin">
      <div ref="host" class="story__gl" aria-hidden="true"></div>
      <div class="story__vignette" aria-hidden="true"></div>

      <!-- HUD: chapter rail -->
      <div class="rail mono" aria-hidden="true">
        <div v-for="(c, i) in chapters" :key="i" class="rail__i" :class="{ on: chapter === i, done: chapter > i }">
          <span class="rail__n">0{{ i + 1 }}</span><span class="rail__l">{{ t(c) }}</span>
        </div>
        <div class="rail__bar"><i :style="{ transform: `scaleY(${p})` }"></i></div>
      </div>

      <!-- ACT A — heritage, over the cloud sea -->
      <div class="act act--a" :class="{ on: isOn('a') }">
        <span class="act__eyebrow mono">BMC PACK · EST. 1999</span>
        <SplitText tag="h2" class="act__title act__title--dark" :active="isOn('a')"
                   :text="t({ vi: 'Chúng tôi chế tạo những cỗ máy đáng tin cậy.', en: 'We build machines worth depending on.' })" />
      </div>
      <div class="act act--a2" :class="{ on: isOn('a2') }">
        <SplitText tag="p" class="act__text act__text--dark" :active="isOn('a2')" :stagger="22"
                   :text="t({ vi: 'Hơn 25 năm thiết kế và sản xuất máy móc bao bì carton sóng — công nghệ Ý, tiêu chuẩn kỹ thuật châu Âu, hơn 500 nhà máy tại 40+ quốc gia.', en: 'Over 25 years designing and building corrugated packaging machinery — Italian technology, European engineering standards, 500+ plants in 40+ countries.' })" />
      </div>

      <!-- ACT B — energy streaks -->
      <div class="act act--b" :class="{ on: isOn('b') }">
        <div class="logo-line">
          <SplitText tag="h2" class="logo-line__t" :active="isOn('b')" :stagger="70" text="B M C   P A C K" />
          <span class="logo-line__s mono">INDUSTRY 4.0 · SERVO · NDPMS</span>
        </div>
        <SplitText tag="p" class="act__text act__text--center" :active="isOn('b')" :delay="400" :stagger="20"
                   :text="t({ vi: 'PLC + servo đồng bộ toàn tuyến. Dữ liệu sản xuất thời gian thực, tự động đổi đơn và cảnh báo.', en: 'PLC + servo synchronised end to end. Real-time production data, automatic order change and alarms.' })" />
      </div>

      <!-- ACT C — hologram line -->
      <div class="act act--c" :class="{ on: isOn('c') }">
        <span class="act__eyebrow mono">ND5WJ300-2200 · 3/5/7 PLY</span>
        <SplitText tag="h2" class="act__title" :active="isOn('c')"
                   :text="t({ vi: 'Từ cuộn giấy đến tấm carton — 7 công đoạn.', en: 'Mill roll to finished board — 7 stages.' })" />
        <div class="stage-card">
          <span class="mono stage-card__n">STAGE 0{{ stage + 1 }} / 07</span>
          <Transition name="sc" mode="out-in">
            <div :key="stage">
              <b>{{ t(lineStages[stage].name) }}</b>
              <p>{{ t(lineStages[stage].desc) }}</p>
            </div>
          </Transition>
          <div class="stage-card__dots"><i v-for="n in 7" :key="n" :class="{ on: n - 1 <= stage }"></i></div>
        </div>
        <div class="kpis mono">
          <div><b>300</b>m/min</div><div><b>2.5</b>m</div><div><b>±0.3</b>mm</div>
        </div>
      </div>

      <!-- ACT D — dot sea + CTA -->
      <div class="act act--d" :class="{ on: isOn('d') }">
        <SplitText tag="h2" class="act__title act__title--center" :active="isOn('d')"
                   :text="t({ vi: 'Sẵn sàng cho dây chuyền tiếp theo của bạn?', en: 'Ready for your next production line?' })" />
        <div class="act__cta">
          <RouterLink to="/contact" class="btn btn--primary">{{ t({ vi: 'Yêu cầu báo giá', en: 'Request a quote' }) }} <AppIcon name="arrow" /></RouterLink>
          <RouterLink to="/products" class="btn btn--ghost">{{ t({ vi: 'Xem thiết bị', en: 'View machines' }) }}</RouterLink>
        </div>
      </div>

      <div class="story__hint mono" :class="{ off: p > 0.03 }"><span></span>{{ t({ vi: 'Cuộn để khám phá', en: 'Scroll to discover' }) }}</div>
    </div>
  </section>
</template>

<style scoped>
.story { position: relative; height: 620vh; background: #04060b; }
.story__pin { position: sticky; top: 0; height: 100vh; height: 100svh; overflow: hidden; }
.story__gl { position: absolute; inset: 0; }
.story__gl :deep(canvas) { width: 100% !important; height: 100% !important; display: block; }
.no-gl .story__gl { background: radial-gradient(80% 60% at 50% 60%, #12324d, #04060b); }
.story__vignette { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(120% 90% at 50% 50%, transparent 55%, rgba(4,6,11,.75) 100%); }

/* chapter rail */
.rail { position: absolute; left: var(--gutter); top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 22px; z-index: 3; font-size: 11px; letter-spacing: .12em; }
.rail__i { display: flex; gap: 12px; align-items: center; color: rgba(233,238,247,.35); transition: color .4s; mix-blend-mode: difference; }
.rail__i.on { color: #fff; }
.rail__l { text-transform: uppercase; opacity: 0; transform: translateX(-6px); transition: all .5s var(--ease); }
.rail__i.on .rail__l { opacity: 1; transform: none; }
.rail__bar { position: absolute; left: -14px; top: 0; bottom: 0; width: 1px; background: rgba(255,255,255,.15); }
.rail__bar i { position: absolute; inset: 0; background: var(--red); transform-origin: top; box-shadow: 0 0 8px var(--red-glow); }

/* acts */
.act { position: absolute; z-index: 2; pointer-events: none; opacity: 0; transition: opacity .7s ease; }
.act.on { opacity: 1; pointer-events: auto; }
.act__eyebrow { display: block; font-size: 12px; letter-spacing: .22em; color: var(--cyan); margin-bottom: 18px; }
.act__title { font-family: var(--f-head); font-weight: 300; text-transform: uppercase; letter-spacing: .04em; line-height: 1.12; font-size: clamp(28px, 4.2vw, 60px); color: #fff; max-width: 15ch; }
.act__title--dark { color: #29405c; }
.act__title--center { text-align: center; margin: 0 auto; max-width: 18ch; }
.act__text { font-size: clamp(15px, 1.3vw, 18px); color: var(--text-2); max-width: 44ch; line-height: 1.7; }
.act__text--dark { color: #34506e; font-size: clamp(16px, 1.5vw, 21px); }
.act__text--center { text-align: center; margin: 22px auto 0; }

.act--a { left: 50%; top: 50%; transform: translate(-30%, -50%); }
.act--a .act__eyebrow { color: #4d6a8a; }
.act--a2 { right: calc(var(--gutter) + 6vw); bottom: 18vh; }
.act--b { left: 0; right: 0; top: 30%; text-align: center; padding: 0 var(--gutter); }
.logo-line { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.logo-line__t { font-family: var(--f-head); font-weight: 300; font-size: clamp(30px, 5vw, 72px); letter-spacing: .3em; color: #eaf8ff; text-shadow: 0 0 30px rgba(61,224,255,.6); white-space: pre; }
.logo-line__s { font-size: 11px; letter-spacing: .3em; color: var(--cyan); }
.act--c { left: calc(var(--gutter) + 120px); top: 15vh; }
.act--c .act__title { font-size: clamp(24px, 2.7vw, 40px); max-width: 17ch; }
.stage-card { margin-top: 28px; width: 320px; padding: 18px 20px; border: 1px solid rgba(95,230,255,.35); border-radius: 12px; background: rgba(4,12,22,.55); backdrop-filter: blur(10px); }
.stage-card__n { font-size: 11px; letter-spacing: .14em; color: var(--cyan); }
.stage-card b { display: block; font-family: var(--f-head); font-size: 20px; margin: 6px 0 4px; }
.stage-card p { font-size: 14px; color: var(--text-2); }
.stage-card__dots { display: flex; gap: 6px; margin-top: 14px; }
.stage-card__dots i { flex: 1; height: 2px; background: rgba(255,255,255,.15); transition: background .4s; }
.stage-card__dots i.on { background: var(--red); box-shadow: 0 0 6px var(--red-glow); }
.kpis { display: flex; gap: 26px; margin-top: 22px; font-size: 11px; color: var(--muted); }
.kpis b { display: block; font-family: var(--f-head); font-size: 28px; color: #fff; font-weight: 600; }
.sc-enter-active, .sc-leave-active { transition: opacity .3s, transform .3s; }
.sc-enter-from { opacity: 0; transform: translateY(8px); } .sc-leave-to { opacity: 0; transform: translateY(-8px); }
.act--d { left: 0; right: 0; top: 34%; text-align: center; padding: 0 var(--gutter); }
.act__cta { display: flex; justify-content: center; gap: 14px; margin-top: 34px; flex-wrap: wrap; opacity: 0; transform: translateY(14px); transition: all .8s var(--ease) .5s; }
.act--d.on .act__cta { opacity: 1; transform: none; }

.story__hint { position: absolute; left: 50%; bottom: 28px; transform: translateX(-50%); z-index: 3; display: flex; flex-direction: column; align-items: center; gap: 10px; font-size: 10.5px; letter-spacing: .28em; text-transform: uppercase; color: #3e5672; transition: opacity .5s; }
.story__hint.off { opacity: 0; }
.story__hint span { width: 1px; height: 34px; background: linear-gradient(#3e5672, transparent); animation: hint 2s infinite; }
@keyframes hint { 0% { transform: scaleY(0); transform-origin: top; } 50% { transform: scaleY(1); transform-origin: top; } 51% { transform-origin: bottom; } 100% { transform: scaleY(0); transform-origin: bottom; } }

@media (max-width: 860px) {
  .story { height: 520vh; }
  .rail { display: none; }
  .act--a { left: var(--gutter); right: var(--gutter); transform: translateY(-50%); }
  .act--a2 { left: var(--gutter); right: var(--gutter); bottom: 14vh; }
  .act--c { left: var(--gutter); right: var(--gutter); top: auto; bottom: 8vh; }
  .act--c .act__title { font-size: 26px; }
  .stage-card { width: 100%; }
  .kpis { display: none; }
  .logo-line__t { letter-spacing: .18em; }
}
</style>
