<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{ current: number; total: number; pageSize: number }>()
const emit = defineEmits(['update:current'])

const handlePageChange = (page: number) => {
  emit('update:current', page)

  // CommunityTabs쪽으로 스크롤 이동
  const communityTabs = document.querySelector('#community-tabs')
  if (communityTabs) {
    communityTabs.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <a-pagination
    :current="props.current"
    :total="props.total"
    :page-size="props.pageSize"
    show-less-items
    @change="handlePageChange"
  />
</template>

<style lang="scss" scoped>
/* 활성화된 페이지네이션 테두리 */
:deep(.ant-pagination-item-active) {
  border-color: $secondary-color-300 !important;
}

/* 활성화된 페이지네이션 폰트 색상 */
:deep(.ant-pagination-item-active a) {
  color: $secondary-color-300 !important;
  font-weight: bold;
}
</style>
