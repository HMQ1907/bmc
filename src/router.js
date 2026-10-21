import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/products/:cat?', name: 'products', component: () => import('./views/ProductsView.vue') },
  { path: '/product/:slug', name: 'product', component: () => import('./views/ProductDetailView.vue') },
  { path: '/about', name: 'about', component: () => import('./views/AboutView.vue') },
  { path: '/contact', name: 'contact', component: () => import('./views/ContactView.vue') },
  { path: '/:pathMatch(.*)*', name: 'notfound', component: () => import('./views/NotFoundView.vue') }
]

export default createRouter({
  // Hash history: works on any static host without server rewrites
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash && to.hash.length > 1 && !to.hash.startsWith('#/')) return { el: to.hash, top: 80, behavior: 'smooth' }
    return { top: 0 }
  }
})
