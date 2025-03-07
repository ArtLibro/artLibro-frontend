<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const authStore = useAuthStore()
const userFullName = computed(() => authStore.fullName || '사용자')
</script>

<template>
  <div class="header">
    <div class="header-container">
      <RouterLink to="/" class="router-link">
        <img src="/icons/art-libro.svg" width="140" height="50" alt="ArtLibro" />
      </RouterLink>
      <div class="router-container">
        <RouterLink to="/book" class="router-link">도서</RouterLink>
        <img src="/icons/divider.svg" width="24" height="24" alt="Divider" />
        <RouterLink to="/library/search" class="router-link">도서관</RouterLink>
        <img src="/icons/divider.svg" width="24" height="24" alt="Divider" />
        <RouterLink to="/performance" class="router-link">공연/행사</RouterLink>
        <img src="/icons/divider.svg" width="24" height="24" alt="Divider" />
        <RouterLink to="/challenge" class="router-link">문화챌린지</RouterLink>
        <img src="/icons/divider.svg" width="24" height="24" alt="Divider" />
        <RouterLink to="/community" class="router-link">커뮤니티</RouterLink>
        <img src="/icons/divider.svg" width="24" height="24" alt="Divider" />
        <!-- PF151901   PF132236-->
        <RouterLink to="/performance/PF132236" class="router-link">임시 디테일</RouterLink>
      </div>
    </div>

    <div class="router-container">
      <!-- 로그인 했을 때 -->
      <template v-if="authStore.token">
        <span class="user-info"> 환영합니다, {{ userFullName }}님! 🎉 </span>
        <button class="logout" @click="authStore.logout">로그아웃</button>
      </template>
      <template v-else>
        <RouterLink to="/login" class="login">로그인</RouterLink>
        <RouterLink to="/register" class="register">회원가입</RouterLink>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1246px;
  height: 64px;
  border-bottom: #eaeaea solid 1px;
}

a,
a:link,
a:visited {
  text-decoration: none;
  color: inherit;
}

.header-container {
  display: flex;
  align-items: center;
}

.router-container {
  display: flex;
  gap: 16px;
  margin-left: 60px;
}

.router-link {
  font-size: 20px;
  font-weight: bold;
}

.login {
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register {
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff !important;
  background-color: #6472fc;
  height: 29px;
  width: 90px;
  border-radius: 999px;
}
</style>
