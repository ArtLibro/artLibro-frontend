<template>
  <div class="mypage-container">
    <div v-if="isLoading">로딩중...</div>
    <UserCardSection v-else :userInfo="data" />
  </div>
</template>

<script setup lang="ts">
import UserCardSection from '@/components/myPage/UserCardSection.vue';
import { useAuthStore } from '@/stores/authStore';
import { useQuery } from '@tanstack/vue-query';
import { getUserInfo } from '@/apis/user';

const { userId } = useAuthStore();

const { data, isLoading } = useQuery({
  queryKey: ['userInfo', userId],
  queryFn: () => getUserInfo(userId as string),
})


</script>

<style lang="scss" scoped>
.mypage-container {
  width: 1256px;
  margin: 60px auto;
}
</style>
