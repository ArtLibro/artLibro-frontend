<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/common/HeaderSection.vue'
import Footer from '@/components/common/FooterSection.vue'
</script>

<template>
  <div class="body-layout">
    <Header />
    <div class="content-wrapper">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.body-layout {
  width: 100%;
}

.content-wrapper {
  max-width: 1246px;
  display: grid;
  margin: 0 auto;
}
</style>
