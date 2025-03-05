<script setup lang="ts">
import CommunityWriteForm from '@/components/CommunityWriteView/CommunityWriteForm.vue'
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { fetchPosts, updatePost } from '@/apis/community/post'
import type { Post } from '@/types/community/communityType'

const router = useRouter()
const route = useRoute()
const post = ref<Post | null>(null)

// 기존 게시글 데이터 불러오기
const loadPostDetail = async () => {
  const posts = await fetchPosts()
  post.value = posts.find((p) => p.id === route.params.id) || null
}

// 게시글 수정 후 상세페이지로 이동
const handlePostUpdated = async (updatedPost: Post, imageFile: File | null) => {
  if (!post.value) return
  await updatePost(post.value.id, updatedPost, imageFile)
  alert('✅ 게시글이 수정되었습니다!')
  router.push(`/community/${post.value.id}`)
}

onMounted(loadPostDetail)
</script>

<template>
  <div class="edit-page">
    <section class="background">
      <img src="/images/community-write-background.png" alt="배경이미지" />
    </section>
    <div class="form-container" v-if="post">
      <CommunityWriteForm :existingPost="post" @postCreated="handlePostUpdated" />
    </div>
    <div v-else>
      <p>게시글 정보를 불러오는 중...</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.edit-page {
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
