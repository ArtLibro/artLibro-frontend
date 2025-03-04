<script setup lang="ts">
import PerformanceCard from '@/components/common/PerformanceCard.vue'
import { getMonthlyPerformances } from '@/apis/kopis.ts'
import { onMounted, ref } from 'vue'
import type { PerformanceCardProps } from '@/types/peformance.types.ts'
import RoundCategoryTab from '@/components/Home/RoundCategoryTab.vue'

const awardPerformances = ref<PerformanceCardProps[]>([]);
const performanceCategories = ref<string[]>([
  '연극',
  '무용(서양/한국무용)',
  '대중무용',
  '서양음악(클래식)',
  '한국음악(국악)',
  '대중음악',
  '복합',
  '서커스/마술',
  '뮤지컬'
]);

onMounted(async () => {
  try {
    const data = await getMonthlyPerformances();
    awardPerformances.value = data.boxofs.boxof.slice(0,3); // TODO 카테고리별로 정리 필요
  } catch (error) {
    console.error('API 요청 실패:', error);
  }
});
</script>

<template>
  <div>
    <div class="title">이달의 TOP3 공연/행사</div>
    <div class="category-wrapper">
      <RoundCategoryTab v-for="(item, index) in performanceCategories" :name="item" :key="index+'category'" />
    </div>
    <div class="performance-wrapper">
      <PerformanceCard
        v-for="item in awardPerformances"
        :key="item.mt20id"
        :cate="item.cate"
        :mt20id="item.mt20id"
        :poster="item.poster"
        :prfnm="item.prfnm"
        :prfpd="item.prfpd"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.title {
  color : $text-color-500;
  font-size: 24px;
  font-weight: bold;
}

.performance-wrapper {
  display: flex;
  width: 1246px;
  margin-top: 30px;
  height: 450px;
  justify-content: space-around;
}

.category-wrapper {
  display: flex;
}
</style>
