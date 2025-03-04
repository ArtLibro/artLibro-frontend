<script setup lang="ts">
import { ref } from 'vue'

const posts = ref([
  { image: '/images/book-dummy.jpg' },
  { image: '/images/book-dummy.jpg' },
  { image: '/images/book-dummy.jpg' },
])
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-title">다음 게시글</div>
    <div class="next-posts">
      <div class="post-item" v-for="post in posts" :key="post.image">
        <img :src="post.image" alt="다음 게시글" />
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
}

.post-item img {
  width: 135px;
  height: 200px;
  object-fit: cover;
  margin: 20px;
}
</style>
