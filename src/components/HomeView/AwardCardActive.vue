<script setup lang="ts">
import type { AwardCardProps } from '@/types/peformance.types.ts'
interface AwardCardPropsWithIndex extends AwardCardProps {
  index: number
}
defineProps<AwardCardPropsWithIndex>()
</script>

<template>
  <div class="active-layout">
    <img :src="poster" height="323" width="240" alt="performance-image" class="image"/>
    <div class="performance-info">
      <div class="rank" :class="{ 'primary': index === 0 || index === 1, 'gray': index > 1 }">
        {{ index + 1 }}
      </div>
      <div class="performance-title">{{ prfnm }}</div>
      <div class="performance-place"># {{ fcltynm }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.image {
  border-radius: 8px;
}

.active-layout {
  display: flex;
  width: 450px;
}

.performance-info {
  display: grid;
  margin-left: 20px;
  height: 175px;
  gap : 5px;
}

.rank {
  display: flex;
  align-items: center;
  justify-content: center;
  color : white;
  font-size: 24px;
  font-weight: bold;
  width: 42px;
  height: 42px;
  border-bottom-left-radius: 15px;
  border-top-right-radius: 15px;
}

.performance-title {
  font-size : 36px;
  font-weight : bold;
  color : $text-color-600;
}

.primary {
  background-color: $primary-color-100;
}

.gray {
  background-color: #C5C5C5;
}

.performance-place {
  font-size : 20px;
  color : #3647FF;
}
</style>
