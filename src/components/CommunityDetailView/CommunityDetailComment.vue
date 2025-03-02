<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/ko' // 한국어 로케일 추가
import { LikeFilled, LikeOutlined } from '@ant-design/icons-vue'

dayjs.extend(relativeTime)
dayjs.extend(utc) // UTC 플러그인 추가
dayjs.extend(timezone) // 타임존 플러그인 추가
dayjs.locale('ko') // 한국어로 설정
dayjs.tz.setDefault('Asia/Seoul') // 기본 타임존을 한국(KST)으로 설정

type Comment = {
  author: string
  avatar: string
  content: string
  datetime: string
  likes: number
  action: string | null
}

const comments = ref<Comment[]>([])
const submitting = ref<boolean>(false)
const value = ref<string>('')

const handleSubmit = () => {
  if (!value.value) return

  submitting.value = true

  setTimeout(() => {
    submitting.value = false
    comments.value = [
      {
        author: '홍길동',
        avatar: '/images/user-dummy.png',
        content: value.value,
        datetime: dayjs().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss'), // 한국 시간 적용
        likes: 0,
        action: null,
      },
      ...comments.value,
    ]
    value.value = ''
  }, 1000)
}

const likeComment = (comment: Comment) => {
  comment.likes = 1
  comment.action = 'liked'
}
</script>

<template>
  <div class="comments-container">
    <div class="comment-title">댓글</div>
    <a-comment>
      <template #avatar>
        <a-avatar src="/images/user-dummy.png" alt="User Avatar" />
      </template>
      <template #content>
        <a-form-item>
          <a-textarea v-model:value="value" :rows="4" placeholder="댓글을 입력하세요." />
        </a-form-item>
        <a-form-item class="comment-submit">
          <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
            댓글 작성
          </a-button>
        </a-form-item>
      </template>
    </a-comment>

    <a-list v-if="comments.length" :data-source="comments" item-layout="horizontal">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-comment :author="item.author" :avatar="item.avatar" :content="item.content">
            <template #datetime>
              <a-tooltip
                :title="dayjs(item.datetime).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')"
              >
                <span>{{ dayjs(item.datetime).tz('Asia/Seoul').locale('ko').fromNow() }}</span>
              </a-tooltip>
            </template>
            <template #actions>
              <span>
                <a-tooltip title="Like">
                  <template v-if="item.action === 'liked'">
                    <LikeFilled @click="likeComment(item)" />
                  </template>
                  <template v-else>
                    <LikeOutlined @click="likeComment(item)" />
                  </template>
                </a-tooltip>
                <span style="padding-left: 8px; cursor: auto">{{ item.likes }}</span>
              </span>
            </template>
          </a-comment>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<style lang="scss" scoped>
.comments-container {
  width: 90%;
  max-width: 800px;
  margin-left: 50px;
  flex-grow: 1;
}

a-list-item {
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 10px;
}

:deep(.ant-btn-primary) {
  background-color: $secondary-color-300 !important;
  color: white !important;
  border-radius: 999px;
}

.comment-title {
  font-size: $text-size-400;
  font-weight: bold;
  margin: 0;
  padding-bottom: 5px;
}

.comment-submit {
  display: flex;
  justify-content: flex-end;
}
</style>
