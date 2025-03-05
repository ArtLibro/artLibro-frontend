<script setup lang="ts">
import LibrarySearchHeroImage from '@/components/LibrarySearchView/LibrarySearchHeroImage.vue'
import LibraryFilter from '@/components/LibrarySearchView/LibraryFilter.vue'
import LibrarySearchResult from '@/components/LibrarySearchView/LibrarySearchResult.vue'
import { provide, ref } from 'vue'
const regionCode = ref(11);

const updateRegion = (code : number) => {
  if (regionCode.value === code) {
    return
  }
  regionCode.value = code
}

provide('region',{
  regionCode,
  updateRegion
})
</script>

<template>
  <LibrarySearchHeroImage/>
  <div class="library-content-wrapper">
    <LibraryFilter/>
    <LibrarySearchResult/>
  </div>
</template>

<style scoped lang="scss">
.library-content-wrapper {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
}
</style>
