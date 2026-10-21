import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import { reveal } from './composables/reveal.js'
import { parallax } from './composables/parallax.js'
import { initSmoothScroll } from './composables/useSmoothScroll.js'
import './assets/main.css'

initSmoothScroll()
createApp(App).use(router).directive('reveal', reveal).directive('parallax', parallax).mount('#app')
