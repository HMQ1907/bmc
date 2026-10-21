import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import { reveal } from './composables/reveal.js'
import './assets/main.css'

createApp(App).use(router).directive('reveal', reveal).mount('#app')
