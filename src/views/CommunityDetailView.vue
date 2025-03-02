<script setup lang="ts">
import CommunityDetailComment from '@/components/CommunityDetailView/CommunityDetailComment.vue'
import CommunityDetailContent from '@/components/CommunityDetailView/CommunityDetailContent.vue'
import CommunityDetailNextPost from '@/components/CommunityDetailView/CommunityDetailNextPost.vue'
</script>

<template>
  <div class="page-container">
    <section class="background">
      <img src="/images/community-background.png" alt="배경이미지" />
    </section>

    <div class="content-wrapper">
      <div class="content-area">
        <CommunityDetailContent />
        <div class="bottom-section">
          <div class="comments-container">
            <CommunityDetailComment />
          </div>
          <div class="sidebar">
            <CommunityDetailNextPost />
          </div>
        </div>
      </div>
    </div>
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
