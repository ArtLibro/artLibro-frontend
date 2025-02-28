<script lang="ts" setup>
import { ref } from 'vue'

const current = ref(1)
</script>

<template>
  <a-pagination v-model:current="current" :total="50" show-less-items />
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
