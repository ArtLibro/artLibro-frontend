import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import CommunityView from '@/views/CommunityView.vue'
import BookView from '@/views/BookView.vue'
import LibraryView from '@/views/LibraryView.vue'
import PerformanceView from '@/views/PerformanceView.vue'
import ChallengeView from '@/views/ChallengeView.vue'
import PerformanceSearchView from '@/views/PerformanceSearchView.vue'
import CommunityDetailView from '@/views/CommunityDetailView.vue'
import CommunityWrite from '@/views/CommunityWrite.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/book',
      name: 'book',
      component: BookView,
    },
    {
      path: '/library',
      name: 'library',
      component: LibraryView,
    },
    {
      path: '/performance',
      name: 'performancesearch',
      component: PerformanceSearchView,
    },
    {
      path: '/challenge',
      name: 'challenge',
      component: ChallengeView,
    },
    {
      path: '/community',
      name: 'community',
      component: CommunityView,
    },

    // UI 확인용 임시 경로 -> 수정 예정
    {
      path: '/communityDetail',
      name: 'communityDetail',
      component: CommunityDetailView,
    },
    // UI 확인용 임시 경로 -> 수정 예정
    {
      path: '/community-write',
      name: 'community-write',
      component: CommunityWrite,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/book',
      name: 'book',
      component: BookView,
    },
  ],
})

export default router
