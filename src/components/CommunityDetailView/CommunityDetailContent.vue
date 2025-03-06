<script setup lang="ts">
import { deletePost } from '@/apis/community/post'
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'
import type { Post } from '@/types/community/communityType'
import dayjs from 'dayjs'
import { computed } from 'vue'

const props = defineProps<{ post: Post }>()
const authStore = useAuthStore()

// 현재 로그인한 사용자 ID 가져오기
const userId = computed(() => authStore.userId)

// 본인 게시글인지 확인
const isAuthor = computed(() => {
  console.log('🔍 작성자 ID:', props.post.userId, '| 현재 사용자 ID:', userId.value)
  return props.post.userId === userId.value
})

// 기본 이미지 경로
const defaultBookImage = '/images/community-no-image.png'

// 책 이미지가 없을 경우 기본 이미지 사용
const bookImage = computed(() => (props.post.image ? props.post.image : defaultBookImage))

// 현재 이미지가 기본 이미지인지 체크
const isDefaultImage = computed(() => bookImage.value === defaultBookImage)

// createdAt을 YYYY-MM-DD 형식으로 변환
const formattedDate = computed(() => {
  return props.post.createdAt ? dayjs(props.post.createdAt).format('YYYY-MM-DD') : ''
})

// 게시글 삭제
const handleDelete = async () => {
  const confirmDelete = confirm('정말 삭제하시겠습니까?')
  if (confirmDelete) {
    await deletePost(props.post.id, props.post.userId)
    alert('게시글이 삭제되었습니다.')
    router.push('/community')
  }
}

// 게시글 수정 페이지로 이동
const goToEditPage = () => {
  if (!isAuthor.value) {
    alert('본인 게시글만 수정할 수 있습니다!')
    return
  }

  router.push({
    path: `/community/edit/${props.post.id}`,
    query: { post: JSON.stringify(props.post) },
  })
}
</script>

<template>
  <section class="content-container">
    <div class="content-box">
      <div class="title-category-wrapper">
        <span class="category">{{ post.category }}</span>
        <h2 class="content-title">{{ post.title }}</h2>
      </div>

      <div class="meta-info">
        <div class="user-profile">
          <img src="/images/user-dummy.png" alt="유저 프로필" class="profile-image" />
          <div>
            <h3 class="username">{{ post.authorName }}</h3>
          </div>
        </div>
        <span class="post-date">{{ formattedDate }}</span>
      </div>

      <div class="book-image">
        <img
          :src="bookImage"
          alt="게시글 이미지"
          class="post-image"
          :class="{ 'default-image': isDefaultImage }"
        />
      </div>

      <div class="review-container">
        <div class="review-text">
          <p>
            {{ post.content }}
          </p>
        </div>
      </div>

      <div v-if="isAuthor" class="button-group">
        <button class="edit-button" @click="goToEditPage">수정</button>
        <button class="delete-button" @click="handleDelete">삭제</button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.content-container {
  position: relative;
  height: auto;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-box {
  width: 1237px;
  height: 491px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  text-align: center;
}

.title-category-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 0;
  padding-bottom: 0;
}

.content-title {
  font-size: $text-size-500;
  font-weight: bold;
  color: white;
  margin: 0;
}

.meta-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin-bottom: 0;
  padding-bottom: 0;
  font-size: 16px;
  color: $text-color-400;
}

.user-profile {
  display: flex;
  direction: row;
  gap: 10px;
  align-items: center;
}
.profile-image {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
}

.username {
  font-weight: lighter;
  color: white;
  margin-right: 20px;
}

.category {
  width: 90px;
  height: 35px;
  font-weight: bold;
  background-color: $primary-color-100;
  padding: 5px 10px;
  border-radius: 999px;
  color: $text-color-500;
  display: flex;
  align-items: center;
  justify-content: center;
}

.post-date {
  font-weight: lighter;
  color: white;
}

.button-group {
  direction: flex;
  flex-direction: column;
  position: absolute;
  bottom: 20px;
  right: 80px;
  display: flex;
  gap: 10px;
}

.edit-button,
.delete-button {
  width: 220px;
  height: 30px;
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  border: none;
}

.edit-button {
  background-color: white;
  color: #0077b6;
  border: 1px solid #0077b6;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #0077b6;
    color: white;
  }
}

.delete-button {
  background-color: white;
  color: #d62828;
  border: 1px solid #d62828;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #d62828;
    color: white;
  }
}

.book-image {
  position: absolute;
  top: 60px;
  right: 80px;
  z-index: 2;
}

.book-image img {
  width: 220px;
  height: 320px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.default-image {
  background-color: white;
  padding: 90px 40px;
  box-sizing: border-box; /* 패딩이 내부에 포함되도록 설정 */
  object-fit: contain;
  width: 100%;
  height: auto;
}

.review-container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 390px;
  background: white;
  border-radius: 20px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.review-text {
  width: 900px;
  font-size: $text-size-300;
  font-weight: lighter;
  line-height: 1.6;
  text-align: left;
  position: relative;
  left: 0;
  padding: 20px;
}

.review-text p {
  margin: 0;
}
</style>
