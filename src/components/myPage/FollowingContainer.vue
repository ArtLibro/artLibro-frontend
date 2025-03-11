<template>
  <div class="following-container" v-if="followingUsers.length > 0">

    <div class="following-item" v-for="following in followingUsers" :key="following._id">
      <div class="following-user-info">
        <img :src="following.image" alt="프로필 이미지" class="following-user-profile-image">
        <p class="following-user-name">{{ following.fullName }}</p>
      </div>
      <div class="following-user-info-container">
        <span :class="['following-user-info-status', following.isOnline ? 'online' : 'offline']">
          {{ following.isOnline ? '온라인' : '오프라인' }}
        </span>
        <button class="following-user-info-button" @click="unFollowHandler(following._id)">팔로우 취소</button>
      </div>
    </div>

  </div>
  <NotFound v-else title="팔로잉이 없습니다." />
</template>

<script setup lang="ts">
import { deleteUserFollow, getUserInfo } from '@/apis/user';
import type { FollowingType, UserType } from '@/types/user';
import { message } from 'ant-design-vue';
import { ref, watchEffect } from 'vue';
import NotFound from '../common/NotFound.vue';

const props = defineProps<{
  following: FollowingType[]
}>()

const followingUsers = ref<UserType[]>([]);

const fetchUser = async () => {
  if (props.following) {
    try {
      const userPromises = props.following.map(follow => getUserInfo(follow.user))
      followingUsers.value = await Promise.all(userPromises)
    } catch (error) {
      console.error(error)
      message.error('팔로잉 유저 정보를 불러오는데 실패했습니다.', 1)
    }
  }
}

watchEffect(() => {
  if (props.following?.length) {
    fetchUser()
  }
})

const unFollowHandler = async (userId: string) => {
  try {
    const followData = props.following.find(follow => follow.user === userId)
    if (followData) {
      if (confirm('정말 팔로우를 취소하시겠습니까?')) {
        await deleteUserFollow(followData._id)
        followingUsers.value = followingUsers.value.filter(user => user._id !== userId)
        message.success('팔로우를 취소했습니다.', 1)
      }
    }
  } catch (error) {
    console.error(error)
    message.error('팔로우를 취소하는데 실패했습니다. 잠시 후 다시 시도해주세요.', 1)
  }
}


</script>

<style lang="scss" scoped>
.following-container {
  width: 100%;
  height: 240px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  .following-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }

    .following-user-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .following-user-name {
        font-size: 14px;
      }

      .following-user-profile-image {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }

    .following-user-info-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .following-user-info-status {
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

      .following-user-info-button {
        font-size: 12px;
        color: #1F1F1F;
        border-radius: 12px;
        padding: 5px 12px;
        background-color: #6472fc;
        border: none;
        cursor: pointer;
      }
    }
  }
}
</style>
