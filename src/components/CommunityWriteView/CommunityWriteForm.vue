<script setup lang="ts">
import { ref } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import type { UploadProps } from 'ant-design-vue'

const categories = ['도서', '공연/행사']
const selectedCategory = ref<string>('도서')
const title = ref<string>('')
const content = ref<string>('')
const fileList = ref<UploadProps['fileList']>([])

// 파일 업로드 핸들러
const handleFileChange: UploadProps['onChange'] = (info) => {
  fileList.value = info.fileList
}

const handleSubmit = () => {
  console.log('게시글 제출', {
    category: selectedCategory.value,
    title: title.value,
    content: content.value,
    files: fileList.value,
  })
}
</script>

<template>
  <div class="post-form-container">
    <h2 class="form-title">✏️ &nbsp; 게시글 쓰기</h2>

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
          <a-button type="primary" block @click="handleSubmit">작성 완료</a-button>
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
}
</style>
