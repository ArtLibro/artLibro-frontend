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
import { RouterLink } from 'vue-router'
import { onMounted } from 'vue'
import { useLocationStore } from '@/stores/locationStore.ts'
import { getAddressByLocation } from '@/apis/kakaoLocals.ts'

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
  <div class="layout">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <button class="btn">주요 색상 SCSS 사용하기</button>
    <HeroImage />
    <div class="title">대출 급상승 도서</div>
    <div class="bookitem-container">
      <!-- <BookItem
        v-for="item in bookwormList"
        :key="item"
        :title="item.book.bookname"
        :authors="item.book.authors"
        :bookimage="item.book.bookImageURL"
      /> -->
      <!-- <swiper :slidesPerView="1" spaceBetween="10">
        <swiper-slide v-for="(group, index) in tmpArray" :key="index">
          <div class="slide-group">
            <div v-for="(slide, idx) in group" :key="idx" class="slide">
              {{ slide }}
            </div>
          </div>
        </swiper-slide>
      </swiper> -->

      <swiper
        :slidesPerView="1"
        :spaceBetween="16"
        :loop="true"
        :pagination="{ clickable: true }"
        :navigation="true"
        :modules="[Navigation]"
        class="mySwiper"
      >
        <swiper-slide v-for="(chunk, index) in bookChunk" :key="index">
          <div style="display: flex">
            <BookItem v-for="item in chunk" :key="item.id" :title="item.id" />
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="title">이달의 인기 대출 도서</div>
    <div class="bookCategory">
      <RoundCategoryTab v-for="(value, key) in rankCateTab" :key="key" :name="value" :code="key" />
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
  </div>
</template>

<style lang="scss" scoped>
div {
  display: grid;
  height: 100vh;
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

.layout {
  max-width: 1246px;
  margin: 0 auto;
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
