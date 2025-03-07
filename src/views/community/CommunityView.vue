<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { fetchPosts } from '@/apis/community/post'
import Pagination from '@/components/common/Pagination.vue'
import CommunityMainCard from '@/components/CommunityView/CommunityMainCard.vue'
import CommunityReviewCard from '@/components/CommunityView/CommunityReviewCard.vue'
import CommunityTabs from '@/components/CommunityView/CommunityTabs.vue'
import { useRoute, useRouter } from 'vue-router'
import type { Post } from '@/types/community/communityType'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// 로그인 여부 확인
const isLoggedIn = computed(() => !!authStore.token)

// API에서 불러온 게시글 저장 (메인카드, 리뷰카드 공용으로 사용)
const posts = ref<Post[]>([])

// CommunityMainCard 최신 글 6개만 보여줌
const latestMainPosts = computed(() =>
  posts.value.slice(0, 6).map((post) => ({
    id: post.id,
    title: post.title,
    image: post.image || '',
    date: new Date(post.createdAt).toLocaleDateString(), // 날짜 변환
    authorName: post.authorName,
    comment: 0, // 기본값 설정 -> 수정할 예정
    likes: 0, // 기본값 설정 -> 수정할 예정
  })),
)

// 포맷된 리뷰 리스트 (CommunityReviewCard용 데이터 변환)
const formattedReviews = computed(() =>
  filteredReviews.value.map((post) => ({
    id: post.id,
    authorName: post.authorName,
    title: post.title,
    content: post.content,
    likes: 0,
    comments: 0,
    image: post.image || '',
    avatar: '/images/user-dummy.png',
    category: post.category,
    time: new Date(post.createdAt).toLocaleString(),
  })),
)

// 탭 필터링 (도서, 공연/행사)
const activeKey = ref('1')
const filteredReviews = computed(() =>
  activeKey.value === '1'
    ? posts.value
    : posts.value.filter(
      (post) => post.category === (activeKey.value === '2' ? '도서' : '공연/행사'),
    ),
)

// 페이지네이션 관련 설정
const currentPage = ref(1) // 현재 페이지
const reviewsPerPage = 5 // 페이지당 5개씩 보여줌

// 페이지네이션을 적용한 리뷰 리스트
const paginatedReviews = computed(() => {
  const start = (currentPage.value - 1) * reviewsPerPage
  return formattedReviews.value.slice(start, start + reviewsPerPage)
})

// 게시글 불러오기
const loadPosts = async () => {
  posts.value = await fetchPosts()
}

// 새로고침 감지 -> 게시글 새로 불러오기
watch(
  () => route.query.refresh,
  async (newVal) => {
    if (newVal) {
      await loadPosts()
      router.replace({ path: '/community' }) // URL에서 refresh=true 제거
    }
  },
)

// 게시글 상세페이지로 이동
const goToDetailPage = (postId: string) => {
  router.push({
    path: `/community/${postId}`,
    query: { posts: JSON.stringify(posts.value) },
  })
}

// 게시글 작성페이지로 이동
const goToWritePage = () => {
  router.push('/community/write').then(() => {
    window.scrollTo({ top: 0 })
  })
}

onMounted(loadPosts)
</script>

<template>
  <div class="community-main">
    <div class="title-wrapper">
      <img class="title-icon" src="/icons/title-point.svg" />
      <h2 class="title">커뮤니티</h2>
    </div>

    <div class="post-grid">
      <CommunityMainCard v-for="(post, index) in latestMainPosts" :key="index" :post="post"
        @click="goToDetailPage(post.id)" />
    </div>

    <div class="review-header">
      <div class="review-tabs">
        <CommunityTabs v-model:activeKey="activeKey" />
      </div>
      <button v-if="isLoggedIn" class="new-post-button" @click="goToWritePage">리뷰 작성</button>
    </div>

    <div class="review-container">
      <div class="review-list">
        <CommunityReviewCard v-for="(review, index) in paginatedReviews" :key="index" :review="review"
          @click="goToDetailPage(review.id)" />
      </div>
    </div>

    <div class="pagination-wrapper">
      <Pagination v-model:current="currentPage" :total="filteredReviews.length" :page-size="reviewsPerPage" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.community-main {
  max-width: 1246px;
  margin: 0 auto;
}

.title-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
}

.title-icon {
  width: 40px;
  height: auto;
}

.title {
  font-size: 24px;
  font-weight: bold;
  position: relative;
  top: 20px;
}

.post-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 60px;
  justify-content: center;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1170px;
  margin: 60px auto 20px;
}

.review-container {
  max-width: 1170px;
  margin: 20px auto;
}

.review-tabs {
  flex-shrink: 0;
}

.review-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  max-width: 1170px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}

.new-post-button {
  width: 100px;
  height: 45px;
  background-color: white;
  font-size: $text-size-200;
  font-weight: bold;
  color: $secondary-color-300;
  border-radius: 10px;
  border: 1px solid $secondary-color-300;
  margin-right: 20px;

  &:hover {
    background-color: $secondary-color-300;
    color: white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
}
</style>
