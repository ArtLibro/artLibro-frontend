<script setup lang="ts">

import MapFilter from '@/components/LibrarySearchView/MapFilter.vue'
</script>

<template>
  <div class="filter-layout">
    <MapFilter/>
  </div>
</template>

<style scoped lang="scss">
.filter-layout {
  display: grid;
  justify-items: center;
  height : 1120px;
  width: 291px;
  border-radius: 10px;
  background-color: $text-color-100;
}
</style>
