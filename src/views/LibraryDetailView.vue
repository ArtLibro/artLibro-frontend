<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getLibraryInfoByLibraryCode, getLibraryPopularBooks } from '@/apis/books.ts'
import type {
  LibraryResult,
  Libraries,
  LibraryPopularBooksType
} from '@/types/library/library.types.ts'
import HomeBookItem from '@/components/common/HomeBookItem.vue'
import LibraryInfo from '@/components/LibraryDetailView/LibraryInfo.vue'
import PopularBook from '@/components/LibraryDetailView/PopularBook.vue'

const route = useRoute();
const libId = Number(route.params.id);
const libraryData = ref<Libraries>();
const popularBooks = ref<LibraryPopularBooksType>();

onMounted(async () => {
  try {
    const data : LibraryResult = await getLibraryInfoByLibraryCode(libId);
    libraryData.value = data.libs[0];
    console.log(data.libs[0]);
    const books : LibraryPopularBooksType = await getLibraryPopularBooks(libId);
    console.log(books);
    popularBooks.value = books;
  } catch (error) {
    console.error('API 요청 실패:', error);
  }
});
</script>

<template>
  <div class="library-detail">
    <h1>도서관 상세 정보</h1>
    <div v-if="libraryData">
      <LibraryInfo
        :lib-name="libraryData.lib.libInfo.libName"
        :homepage="libraryData.lib.libInfo.homepage"
        :address="libraryData.lib.libInfo.address"
        :fax="libraryData.lib.libInfo.fax"
        :closed="libraryData.lib.libInfo.closed"
        :operating-time="libraryData.lib.libInfo.operatingTime"
        :tel="libraryData.lib.libInfo.tel"
      />
      <PopularBook/>
    </div>
    <div v-else>
      로딩중...
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
