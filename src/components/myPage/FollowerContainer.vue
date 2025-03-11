<template>
  <div class="follower-container" v-if="followerUsers.length > 0">

    <div class="follower-item" v-for="follower in followerUsers" :key="follower._id">
      <p class="follower-user-name">{{ follower.fullName }}</p>
      <div class="follower-user-info-container">
        <span :class="['follower-user-info-status', follower.isOnline ? 'online' : 'offline']">
          {{ follower.isOnline ? '온라인' : '오프라인' }}
        </span>
        <button class="follower-user-info-button">팔로우 취소</button>
      </div>
    </div>

  </div>
  <NotFound v-else title="팔로워가 없습니다." />
</template>

<script setup lang="ts">
import { getUserInfo } from '@/apis/user';
import type { FollowersType, UserType } from '@/types/user';
import { message } from 'ant-design-vue';
import { ref, watchEffect } from 'vue';
import NotFound from '../common/NotFound.vue';

const props = defineProps<{
  followers: FollowersType[]
}>()

const followerUsers = ref<UserType[]>([]);

const fetchUser = async () => {
  if (props.followers) {
    try {
      const userPromises = props.followers.map(follow => getUserInfo(follow.user))
      followerUsers.value = await Promise.all(userPromises)
    } catch (error) {
      console.error(error)
      message.error('팔로잉 유저 정보를 불러오는데 실패했습니다.', 1)
    }
  }
}

watchEffect(() => {
  if (props.followers?.length) {
    fetchUser()
  }
})
</script>

<style lang="scss" scoped>
.follower-container {
  width: 100%;
  height: 240px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  .follower-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }

    .follower-user-name {
      font-size: 14px;
    }

    .follower-user-info-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .follower-user-info-status {
        font-size: 12px;
        color: #1F1F1F;
        border-radius: 12px;
        padding: 6px 14px;
      }

      .online {
        background-color: #99FDD2;
      }

      .offline {
        background-color: #FDD299;
      }
    }
  }
}
</style>
