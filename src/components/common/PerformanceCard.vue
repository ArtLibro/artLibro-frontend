<script setup lang="ts">
import type { PerformanceCardProps } from '@/types/peformance.types.ts'

defineProps<PerformanceCardProps>()
</script>

<template>
  <div class="card-layout">
    <img :src="poster" width="300" height="350" alt="performance-image" class="image"/>
    <div class="title">{{ cate }}</div>
    <div class="subtitle">{{ prfnm }}</div>
    <div class="date">
      <img src="/icons/main-calendar.svg" width="24" height="24" alt="calendar-icon"/>
      {{ prfpd }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-layout {
  display: grid;
  height: 450px;
  width: 300px;
}

.title {
  color: #ea5313;
  font-weight: bold;
  font-size: 17px;
  margin-top: 10px;
}

.subtitle {
  color: $text-color-500;
  font-weight: bold;
  font-size: 20px;
}

.date {
  display: flex;
  gap: 8px;
  color: $text-color-500;
  background-color: $primary-color-100;
  height: 32px;
  width: 249px;
  font-size: 18px;
  align-items: center;
  justify-content: center;
  border-radius: 51px;
  margin-top: 10px;
}

.image {
  border-radius: 12px;
}
</style>
