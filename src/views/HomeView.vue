<script setup lang="ts">
import BookItem from '@/components/common/BookItem.vue'
import CategoryTab1 from '@/components/common/CategoryTab1.vue'
import HeroImage from '@/components/Home/HeroImage.vue'
import RankBook from '@/components/Home/RankBook.vue'
import { RouterLink } from 'vue-router'
import { onMounted } from 'vue'
import { useLocationStore } from '@/stores/locationStore.ts'
import { getAddressByLocation } from '@/apis/kakaoLocals.ts'
import { getLibraryInfo, getLibraryPopularBooks } from '@/apis/books.ts'
import LibraryInfo from '@/components/HomeView/LibraryInfo.vue'
import LibraryPopularBooks from '@/components/HomeView/LibraryPopularBooks.vue'
import PerformanceHero from '@/components/HomeView/PerformanceHero.vue'
import LibraryChart from '@/components/HomeView/LibraryChart.vue'
import PerformanceMonthly from '@/components/HomeView/PerformanceMonthly.vue'
import PerformanceAward from '@/components/HomeView/PerformanceAward.vue'

const locationStore = useLocationStore();
onMounted(() => {
  function success(position : GeolocationPosition) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    if (latitude !== locationStore.userLocation.latitude || longitude !== locationStore.userLocation.longitude) {
      locationStore.setUserLocation({latitude, longitude});
      console.log(locationStore.userLocation);
    }
    const getAddress = async () => {
      const data = await getAddressByLocation(locationStore.userLocation);
      console.log(data);
      const library = await getLibraryInfo(data);
      const libraryPopularBooks = await getLibraryPopularBooks('111526');
    }

    getAddress();
  }

  function error() {
    alert('에러')
  }

  console.log(`컴포넌트가 마운트 됐습니다.`);
  navigator.geolocation.getCurrentPosition(success, error);
})
</script>



<template>
  <div class="home-layout">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <button class="btn">주요 색상 SCSS 사용하기</button>
    <HeroImage />
    <div class="title">대출 급상승 도서</div>
    <div class="bokkitem-container">
      <BookItem />
      <BookItem />
      <BookItem />
      <BookItem />
      <BookItem />
      <BookItem />
    </div>
    <div class="title">이달의 인기 대출 도서</div>
    <div class="bookCategory">
      <CategoryTab1 />
      <CategoryTab1 />
      <CategoryTab1 />
      <CategoryTab1 />
      <CategoryTab1 />
      <CategoryTab1 />
    </div>
    <div style="display: flex">
      <div class="rankBook-container">
        <RankBook />
        <RankBook />
        <RankBook />
      </div>
      <div class="rankBook-container">
        <RankBook />
        <RankBook />
        <RankBook />
      </div>
      <div class="rankBook-container">
        <RankBook />
        <RankBook />
        <RankBook />
      </div>
      <div class="rankBook-container">
        <RankBook />
        <RankBook />
        <RankBook />
      </div>
    <div class="library-wrapper">
      <LibraryInfo></LibraryInfo>
      <LibraryPopularBooks></LibraryPopularBooks>
      <LibraryChart></LibraryChart>
    </div>
    <PerformanceHero/>
    <PerformanceMonthly/>
    <PerformanceAward/>
  </div>
</template>

<style lang="scss" scoped>
.home-layout {
  display: grid;
  height: auto;
  margin-bottom: 50px;
}

.btn {
  background-color: $primary-color-100;
  color: white;
  padding: 10px 15px;
  width: 200px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.library-wrapper {
  display: flex;
  height: 340px;
  justify-content: space-between;

.title {
  margin-bottom: 24px;
  font-size: 30px;
  font-weight: 600;
  margin-top: 57px;
}

.bokkitem-container {
  display: flex;
}

.bookCategory {
  display: flex;
  margin-bottom: 17px;
}

.rankBook-container {
  display: flex;
  flex-direction: column;
}
</style>
