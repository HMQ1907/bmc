<script setup>
import { useI18n } from '../composables/useI18n.js'
const { t } = useI18n()
</script>
<template>
  <section class="page-hero" style="min-height: 70vh">
    <div class="container">
      <span class="eyebrow">ERROR 404</span>
      <h1 class="h-xl"><span class="grad-text">404</span></h1>
      <p class="lead">{{ t({ vi: 'Trang bạn tìm không tồn tại.', en: 'The page you are looking for does not exist.' }) }}</p>
      <RouterLink to="/" class="btn btn--primary" style="margin-top: 28px">{{ t({ vi: 'Về trang chủ', en: 'Back to home' }) }}</RouterLink>
    </div>
  </section>
</template>
