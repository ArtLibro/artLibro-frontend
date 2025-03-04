<script setup lang="ts">
import type { AwardCardProps } from '@/types/peformance.types.ts'
interface AwardCardPropsWithIndex extends AwardCardProps {
  index: number
}
defineProps<AwardCardPropsWithIndex>()
</script>

<template>
  <div class="award-card">
    <div class="rank" :class="{ 'primary': index === 0 || index === 1, 'gray': index > 1 }">
      {{ index + 1 }}
    </div>
    <img :src="poster" height="205" width="153" alt="performance-image" class="image"/>
  </div>
</template>

<style scoped lang="scss">
.award-card {
  position: relative;
  display: inline-block;
}

.image {
  border-radius: 8px;
  display: block;
}

.rank {
  position: absolute;
  top: -15px;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color : white;
  font-size: 18px;
  font-weight: bold;
  width: 38px;
  height: 38px;
  border-radius: 5px;
}

.primary {
  background-color: $primary-color-100;
}

.gray {
  background-color: #C5C5C5;
}
</style>
