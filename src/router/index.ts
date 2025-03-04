import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import CommunityView from '../views/CommunityView.vue'
import PerformanceDetailView from '@/views/PerformanceDetailView.vue'

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
      name: 'performance',
      component: PerformanceView,
    },
    {
      path: '/challenge',
      name: 'challenge',
      component: ChallengeView,
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
      path: '/community',
      name: 'community',
      component: CommunityView,
    },
    //화면 보려고 급하게 만들었습니다.
    {
      path: '/performancedetail',
      name: 'performancedetail',
      component: PerformanceDetailView,
    },
  ],
})

export default router
