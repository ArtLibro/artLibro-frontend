<template>
  <div class="user-follow-card">

    <div class="user-follow-card-header">
      <div class="user-follow-card-header-tab" :class="{ active: selectedTab === 'follower' }"
        @click="selectedTab = 'follower'">팔로워</div>
      <div class="user-follow-card-header-tab" :class="{ active: selectedTab === 'following' }"
        @click="selectedTab = 'following'">팔로잉</div>
    </div>

    <FollowerContainer v-if="selectedTab === 'follower'" />
    <FollowingContainer v-if="selectedTab === 'following'" />
  </div>
</template>

<script setup lang="ts">
import FollowerContainer from '@/components/myPage/FollowerContainer.vue';
import FollowingContainer from '@/components/myPage/FollowingContainer.vue';
import { ref } from 'vue';

// 팔로워 팔로잉 탭 선택
const selectedTab = ref<'follower' | 'following'>('follower');

</script>

<style lang="scss" scoped>
.user-follow-card {
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
  padding: 1rem;

  .user-follow-card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    padding-bottom: 1rem;

    .user-follow-card-header-tab {
      font-size: 16px;
      color: $text-color-300;
      cursor: pointer;

      &.active {
        color: $secondary-color-300;
      }
    }
  }

}
</style>
