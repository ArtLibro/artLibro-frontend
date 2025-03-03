<script setup lang="ts">
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
    홈 화면입니다
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
}
</style>
