<script setup lang="ts">
import CommunityWriteForm from '@/components/CommunityWriteView/CommunityWriteForm.vue'
</script>

<template>
  <div class="post-page">
    <section class="background">
      <img src="/images/community-write-background.png" alt="배경이미지" />
    </section>
    <div class="form-container">
      <CommunityWriteForm />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post-page {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150vh;
}

.background {
  position: absolute;
  top: 0;
  left: 50%;
  width: 100vw;
  height: 338px;
  overflow: hidden;
  transform: translateX(-50%);
}

.background img {
  width: 100vw;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.form-container {
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  width: 900px;

  padding: 30px;
}
</style>
