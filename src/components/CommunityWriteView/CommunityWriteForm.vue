<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import type { UploadProps } from 'ant-design-vue'
import type { NewPost, Post } from '@/types/community/communityType'
import { createPost, fetchPosts, updatePost } from '@/apis/community/post'

const props = defineProps<{ existingPost?: Post }>()
const emit = defineEmits(['postCreated', 'postUpdated'])

const categories = ['도서', '공연/행사']
const selectedCategory = ref(props.existingPost?.category || '도서')
const title = ref(props.existingPost?.title || '')
const content = ref(props.existingPost?.content || '')
const fileList = ref<UploadProps['fileList']>([])

// 기존 이미지가 있다면 표시
if (props.existingPost?.image) {
  fileList.value = [
    {
      uid: '-1',
      name: '기존 이미지',
      status: 'done',
      url: props.existingPost.image,
    },
  ]
}

const handleFileChange: UploadProps['onChange'] = (info) => {
  fileList.value = info.fileList
}

const handleSubmit = async () => {
  const imageFile = fileList.value?.[0]?.originFileObj ?? null

  if (props.existingPost) {
    // 기존 게시글이 있으면 수정
    const updatedPost: Post = {
      id: props.existingPost.id,
      category: selectedCategory.value,
      title: title.value,
      content: content.value,
      image: props.existingPost.image || null,
      createdAt: props.existingPost.createdAt || '',
    }

    await updatePost(props.existingPost.id, updatedPost, imageFile)

    emit('postUpdated', updatedPost, imageFile)
  } else {
    // 없으면 새로운 게시글 작성
    const postData: NewPost = {
      category: selectedCategory.value,
      title: title.value,
      content: content.value,
    }

    await createPost(postData, imageFile)

    emit('postCreated')
  }

  await fetchPosts() // 최신 데이터 반영
  alert(props.existingPost ? '🎉 게시글이 수정되었습니다!' : '🎉 게시글이 등록되었습니다!')
}
</script>

<template>
  <div class="post-form-container">
    <h2 class="form-title">{{ existingPost ? '📝 게시글 수정' : '✏️ 게시글 쓰기' }}</h2>

    <a-card class="form-card">
      <a-form layout="vertical">
        <a-form-item label="카테고리">
          <a-select v-model:value="selectedCategory">
            <a-select-option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="제목">
          <a-input v-model:value="title" placeholder="제목을 입력해 주세요" />
        </a-form-item>

        <a-form-item label="내용">
          <a-textarea v-model:value="content" placeholder="내용을 입력해 주세요" :rows="10" />
        </a-form-item>

        <a-form-item label="사진 업로드 (선택)">
          <a-upload
            v-model:file-list="fileList"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            list-type="picture"
            :before-upload="() => false"
            @change="handleFileChange"
          >
            <a-button>
              <upload-outlined />
              파일 선택
            </a-button>
          </a-upload>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" block @click="handleSubmit">
            {{ existingPost ? '수정 완료' : '작성 완료' }}
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<style lang="scss" scoped>
.post-form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;

  .form-title {
    font-size: $text-size-500;
    font-weight: bold;
    margin-bottom: 20px;
    align-self: flex-start;
    text-align: left;
    width: 100%;
  }

  .form-card {
    width: 900px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

    :deep(.ant-form) {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    /* 마지막 버튼과 마지막 폼 요소 간 간격 */
    :deep(.ant-form-item:last-child) {
      margin-top: 24px;
    }
  }

  /* 업로드한 파일 간격 */
  :deep(.ant-upload-list-item) {
    width: auto;
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  /* 작성완료 버튼 스타일 */
  :deep(.ant-btn-primary) {
    background-color: $secondary-color-300 !important;
    border-radius: 8px;
    height: 45px;
    font-size: 16px;
    font-weight: bold;
  }

  /* 각 label 폰트 설정 */
  :deep(.ant-form-item-label > label) {
    font-size: $text-size-300 !important;
    font-weight: bold;
  }

  /* input창 설정 */
  :deep(.ant-input) {
    padding: 10px 10px;
    font-size: $text-size-200;
  }

  /* 파일선택 버튼 설정 */
  :deep(.ant-upload) {
    font-size: 16px;
    border-radius: 8px;
  }

  :deep(.ant-btn) {
    padding: 8px 15px;
    font-size: 16px;
    height: 40px;
    border-radius: 8px;
  }

  /* 업로드한 파일 리스트 설정 */
  :deep(.ant-upload-list-item) {
    margin-top: 10px; // 업로드한 파일과 버튼에 간격 추가
  }
}
</style>
