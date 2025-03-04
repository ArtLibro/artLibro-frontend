<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
</script>

<template>
  <div class="body-layout">
    <Header/>
    <RouterView />
    <Footer/>
  </div>
</template>

<style lang="scss" scoped>
.body-layout {
  display: grid;
  justify-content: center;
}

.content-wrapper {
  max-width: 1246px;
}
</style>
