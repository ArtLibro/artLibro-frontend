<template>
  <div class="mypage-container">
    <UserCardSection />
  </div>
</template>

<script setup lang="ts">
import UserCardSection from '@/components/myPage/UserCardSection.vue';
import { useAuthStore } from '@/stores/authStore';

const { userId } = useAuthStore()

console.log(userId)

</script>

<style lang="scss" scoped>
.mypage-container {
  width: 1256px;
  margin: 60px auto;
}
</style>
