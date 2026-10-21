<script setup>
import { reactive, ref } from 'vue'
import AppIcon from './AppIcon.vue'
import { useI18n } from '../composables/useI18n.js'
import { categories } from '../data/products.js'
import { company } from '../data/company.js'

const props = defineProps({ preset: { type: String, default: '' } })
const { t } = useI18n()
const f = reactive({ name: '', company: '', email: '', phone: '', country: '', interest: props.preset, message: '' })
const sent = ref(false)

/*
 * No backend in this static build: the form opens the visitor's mail app
 * with a pre-filled message to info@bmcpack.com.
 * To use a real endpoint (Formspree, your API…), replace submit() with a fetch() POST.
 */
function submit() {
  const body = [
    `Name: ${f.name}`, `Company: ${f.company}`, `Email: ${f.email}`, `Phone/WhatsApp/Zalo: ${f.phone}`,
    `Country: ${f.country}`, `Interest: ${f.interest}`, '', f.message
  ].join('\n')
  const subject = `Quote request — ${f.interest || 'BMC machinery'} — ${f.company || f.name}`
  window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  sent.value = true
}
</script>

<template>
  <form class="qf panel hud-corners" @submit.prevent="submit">
    <div class="qf__head">
      <span class="tag"><AppIcon name="chat" :size="13" /> {{ t({ vi: 'Phản hồi trong 24 giờ', en: 'Reply within 24h' }) }}</span>
      <h3 class="h-md">{{ t({ vi: 'Yêu cầu báo giá', en: 'Request a quote' }) }}</h3>
    </div>
    <div class="qf__grid">
      <div class="field"><label for="q-name">{{ t({ vi: 'Họ tên *', en: 'Full name *' }) }}</label><input id="q-name" v-model="f.name" required autocomplete="name" /></div>
      <div class="field"><label for="q-co">{{ t({ vi: 'Công ty', en: 'Company' }) }}</label><input id="q-co" v-model="f.company" autocomplete="organization" /></div>
      <div class="field"><label for="q-mail">Email *</label><input id="q-mail" v-model="f.email" type="email" required autocomplete="email" /></div>
      <div class="field"><label for="q-ph">{{ t({ vi: 'Điện thoại / Zalo / WhatsApp', en: 'Phone / WhatsApp / Zalo' }) }}</label><input id="q-ph" v-model="f.phone" type="tel" autocomplete="tel" /></div>
      <div class="field"><label for="q-ct">{{ t({ vi: 'Quốc gia', en: 'Country' }) }}</label><input id="q-ct" v-model="f.country" autocomplete="country-name" /></div>
      <div class="field">
        <label for="q-int">{{ t({ vi: 'Thiết bị quan tâm', en: 'Equipment of interest' }) }}</label>
        <select id="q-int" v-model="f.interest">
          <option value="">{{ t({ vi: '— Chọn —', en: '— Select —' }) }}</option>
          <option v-for="c in categories" :key="c.id" :value="c.name.en">{{ t(c.name) }}</option>
          <option value="Turnkey plant">{{ t({ vi: 'Nhà máy trọn gói', en: 'Turnkey plant' }) }}</option>
        </select>
      </div>
      <div class="field qf__full"><label for="q-msg">{{ t({ vi: 'Mô tả dự án (sản lượng, khổ, số lớp…)', en: 'Project details (output, width, ply…)' }) }}</label><textarea id="q-msg" v-model="f.message" rows="4"></textarea></div>
    </div>
    <button class="btn btn--primary qf__btn" type="submit">{{ t({ vi: 'Gửi yêu cầu', en: 'Send request' }) }} <AppIcon name="arrow" /></button>
    <p v-if="sent" class="qf__ok"><AppIcon name="check" :size="16" /> {{ t({ vi: 'Ứng dụng email của bạn đã được mở với nội dung điền sẵn. Hoặc nhắn trực tiếp qua Zalo/WhatsApp.', en: 'Your email app has opened with the details filled in. You can also message us on WhatsApp/Zalo.' }) }}</p>
  </form>
</template>

<style scoped>
.qf { padding: clamp(22px, 3vw, 36px); }
.qf__head { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; align-items: flex-start; }
.qf__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.qf__full { grid-column: 1 / -1; }
.qf__btn { margin-top: 22px; width: 100%; }
.qf__ok { margin-top: 14px; display: flex; gap: 8px; align-items: flex-start; font-size: 14px; color: var(--ok); }
.qf__ok svg { flex: none; margin-top: 3px; }
@media (max-width: 600px) { .qf__grid { grid-template-columns: 1fr; } }
</style>
