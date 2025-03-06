<template>
  <div class="keyword_container">
    <h2>이 달의 키워드</h2>
    <small>{{ searchedMonth }} 기준</small>
    <div class="keyword_badge_container">
      <div class="badge" v-for="badge in monthKeywordList" :key="badge.keyword.word">
        <span># {{ badge.keyword.word }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getMonthKeyword } from '@/apis/books';
import type { MonthKeyword } from '@/types/libraryType';
import { onMounted, ref } from 'vue';

const monthKeywordList = ref<MonthKeyword[]>([]);
const searchedMonth = ref<string>('');

onMounted(async () => {
  try {
    const response = await getMonthKeyword();
    monthKeywordList.value = response.keywords.slice(0, 25);
    searchedMonth.value = response.request.month;
  } catch (error) {
    console.error(error);
    throw error;
  }
})
</script>

<style lang="scss" scoped>
.keyword_container {
  width: 100%;
  margin-bottom: 76px;

  h2 {
    font-size: $text-title-300;
    font-weight: bold;
    margin-bottom: 24px;
    display: inline-block;
  }

  small {
    display: inline-block;
    margin-left: 1rem;
    color: $text-color-300;
  }

  .keyword_badge_container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    .badge {
      display: inline-block;
      border-radius: 30px;
      border: 1px solid #d3d0cb;
      padding: 0.5rem 1rem;
      color: #61605d;
    }
  }
}
</style>
