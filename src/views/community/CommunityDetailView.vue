<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchPosts } from '@/apis/community/post'
import CommunityDetailComment from '@/components/CommunityDetailView/CommunityDetailComment.vue'
import CommunityDetailContent from '@/components/CommunityDetailView/CommunityDetailContent.vue'
import CommunityDetailNextPost from '@/components/CommunityDetailView/CommunityDetailNextPost.vue'
import type { Post } from '@/types/community/communityType'

const route = useRoute()
const post = ref<Post | null>(null)

// 특정 게시글 데이터 불러오기
const loadPostDetail = async () => {
  const posts = await fetchPosts()
  post.value = posts.find((p) => p.id === route.params.id) || null
  console.log('📌 불러온 게시글:', post.value)
}

onMounted(loadPostDetail)
</script>

<template>
  <div v-if="post" class="page-container">
    <section class="background">
      <img src="/images/community-background.png" alt="배경이미지" />
    </section>

    <div class="content-wrapper">
      <div class="content-area">
        <CommunityDetailContent :post="post" />
        <div class="bottom-section">
          <div class="comments-container">
            <CommunityDetailComment :postId="post.id" />
          </div>
          <div class="sidebar">
            <CommunityDetailNextPost :currentPostId="post.id" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>게시글을 불러오는 중...</p>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  max-width: 1246px;
  margin: 0 auto;
  position: relative;
}

.background {
  width: 100vw;
  height: 500px;
  overflow: hidden;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

.background img {
  width: 100vw;
  height: 100%;
  object-fit: cover;
  display: block;
}

.content-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -75%);
  width: 100%;
  max-width: 1237px;
}

.content-area {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.bottom-section {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  width: 100%;
  align-items: flex-start;
}

/* 댓글 섹션 */
.comments-container {
  flex-grow: 1;
  max-width: calc(100% - 220px); /* 사이드바 공간을 제외한 나머지 공간 */
}

/* 다음 게시글 섹션 */
.sidebar {
  width: 200px;
  flex-shrink: 0;
}
</style>
