<script setup lang="ts">
import type { AwardCardProps } from '@/types/peformance.types.ts'
interface AwardCardPropsWithIndex extends AwardCardProps {
  index: number
}
defineProps<AwardCardPropsWithIndex>()
</script>

<template>
  <div>
    <div>{{ index+1 }}</div>
    <img :src="poster" height="205" width="153" alt="performance-image" class="image"/>
  </div>
</template>

<style scoped lang="scss">
.image {
  border-radius: 8px;
}
</style>
