<script setup lang="ts">
import Pagination from '@/components/common/Pagination.vue'
import CommunityMainCard from '@/components/CommunityView/CommunityMainCard.vue'
import CommunityReviewCard from '@/components/CommunityView/CommunityReviewCard.vue'
import CommunityTabs from '@/components/CommunityView/CommunityTabs.vue'
import { computed, ref } from 'vue'

// 메인 카드 더미데이터
const posts = [
  {
    title: '모던 자바스크립트 Deep Dive',
    date: '2025.02.24',
    author: '박새힘',
    comment: 101,
    likes: 202,
    image: '/images/book-dummy.jpg',
  },
  {
    title: '모던 자바스크립트 Deep Dive',
    date: '2025.02.24',
    author: '박새힘',
    comment: 101,
    likes: 202,
    image: '/images/book-dummy.jpg',
  },
  {
    title: '모던 자바스크립트 Deep Dive',
    date: '2025.02.24',
    author: '박새힘',
    comment: 101,
    likes: 202,
    image: '/images/book-dummy.jpg',
  },
  {
    title: '모던 자바스크립트 Deep Dive',
    date: '2025.02.24',
    author: '박새힘',
    comment: 101,
    likes: 202,
    image: '/images/book-dummy.jpg',
  },
  {
    title: '모던 자바스크립트 Deep Dive',
    date: '2025.02.24',
    author: '박새힘',
    comment: 101,
    likes: 202,
    image: '/images/book-dummy.jpg',
  },
  {
    title: '모던 자바스크립트 Deep Dive',
    date: '2025.02.24',
    author: '박새힘',
    comment: 101,
    likes: 202,
    image: '/images/book-dummy.jpg',
  },
]

// 리뷰 카드 더미데이터
const reviews = [
  {
    category: '전체',
    user: 'Choi',
    time: '15시간 전',
    content:
      '과학과 철학이 절묘하게 결합된 소설. 개미들의 시점에서 본 세상이 흥미로웠으며, 인간 사회를 돌아보게 만드는 메시지가 인상적이었습니다.',
    title: "베르나르 베르베르의 '개미' 리뷰",
    likes: 21,
    comments: 4,
    image: '/images/book-dummy.jpg',
    avatar: '/images/user-dummy.png',
  },
  {
    category: '공연/행사',
    user: 'Choi',
    time: '15시간 전',
    content:
      '과학과 철학이 절묘하게 결합된 소설. 개미들의 시점에서 본 세상이 흥미로웠으며, 인간 사회를 돌아보게 만드는 메시지가 인상적이었습니다.',
    title: "연극 '물 고양이' 리뷰",
    likes: 21,
    comments: 4,
    image: '/images/book-dummy.jpg',
    avatar: '/images/user-dummy.png',
  },
  {
    category: '전체',
    user: 'Choi',
    time: '15시간 전',
    content:
      '과학과 철학이 절묘하게 결합된 소설. 개미들의 시점에서 본 세상이 흥미로웠으며, 인간 사회를 돌아보게 만드는 메시지가 인상적이었습니다.',
    title: "베르나르 베르베르의 '개미' 리뷰",
    likes: 21,
    comments: 4,
    image: '/images/book-dummy.jpg',
    avatar: '/images/user-dummy.png',
  },
  {
    category: '전체',
    user: 'Choi',
    time: '15시간 전',
    content:
      '과학과 철학이 절묘하게 결합된 소설. 개미들의 시점에서 본 세상이 흥미로웠으며, 인간 사회를 돌아보게 만드는 메시지가 인상적이었습니다.',
    title: "베르나르 베르베르의 '개미' 리뷰",
    likes: 21,
    comments: 4,
    image: '/images/book-dummy.jpg',
    avatar: '/images/user-dummy.png',
  },
]

// 커뮤니티 탭 기본값 설정
const activeKey = ref('1')

const filteredReviews = computed(() => {
  if (activeKey.value === '1') return reviews

  return reviews.filter((review) => {
    if (!review.category) return false
    return (
      (activeKey.value === '2' && review.category === '도서') ||
      (activeKey.value === '3' && review.category === '공연')
    )
  })
})
</script>

<template>
  <div class="community-main">
    <div class="title-wrapper">
      <img class="title-icon" src="/icons/title-point.svg" />
      <h2 class="title">커뮤니티</h2>
    </div>

    <div class="post-grid">
      <CommunityMainCard v-for="(post, index) in posts" :key="index" :post="post" />
    </div>
    <div class="review-container">
      <div class="review-tabs">
        <CommunityTabs v-model:activeKey="activeKey" />
      </div>
      <div class="review-list">
        <CommunityReviewCard
          v-for="(review, index) in filteredReviews"
          :key="index"
          :review="review"
        />
      </div>
    </div>
    <div class="pagination-wrapper">
      <Pagination />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.community-main {
  max-width: 1246px;
  margin: 0 auto;

  .title-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .title-icon {
    width: 40px;
    height: auto;
  }

  .title {
    font-size: $text-size-500;
    font-weight: bold;
    position: relative;
    top: 20px;
  }

  .post-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 35px;
    margin-top: 60px;
    justify-content: center;
  }

  .review-container {
    max-width: 1170px;
    margin: 40px auto;
  }

  .review-tabs {
    flex: 0 0 200px;
  }

  .review-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .pagination-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
  }
}
</style>
