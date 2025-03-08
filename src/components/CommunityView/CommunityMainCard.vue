<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps<{
  post: {
    id: string
    title: string
    image: string
    date: string
    authorName: string
    comment: number
    likes: number
  }
}>()

// 기본 이미지 경로
const defaultBookImage = '/public/images/community-no-image.png'

// 책 이미지가 없으면 기본 이미지 사용
const bookImage = computed(() => (props.post.image ? props.post.image : defaultBookImage))

// 현재 이미지가 기본 이미지인지 체크
const isDefaultImage = computed(() => bookImage.value === defaultBookImage)

// 댓글 개수 상태
const commentCount = ref(0)

// 로컬 스토리지에서 댓글 개수 가져오는 함수
const getCommentCount = (postId: string): number => {
  const savedComments = localStorage.getItem(`comments_${postId}`)
  return savedComments ? JSON.parse(savedComments).length : 0
}

// 페이지 로드될 때 댓글 개수 불러오기
onMounted(() => {
  commentCount.value = getCommentCount(props.post.id)
})

const goToDetail = () => {
  router.push(`/community/${props.post.id}`)
}
</script>

<template>
  <div class="post-card" @click="goToDetail">
    <div class="post-info">
      <h3 class="post-title">{{ post.title }}</h3>
      <div class="divider"></div>
      <p class="post-date">{{ post.date }}</p>
      <div class="post-meta">
        <p>
          작성자 <span>{{ post.authorName }}</span>
        </p>
        <div class="post-meta-detail">
          <p>
            좋아요 <span>{{ post.likes }}</span>
          </p>
          <p>
            댓글수 <span>{{ commentCount }}</span>
          </p>
        </div>
      </div>
    </div>
    <img
      :src="bookImage"
      :class="{ 'post-image': true, 'default-image': isDefaultImage }"
      alt="책표지"
    />
    <div class="new-post-badge">New</div>
  </div>
</template>

<style lang="scss" scoped>
.post-card {
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.02);
  }
  width: 330px;
  height: 230px;
  background: white;
  color: $text-color-500;
  padding: 15px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 0px;
  margin-bottom: 10px;
  border: 3px solid #d4d8ff;
  border-radius: 10px;
  box-shadow: 0px 5px 10px #eaecff;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  .post-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .post-title {
    font-size: 24px;
    margin-top: 10px;
    min-height: 56px;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 웹킷 브라우저용 (Chrome, Safari 등) */
    line-clamp: 2; /* 표준 속성 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
  }

  .post-date {
    font-size: 14px;
    color: $text-color-300;
  }

  .divider {
    width: 70%;
    height: 1px;
    background: $text-color-200;
    margin-top: 40px;
    margin-bottom: 10px;
  }

  .post-meta {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    margin-top: auto;
    padding-bottom: 10px;
    color: $text-color-300;

    p {
      display: flex;
      align-items: center;
      gap: 10px;

      margin-bottom: 0;
    }
  }

  .post-meta-detail {
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: auto;
    padding-bottom: 10px;
    color: $text-color-300;

    p {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-bottom: 0;
      white-space: nowrap;
    }
  }

  .post-image {
    width: 80px;
    height: 120px;
    position: absolute;
    bottom: 13px;
    right: 15px;
    box-shadow: 0px 1px 4px $text-color-300;
  }

  // 기본 이미지일 때 크기 조절
  .default-image {
    padding: 35px 20px;
  }

  .new-post-badge {
    width: 45px;
    height: 23px;
    position: absolute;
    top: 0;
    right: 0;
    background: $secondary-color-100;
    color: $text-color-600;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 10px;
  }
}
</style>
