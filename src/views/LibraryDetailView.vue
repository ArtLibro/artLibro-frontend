<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getLibraryInfoByLibraryCode, getLibraryPopularBooks } from '@/apis/books.ts'
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';
import type {
  LibraryResult,
  Libraries,
  LibraryPopularBooksType
} from '@/types/library/library.types.ts'
import LibraryInfo from '@/components/LibraryDetailView/LibraryInfo.vue'
import type { Book } from '@/types/libraryType.ts'
import HomeBookItem from '@/components/common/HomeBookItem.vue'

const route = useRoute();
const libId = Number(route.params.id);
const libraryData = ref<Libraries>();
const popularBooks = ref<Book[]>([]);

onMounted(async () => {
  try {
    const data : LibraryResult = await getLibraryInfoByLibraryCode(libId);
    libraryData.value = data.libs[0];
    const books : LibraryPopularBooksType = await getLibraryPopularBooks(libId);
    const arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push(books.loanBooks[i].book)
    }
    popularBooks.value = arr;
  } catch (error) {
    console.error('API 요청 실패:', error);
  }
});


</script>

<template>
  <div class="library-detail">
    <h2 class="info-title">도서관 상세 정보</h2>
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
      <div class="popular-books">
        <h2>도서관 인기 도서 TOP20</h2>
        <div class="books-grid">
          <HomeBookItem
            v-for="book in popularBooks"
            :authors="book.authors"
            :title="book.bookname"
            :bookimage="book.bookImageURL"
            :key="book.isbn13"
          />
        </div>
      </div>
      <h2 class="info-title-map">도서관 위치</h2>
      <KakaoMap class="map" :width="1246" :height="400" :lat="Number(libraryData.lib.libInfo.latitude)" :lng="Number(libraryData.lib.libInfo.longitude)" :draggable="true">
        <KakaoMapMarker
          :lat="Number(libraryData.lib.libInfo.latitude)"
          :lng="Number(libraryData.lib.libInfo.longitude)"
          title="절대경로로 이미지 가져오기"
        />
      </KakaoMap>
    </div>
    <div v-else>
      <div class="loading"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.loading {
  height: 1528px;
  width: 1246px;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 50px 30px 20px;
  width: 1246px;
  height: 1360px;
  background-color: #FCF4EF;
  border-radius: 20px;
  margin-top : 10px;
  justify-items: center;
}

.popular-books {
  margin-top: 40px;
}

.info-title {
  margin-top : 20px;
}

.info-title-map {
  margin-top : 40px;
}

.map {
  margin-top : 10px;
  margin-bottom : 40px;
  border-radius: 10px;
}
</style>
