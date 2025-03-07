<script setup lang="ts">
import { onMounted, ref, watch, watchEffect } from 'vue'
import GenreContainer, { type GenreEmit } from '@/components/PerformanceSearch/GenreContainer.vue'
import { getLibraryUsageAnalysis } from '@/apis/books.ts'
import { getPerformances, type PerformanceInfoType } from '@/apis/kopis.ts'
import PerformanceCard from '@/components/common/PerformanceCard.vue'

const genreCurrentName = ref("전체");
const genreCode = ref('');
const currentPage = ref(1);
const performanceResults = ref<PerformanceInfoType[]>([]);

const handleGenreClick = (genre : GenreEmit) => {
  genreCode.value = genre.genreCode;
  genreCurrentName.value = genre.genreName;
};

watch(genreCode, async (newVal, oldVal) => {
  performanceResults.value = [];
  const data = await getPerformances({
    shcate : genreCode.value,
    cpage : currentPage.value,
    rows : 9
  });

  if (data !== undefined) {
    for (const item of data.dbs.db) {
      performanceResults.value.push(item);
    }
  }
});

onMounted(async () => {
  const data = await getPerformances({
    shcate : genreCode.value,
    cpage : currentPage.value,
    rows : 9
  });

  if (data !== undefined) {
    for (const item of data.dbs.db) {
      performanceResults.value.push(item);
    }
  }
})
</script>

<template>

  <div class="layout">
    <div class="banner">
      <img src="/public/icons/Performance/search-hero.svg" width="1246" height="284">
      <div class="banner-text">
        <div style="color: var(--Secondary-Orange, #EA5313);">'{{ genreCurrentName}}' </div>
        <div>&nbsp;에 대한 검색 결과 입니다</div>
      </div>
    </div>
    <div style="margin-top: 21px;">
      <GenreContainer @handle-genre-click="handleGenreClick"/>
    </div>
    <div class="performance-grid">
      <div v-for="item in performanceResults" :key="item.mt20id">
        <PerformanceCard
          :key="item.mt20id"
          :cate="item.genrenm"
          :mt20id="item.mt20id"
          :poster="item.poster"
          :prfnm="item.prfnm"
          :prfpd="item.prfpdfrom + '~' + item.prfpdto"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  width: 1246px;
}

.banner {
  margin-top: 57px;
  height: 284px;
  /* margin-left: -85px; */
  /* width: 1426px; */

  /* position: absolute;
      position: relative;
    top: 50%;
    left: 50%;
    width: 1920px;
    height: 560px;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%); */
}

.banner-text {
  display: flex;
  margin-top: -178px;
  margin-left: 94px;
  color: #FFF;
  font-family: Pretendard;
  font-size: 40px;
}

.keyword_badge_container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  .badge {
    display: inline-block;
    border-radius: 30px;
    border: 1px solid #D3D0CB;
    padding: .5rem 1rem;
    color: #61605D;
  }
}

.performance-grid {
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3,1fr);
  gap : 30px;
  width: 1246px;
  min-height: 1410px;
}
</style>
