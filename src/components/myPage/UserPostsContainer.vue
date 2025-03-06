<template>
  <div class="user-posts-container">
    <h3>작성한 게시글</h3>
    <div class="user-posts-contents">
      <div class="user-posts-content" v-for="post in postList" :key="post.id">
        <div class="posts-header">
          <strong>{{ post.title }}</strong>
          <span>{{ post.category }}</span>
        </div>
        <p>{{ post.content }}</p>
      </div>
      <p class="user-posts-more" v-if="parsedPosts.length > 4">모든 글 보기</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '@/types/community/communityType';
import { usePostParser } from '@/utils/usePostParser';
import { computed } from 'vue';

const props = defineProps<{
  postData: Post[]
}>()

const { parsedPosts } = usePostParser(props.postData)

const postList = computed(() => {
  if (parsedPosts.value.length >= 4) {
    return parsedPosts.value.slice(0, 4);
  }
  return parsedPosts.value;
});
</script>

<style lang="scss" scoped>
.user-posts-container {
  h3 {
    font-size: 14px;
    color: #222;
    margin-bottom: 1rem;
    font-weight: 500;
  }

  .user-posts-contents {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .user-posts-content {
      width: 100%;
      padding: 10px 13px;
      border-radius: 10px;
      border: 1px solid rgba(0, 0, 0, 0.15);
      box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);

      .posts-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        strong {
          color: #413B89;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 80%;
        }

        span {
          font-size: 14px;
        }
      }

      p {
        font-size: 14px;
        color: #49454F;
        line-height: 18px;
        letter-spacing: 0.1px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }

    }
  }

  .user-posts-more {
    font-size: 12px;
    color: rgba(193, 11, 14, .8);
    text-align: left;
    cursor: pointer;
  }
}
</style>
