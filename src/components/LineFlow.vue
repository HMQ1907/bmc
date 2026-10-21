<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from '../composables/useI18n.js'
import { lineStages } from '../data/company.js'

const { t } = useI18n()
const active = ref(0)
let timer
const start = () => { stop(); timer = setInterval(() => { active.value = (active.value + 1) % lineStages.length }, 2200) }
const stop = () => clearInterval(timer)
onMounted(start)
onBeforeUnmount(stop)
const pick = (i) => { active.value = i; start() }
</script>

<template>
  <div class="lf panel">
    <div class="lf__head">
      <span class="tag"><i class="dot-live"></i> LINE · ND5WJ300-2200</span>
      <span class="mono lf__speed">{{ t({ vi: 'Tốc độ', en: 'Speed' }) }} <b>250</b> m/min</span>
    </div>

    <div class="lf__track" role="tablist">
      <div class="lf__rail"><div class="lf__fill" :style="{ width: `${(active / (lineStages.length - 1)) * 100}%` }"></div><div class="lf__sheet"></div></div>
      <button v-for="(s, i) in lineStages" :key="s.code" class="lf__node" role="tab"
              :aria-selected="i === active" :class="{ on: i === active, done: i < active }"
              @click="pick(i)" @mouseenter="pick(i)">
        <span class="lf__dot"><i></i></span>
        <span class="lf__code mono">{{ s.code }}</span>
        <span class="lf__name">{{ t(s.name) }}</span>
      </button>
    </div>

    <Transition name="fade" mode="out-in">
      <div class="lf__info" :key="active">
        <span class="mono lf__step">STAGE {{ lineStages[active].code }} / 07</span>
        <h4>{{ t(lineStages[active].name) }}</h4>
        <p>{{ t(lineStages[active].desc) }}</p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.lf { padding: clamp(20px, 3vw, 36px); overflow: hidden; }
.lf__head { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 36px; }
.lf__speed { font-size: 12px; color: var(--muted); }
.lf__speed b { color: var(--red); font-size: 18px; }
.lf__track { position: relative; display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
.lf__rail { position: absolute; top: 15px; left: calc(100% / 14); right: calc(100% / 14); height: 2px; background: var(--line-2); }
.lf__fill { height: 100%; background: linear-gradient(90deg, var(--cyan), var(--red)); box-shadow: 0 0 12px var(--red-glow); transition: width .7s var(--ease); }
.lf__sheet { position: absolute; top: -3px; left: 0; width: 60px; height: 8px; border-radius: 4px; background: linear-gradient(90deg, transparent, rgba(255,255,255,.7), transparent); animation: run 2.4s linear infinite; }
@keyframes run { from { transform: translateX(-60px); } to { transform: translateX(calc(100vw)); } }
.lf__node { position: relative; display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; padding: 0 2px; }
.lf__dot { width: 32px; height: 32px; border-radius: 50%; display: grid; place-items: center; background: var(--bg-2); border: 1.5px solid var(--line-2); transition: all .35s var(--ease); }
.lf__dot i { width: 8px; height: 8px; border-radius: 50%; background: var(--muted); transition: all .35s; }
.lf__node.done .lf__dot { border-color: var(--cyan); }
.lf__node.done .lf__dot i { background: var(--cyan); }
.lf__node.on .lf__dot { border-color: var(--red); box-shadow: 0 0 0 6px rgba(255,45,74,.12), 0 0 24px var(--red-glow); transform: scale(1.1); }
.lf__node.on .lf__dot i { background: var(--red); }
.lf__code { font-size: 10.5px; color: var(--muted); }
.lf__name { font-size: 13px; font-weight: 500; color: var(--text-2); line-height: 1.3; transition: color .3s; }
.lf__node.on .lf__name { color: #fff; }
.lf__info { margin-top: 36px; padding-top: 24px; border-top: 1px dashed var(--line-2); min-height: 110px; }
.lf__step { font-size: 11px; color: var(--cyan); letter-spacing: .1em; }
.lf__info h4 { font-size: 22px; margin: 8px 0 6px; }
.lf__info p { color: var(--text-2); }
.fade-enter-active, .fade-leave-active { transition: opacity .25s, transform .25s; }
.fade-enter-from { opacity: 0; transform: translateY(6px); }
.fade-leave-to { opacity: 0; transform: translateY(-6px); }
@media (max-width: 720px) {
  .lf__name { display: none; }
  .lf__dot { width: 26px; height: 26px; }
  .lf__rail { top: 12px; }
}
</style>
