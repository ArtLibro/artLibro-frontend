<script setup lang="ts">
import { deletePost } from '@/apis/community/post'
import router from '@/router'
import type { Post } from '@/types/community/communityType'
import dayjs from 'dayjs'
import { computed } from 'vue'

const props = defineProps<{ post: Post }>()

// createdAt을 YYYY-MM-DD 형식으로 변환
const formattedDate = computed(() => {
  return props.post.createdAt ? dayjs(props.post.createdAt).format('YYYY-MM-DD') : ''
})

// 게시글 삭제
const handleDelete = async () => {
  const confirmDelete = confirm('정말 삭제하시겠습니까?')
  if (confirmDelete) {
    await deletePost(props.post.id)
    alert('게시글이 삭제되었습니다.')
    router.push('/community') // 삭제 후 커뮤니티 메인으로 이동
  }
}

// 게시글 수정페이지로 이동
const goToEditPage = () => {
  router.push(`/community/edit/${props.post.id}`) // 수정페이지로 이동
}

// test
console.log('CommunityDetailContent에서 받은 post:', props.post)
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
            <h3 class="username">홍길동</h3>
          </div>
        </div>
        <span class="post-date">{{ formattedDate }}</span>
      </div>

      <div class="book-image">
        <img v-if="post.image" :src="post.image" alt="게시글 이미지" class="post-image" />
      </div>

      <div class="review-container">
        <div class="review-text">
          <p>
            {{ post.content }}
          </p>
        </div>
      </div>

      <div class="button-group">
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
  position: absolute;
  bottom: 30px;
  right: 80px;
  display: flex;
  gap: 10px;
}

.edit-button,
.delete-button {
  width: 90px;
  height: 40px;
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  border: none;
}

.edit-button {
  background-color: white;
  color: blue;
  border: 1px solid blue;
}

.delete-button {
  background-color: white;
  color: red;
  border: 1px solid red;
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

.review-container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 380px;
  background: white;
  border-radius: 20px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.review-text {
  width: 100%;
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
