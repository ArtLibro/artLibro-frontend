<script setup lang="ts">
import MainSearch from './MainSearch.vue'
</script>

<template>
  <!-- "@/assets/logo.svg -->
  <div class="heroImage">
    <img src="/public/images/heroimage.svg" alt="히어로이미지" />
    <MainSearch />
  </div>
</template>

<style lang="scss" scoped>
.heroImage {
  position: relative;
}

.heroImage img {
  width: 100%;
}
</style>
