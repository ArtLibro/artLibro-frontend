<script setup lang="ts">
import PerformanceCard from '@/components/common/PerformanceCard.vue'
import { getMonthlyPerformances } from '@/apis/kopis.ts'
import { onMounted, ref } from 'vue'
import type { PerformanceCardProps } from '@/types/peformance.types.ts'

const awardPerformances = ref<PerformanceCardProps[]>([]);

onMounted(async () => {
  try {
    const data = await getMonthlyPerformances();
    awardPerformances.value = data.boxof.slice(0,3); // TODO 카테고리별로 정리 필요
  } catch (error) {
    console.error('API 요청 실패:', error);
  }
});
</script>

<template>
  <div>
    <div class="title">이달의 TOP3 공연/행사</div>
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
</style>
