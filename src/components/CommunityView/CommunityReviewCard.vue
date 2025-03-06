<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps<{
  review: {
    id: string
    user: string
    title: string
    content: string
    likes: number
    comments: number
    image: string
    avatar: string
    category: string
    time: string
  }
}>()

// 기본 이미지 경로
const defaultBookImage = '/images/community-no-image.png'

// 책 이미지가 없을 때 기본 이미지로 대체
const reviewImage = computed(() => props.review.image || defaultBookImage)

// 기본 이미지인지 확인
const isDefaultImage = computed(() => reviewImage.value === defaultBookImage)

const goToDetail = () => {
  router.push(`/community/${props.review.id}`)
}
</script>

<template>
  <div class="review-card" @click="goToDetail">
    <div class="review-content">
      <div class="user-info">
        <img src="/images/user-dummy.png" alt="유저 프로필" class="review-avatar" />
        <div class="user-details">
          <span class="user-name">홍길동</span>
          <span class="time">{{ review.time }}</span>
        </div>
      </div>
      <h3 class="review-title">{{ review.title }}</h3>
      <p class="review-text">{{ review.content }}</p>
      <div class="review-meta">
        <span>좋아요 {{ review.likes }}</span>
        <span>댓글 {{ review.comments }}</span>
      </div>
    </div>
    <img
      :src="reviewImage"
      :class="{ 'review-image': true, 'default-image': isDefaultImage }"
      alt="책표지"
    />
  </div>
</template>

<style lang="scss" scoped>
.review-card {
  cursor: pointer;
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
  gap: 5px;
  font-size: 14px;
  color: $text-color-600;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.review-avatar {
  width: 35px;
  height: 35px;
}

.user-name {
  font-size: $text-size-200;
  color: $text-color-400;
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
  width: 150px;
  height: 200px;
  object-fit: cover;
  margin-left: 30px;
  box-shadow: 0px 1px 4px $text-color-300;
}

.default-image {
  opacity: 0.5;
  padding: 50px 30px;
  object-fit: fill;
}
</style>
