<script setup lang="ts">
defineProps<{
  review: {
    user: string
    time: string
    title: string
    content: string
    likes: number
    comments: number
    image: string
    avatar: string
    category: string
  }
}>()

// 로그인 기능 구현 전 더미 데이터
const defaultUserName = '홍길동'
const defaultTime = '1시간 전'
const defaultAvatar = '/images/user-dummy.png'
</script>

<template>
  <div class="review-card">
    <div class="review-content">
      <div class="user-info">
        <img :src="defaultAvatar" alt="프로필사진" class="review-avatar" />
        <div class="user-details">
          <span class="user-name">{{ defaultUserName }}</span>
          <span class="time">{{ defaultTime }}</span>
        </div>
      </div>
      <h3 class="review-title">{{ review.title }}</h3>
      <p class="review-text">{{ review.content }}</p>
      <div class="review-meta">
        <span>좋아요 {{ review.likes }}</span>
        <span>댓글 {{ review.comments }}</span>
      </div>
    </div>
    <img :src="review.image" alt="책표지" class="review-image" />
  </div>
</template>

<style lang="scss" scoped>
.review-card {
  width: 1130px;
  height: 240px;

  border-bottom: 1px solid $text-color-100;
  display: flex;
  align-items: center;
  padding: 20px;
}

.review-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: $text-color-600;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.review-avatar {
  width: 48px;
  height: 48px;
}

.user-name {
  font-size: $text-size-300;
}

.time {
  color: $text-color-200;
}

.review-title {
  font-size: $text-size-400;
  margin: 0;
}

.review-text {
  font-size: $text-size-300;
  color: #666;
  line-height: 1.5;
  margin-top: 0;
}

.review-meta {
  font-size: $text-size-200;
  color: #777;
  display: flex;
  gap: 15px;
}

.review-image {
  width: 173px;
  height: 247px;
  object-fit: cover;
  margin-left: 30px;
}
</style>
