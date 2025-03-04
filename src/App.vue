<script setup lang="ts">
<<<<<<< HEAD
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped>
.btn {
  background-color: $primary-color-100;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
=======
import { RouterView } from 'vue-router'
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
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
  width: 100vw;
}

.content-wrapper {
  max-width: 1246px;
>>>>>>> 8010e39 (feat: 메인 api 연결중 , 공연 개발중)
}
</style>
