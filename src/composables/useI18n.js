import { ref, watch } from 'vue'

function initialLang() {
  try {
    const saved = localStorage.getItem('bmc-lang')
    if (saved === 'vi' || saved === 'en') return saved
  } catch (e) { /* storage unavailable */ }
  return 'vi'
}

const lang = ref(initialLang())

watch(lang, (v) => {
  try { localStorage.setItem('bmc-lang', v) } catch (e) { /* ignore */ }
  document.documentElement.lang = v
}, { immediate: true })

/** t({ vi, en }) → string for current language; plain strings pass through */
function t(value) {
  if (value == null) return ''
  if (typeof value === 'string' || typeof value === 'number') return value
  return value[lang.value] ?? value.en ?? value.vi ?? ''
}

function toggleLang() {
  lang.value = lang.value === 'vi' ? 'en' : 'vi'
}

export function useI18n() {
  return { lang, t, toggleLang }
}
