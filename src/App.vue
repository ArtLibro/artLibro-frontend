<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/common/HeaderSection.vue'
import Footer from '@/components/common/FooterSection.vue'
</script>

<template>
  <div class="body-layout">
    <Header />
    <RouterView />
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.body-layout {
  display: grid;
  justify-content: center;
  // width: 100vw;
}

.content-wrapper {
  max-width: 1246px;
}
</style>
