<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Post } from '@/types/community/communityType'

const router = useRouter()
const props = defineProps<{
  posts: Post[] // 전체 게시글 리스트
  currentPostId: string // 현재 게시글 ID
}>()

// 현재 게시글의 인덱스 찾기
const currentIndex = computed(() => props.posts.findIndex((p) => p.id === props.currentPostId))

// 다음 게시글 찾기 (최대 3개)
const nextPosts = computed(() => {
  if (currentIndex.value === -1) return [] // 현재 게시글 없으면 빈 배열 반환

  const start = currentIndex.value + 1
  let nextPosts = props.posts.slice(start, start + 3)

  // 만약 다음 게시글이 3개보다 적으면 이전 게시글에서 채우기
  if (nextPosts.length < 3) {
    const remaining = 3 - nextPosts.length
    nextPosts = [
      ...nextPosts,
      ...props.posts.slice(Math.max(0, currentIndex.value - remaining), currentIndex.value),
    ]
  }

  return nextPosts
})

// 게시글 상세페이지로 이동
const goToDetail = (postId: string) => {
  router.push(`/community/${postId}`)
}
</script>

<template>
  <aside class="sidebar" v-if="nextPosts.length">
    <div class="sidebar-title">다음 게시글</div>
    <div class="next-posts">
      <div class="post-item" v-for="post in nextPosts" :key="post.id" @click="goToDetail(post.id)">
        <img :src="post.image || '/images/default-book.jpg'" alt="다음 게시글" />
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.sidebar-title {
  width: 200px;
  height: 52px;
  background-color: $text-color-500;
  color: white;
  border-radius: 10px 10px 0 0;
  text-align: center;
  line-height: 52px;
  font-weight: bold;
}

.next-posts {
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.post-item {
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: $text-color-100;
  cursor: pointer;
}

.post-item img {
  width: 135px;
  height: 200px;
  object-fit: cover;
  margin: 20px;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
}
</style>
