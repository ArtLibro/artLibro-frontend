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
      <div>{{ index + 1 }}</div>
      <div>{{ prfnm }}</div>
      <div>{{ fcltynm }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.image {
  border-radius: 8px;
}

.active-layout {
  display: flex;
  width: 524px;
}

.performance-info {
  display: grid;
}
</style>
