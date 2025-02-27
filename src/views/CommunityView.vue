<script setup lang="ts">
import CommunityMainCard from '@/components/CommunityView/CommunityMainCard.vue'
import CommunityReviewCard from '@/components/CommunityView/CommunityReviewCard.vue'

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
]

// 리뷰 카드 더미데이터
const reviews = [
  {
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
</script>

<template>
  <div class="community-main">
    <h2 class="title">커뮤니티</h2>

    <div class="post-grid">
      <CommunityMainCard v-for="(post, index) in posts" :key="index" :post="post" />
    </div>
    <div class="review-list">
      <CommunityReviewCard v-for="(review, index) in reviews" :key="index" :review="review" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.community-main {
  max-width: 1246px;
  margin: 0 auto;
  padding: 100px;

  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .post-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 65px;
  }

  .review-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
  }
}
</style>
