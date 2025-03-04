<script setup lang="ts">
import BookItem from '@/components/common/BookItem.vue'
import HeroImage from '@/components/Home/HeroImage.vue'
import RankBook from '@/components/Home/RankBook.vue'
import { useQuery } from '@tanstack/vue-query'
import { computed, ref } from 'vue'
import { getBook } from '@/apis/HomeApi'
import type { QueryItemRankBook, QueryItemReader } from '@/types/Book'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import RoundCategoryTab from '@/components/Home/RoundCategoryTab.vue'
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

const now = new Date()
const year = now.getFullYear() - 1
const month = String(now.getMonth() + 1).padStart(2, '0')
const day = String(now.getDate()).padStart(2, '0')
const formattedDate = `${year}-${month}-${day}`

const rankCateTab = ref({
  1: '철학',
  2: '종교',
  3: '사회과학',
  4: '자연과학',
  5: '기술과학',
  6: '예술',
  7: '언어',
  8: '문학',
  9: '역사',
})
const query = ref<[QueryItemReader, QueryItemRankBook]>([
  {
    type: 'reader',
    isbn13: '9788983922571;9788983921475;',
    path: '/recommandList',
  },
  {
    startDt: formattedDate,
    kdc: 1,
    pagesize: 1,
    pageNumber: 20,
    path: '/loanItemSrch',
  },
])

// /////////////////////////////////////////////
const { data: data1 } = useQuery({
  queryKey: ['avid-reader', query],
  queryFn: () => getBook(query.value[0], query.value[0].path),
})

const { data: data2 } = useQuery({
  queryKey: ['rank-book', query],
  queryFn: () => getBook(query.value[1], query.value[1].path),
})

// const bookwormList = data1.value?.response.docs
// const bookrankList = data2.value?.response.docs

const tmpArray = ref([
  { title: 'dkdk', id: 1 },
  { title: 'dkdk', id: 2 },
  { title: 'dkdk', id: 3 },
  { title: 'dkdk', id: 4 },
  { title: 'dkdk', id: 5 },
  { title: 'dkdk', id: 6 },
  { title: 'dkdk', id: 7 },
  { title: 'dkdk', id: 8 },
  { title: 'dkdk', id: 9 },
  { title: 'dkdk', id: 10 },
  { title: 'dkdk', id: 11 },
  { title: 'dkdk', id: 12 },
  { title: 'dkdk', id: 13 },
  { title: 'dkdk', id: 14 },
  { title: 'dkdk', id: 15 },
])

const bookChunk = computed(() => {
  const chunkSize = 6
  const result = []
  for (let i = 0; i < tmpArray.value.length; i += chunkSize) {
    result.push(tmpArray.value.slice(i, i + chunkSize))
  }
  return result
})

console.log('나와야합니다', bookChunk)

console.log(data2.value)

const locationStore = useLocationStore()
onMounted(() => {
  function success(position: GeolocationPosition) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    if (
      latitude !== locationStore.userLocation.latitude ||
      longitude !== locationStore.userLocation.longitude
    ) {
      locationStore.setUserLocation({ latitude, longitude })
      console.log(locationStore.userLocation)
    }
    const getAddress = async () => {
      const data = await getAddressByLocation(locationStore.userLocation)
      console.log(data)
      const library = await getLibraryInfo(data)
      const libraryPopularBooks = await getLibraryPopularBooks('111526')
    }

    getAddress()
  }

  function error() {
    alert('에러')
  }

  console.log(`컴포넌트가 마운트 됐습니다.`)
  navigator.geolocation.getCurrentPosition(success, error)
})
</script>

<template>
  <div class="home-layout">
    <HeroImage />
    <div class="title">대출 급상승 도서</div>
    <div class="bookitem-container">
<!--      <swiper-->
<!--        :slidesPerView="1"-->
<!--        :spaceBetween="16"-->
<!--        :loop="true"-->
<!--        :pagination="{ clickable: true }"-->
<!--        :navigation="true"-->
<!--        :modules="[Navigation]"-->
<!--        class="mySwiper"-->
<!--      >-->
<!--        <swiper-slide v-for="(chunk, index) in bookChunk" :key="index">-->
<!--          <div style="display: flex">-->
<!--            <BookItem v-for="item in chunk" :key="item.id" :title="item.id" />-->
<!--          </div>-->
<!--        </swiper-slide>-->
<!--      </swiper>-->
    </div>
    <div class="title">이달의 인기 대출 도서</div>
    <div class="bookCategory">
      <RoundCategoryTab v-for="(value, key) in rankCateTab" :key="key" :name="value" />
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
    </div>
    <div class="library-wrapper">
      <LibraryInfo></LibraryInfo>
      <LibraryPopularBooks></LibraryPopularBooks>
      <LibraryChart></LibraryChart>
    </div>
    <PerformanceHero />
    <PerformanceMonthly />
    <PerformanceAward />
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

.title {
  margin-bottom: 24px;
  font-size: 30px;
  font-weight: 600;
  margin-top: 57px;
}

.bookitem-container {
  display: flex;
  width: 100%;
}

.bookCategory {
  display: flex;
  margin-bottom: 17px;
}

.rankBook-container {
  display: flex;
  flex-direction: column;
}

::v-deep .swiper-button-prev,
::v-deep .swiper-button-next {
  top: 45%;
  background-color: #ffffff !important;
  border-radius: 50%;
  width: 34px;
  height: 34px;

  border: 1px solid $text-color-100;
}

::v-deep .swiper-button-prev::after {
  content: url('/public/icons/arrow-left.svg');
  display: flex;
  width: 100%;
  height: 80%;
  justify-content: center;
  align-items: self-end;
}

::v-deep .swiper-button-next::after {
  content: url('/public/icons/arrow-right.svg');
  display: flex;
  width: 100%;
  height: 80%;
  justify-content: center;
  align-items: self-end;
}
</style>
