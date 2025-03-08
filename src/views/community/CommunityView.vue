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
  <!-- ✅ .body-layout 내부에서 직접 적용 -->
  <div class="community-page">
    <!-- ✅ 타이틀과 아이콘은 항상 유지 -->
    <div class="title-wrapper">
      <img class="title-icon" src="/icons/title-point.svg" />
      <h2 class="title">커뮤니티</h2>
    </div>

    <div v-if="latestMainPosts.length > 0" class="post-grid">
      <CommunityMainCard
        v-for="(post, index) in latestMainPosts"
        :key="index"
        :post="post"
        @click="goToDetailPage(post.id)"
      />
    </div>
    <div v-else class="empty-message-main">
      <img src="/icons/best-comment.svg" alt="arrow-right" />
      <p>베스트 글이 없습니다.</p>
    </div>
    <div class="divider"></div>

    <!-- ✅ 탭과 "리뷰 작성" 버튼은 항상 유지 -->
    <div class="review-header">
      <div class="review-tabs">
        <CommunityTabs v-model:activeKey="activeKey" />
      </div>
      <button v-if="isLoggedIn" class="new-post-button" @click="goToWritePage">리뷰 작성</button>
    </div>

    <!-- ✅ 리뷰 리스트 -->
    <div v-if="paginatedReviews.length > 0" class="review-container">
      <div class="review-list">
        <CommunityReviewCard
          v-for="(review, index) in paginatedReviews"
          :key="index"
          :review="review"
          @click="goToDetailPage(review.id)"
        />
      </div>
    </div>
    <div v-else class="empty-message-review">
      <p>🔎 첫 리뷰를 남겨보세요!</p>
    </div>

    <!-- ✅ 페이지네이션 -->
    <div class="pagination-wrapper">
      <Pagination
        v-model:current="currentPage"
        :total="filteredReviews.length"
        :page-size="reviewsPerPage"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* ✅ .body-layout 내부에서 직접 스타일 적용 */
.community-page {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* ✅ 왼쪽 정렬 */
  width: 100%;
  max-width: 1246px;
  min-height: 80vh; /* ✅ 최소 높이 설정 */
}

/* ✅ 타이틀(제목)과 아이콘 */
.title-wrapper {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
}

.title-icon {
  width: 40px;
  height: auto;
  margin-left: 10px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-top: 30px;
}

/* ✅ 게시글 목록 */
.post-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* ✅ 유동적인 카드 배치 */
  gap: 30px;
  margin-top: 40px;
  justify-content: center; /* ✅ 가운데 정렬 */
  align-items: start; /* ✅ 상단 정렬 */
  width: 100%;
  max-width: 1050px; /* ✅ 카드 전체 너비 설정 */
  margin-left: auto;
  margin-right: auto;
}

/* ✅ 구분선 스타일 */
.divider {
  width: 100%;
  height: 0.7px;
  background-color: #d9d9d9; /* ✅ 구분선 색상 */
  margin-top: 50px; /* ✅ 구분선과 탭 사이 간격 */
  margin-bottom: 50px;
}

/* ✅ 탭과 "리뷰 작성" 버튼 */
.review-header {
  display: flex;
  justify-content: space-between; /* ✅ 왼쪽 정렬 */
  align-items: center;
  width: 100%;
}

/* ✅ 리뷰 목록 */
.review-container {
  width: 100%;
  display: flex; /* ✅ flex 적용 */
  justify-content: center; /* ✅ 가로 중앙 정렬 */
  align-items: center; /* ✅ 세로 중앙 정렬 */
  min-height: 240px; /* ✅ 최소 높이 설정 */
}

.review-tabs {
  flex-shrink: 0;
  margin-left: 20px;
}

.review-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ✅ 페이지네이션 */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 50px;
  width: 100%;
  min-height: 50px; /* ✅ 최소 높이 설정 */
}

/* ✅ "리뷰 작성" 버튼 */
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

/* ✅ 게시글이 없을 때 메시지 */
.empty-message-main {
  text-align: center;
  color: $text-color-500;
  font-size: 21px;
  font-weight: bold;
  margin: 100px 0;
  align-self: center; /* ✅ 부모가 flex일 때 가운데 정렬 */

  img {
    display: block;
    margin: 0 auto;
    transform: translateX(-20px); /* ✅ 왼쪽으로 20px 이동 */
    margin-bottom: 10px;
  }
}

.empty-message-review {
  min-height: 400px;
  text-align: center;
  color: $text-color-500;
  font-size: 21px;
  font-weight: bold;
  margin: auto; /* ✅ 자동으로 가운데 정렬 */
  align-self: center; /* ✅ 부모가 flex일 때 가운데 정렬 */

  p {
    margin-top: 180px; /* ✅ 메시지를 더 아래로 이동 */
  }
}
</style>
