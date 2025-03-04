<script setup lang="ts">
import { getAwardPerformances } from '@/apis/kopis.ts'
import { ref, onMounted } from 'vue'
import type { AwardCardProps } from '@/types/peformance.types.ts'
import AwardCardActive from '@/components/HomeView/AwardCardActive.vue'
import AwardCardDefault from '@/components/HomeView/AwardCardDefault.vue'

const currentIndex = ref<number>(0);
const awardPerformances = ref<AwardCardProps[]>([]);

const handleRight = () => {
  if (currentIndex.value < awardPerformances.value.length - 1) {
    currentIndex.value += 1;
  }
};

const handleLeft = () => {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1;
  }
};

onMounted(async () => {
  try {
    const data = await getAwardPerformances();
    awardPerformances.value = data.db;
  } catch (error) {
    console.error('API 요청 실패:', error);
  }
});
</script>

<template>
  <div class="award-layout">
    <div class="title">수상을 받은 공연을 만나보세요</div>
    <div class="content">
      <button @click="handleLeft">◀</button>
      <div v-for="(item, index) in awardPerformances" :key="index">
        <AwardCardActive
          v-show="index === currentIndex"
          :index="index"
          :prfnm="item.prfnm"
          :poster="item.poster"
          :mt20id="item.mt20id"
          :fcltynm="item.fcltynm"
        />
        <AwardCardDefault
          v-show="index !== currentIndex"
          :index="index"
          :prfnm="item.prfnm"
          :poster="item.poster"
          :mt20id="item.mt20id"
          :fcltynm="item.fcltynm"
        />
      </div>
      <button @click="handleRight">▶</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.award-layout {
  width: 1246px;
  height: 352px;
  margin-top: 50px;
}

.title {
  color: $text-color-500;
  font-size: 24px;
  font-weight: bold;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
</style>
