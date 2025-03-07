<script setup lang="ts">
import HeroImage from '@/components/Home/HeroImage.vue'
import RankBook from '@/components/Home/RankBook.vue'
import { useQuery } from '@tanstack/vue-query'
import { computed, ref } from 'vue'
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
import {
  getBookToHome,
  getDetailRegionReadAnalysis,
  getLibraryInfo,
  getLibraryPopularBooks,
  getRegionReadAnalysis,
} from '@/apis/books.ts'
import LibraryInfo from '@/components/HomeView/LibraryInfo.vue'
import LibraryPopularBooks from '@/components/HomeView/LibraryPopularBooks.vue'
import PerformanceHero from '@/components/HomeView/PerformanceHero.vue'
import LibraryChart from '@/components/HomeView/LibraryChart.vue'
import PerformanceMonthly from '@/components/HomeView/PerformanceMonthly.vue'
import PerformanceAward from '@/components/HomeView/PerformanceAward.vue'
import HomeBookItem from '@/components/common/HomeBookItem.vue'
import type { LibraryInfoResult } from '@/types/library/library.types.ts'
import { REGION_CODE } from '@/constants/regionCode.ts'
import { regions } from '@/constants/detail-region-code.ts'

const now = new Date()
const year = now.getFullYear() - 1
const month = String(now.getMonth() + 1).padStart(2, '0')
const day = String(now.getDate()).padStart(2, '0')
const formattedDate = `${year}-${month}-${day}`
const filteredBooks = ref([])
const rankBook = ref([])
const activeTab = ref('1')
const bookwornList = ref([])
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
    //
    //9788954617628;9788934972464;9788972754190;9788925554990;
    // isbn13: '9788954617628;9788934972464;9788972754190;9788925554990;9788936433673;',
    isbn13: '9788954617628;9788934972464;9788954617628;9788972754190;9788925554990;',
  },
  {
    startDt: formattedDate,
    kdc: 1,
    pagesize: 12,
    pageNumber: 1,
  },
])

onMounted(async () => {
  try {
    const data1 = await getBookToHome(query.value[0])
    console.log('데이터 입니다', data1)
    // bookwornList.value = data1[0].response.docs
    // console.log('뭐야!!!!!', bookwornList.value)

    data1.forEach((item) => {
      bookwornList.value = bookwornList.value.concat(item.response.docs)
    })

    console.log('다시재배열했습니다', bookwornList.value)

    const data2 = await getBookToHome(query.value[1])
    rankBook.value = data2.response.docs // 응답된 책 데이터를 저장
    filteredBooks.value = rankBook.value // 초기 필터링, 12개만 표시
  } catch (error) {
    console.error('API 요청 실패:', error)
  }
})

// 인기도서
// onMounted(async () => {
//   try {
//     const data = await getBookToHome(query.value[1])
//     rankBook.value = data.response.docs // 응답된 책 데이터를 저장
//     filteredBooks.value = rankBook.value.slice(0, 12) // 초기 필터링, 12개만 표시
//   } catch (error) {
//     console.error('API 요청 실패:', error)
//   }
// })

const bookChunk = computed(() => {
  const chunkSize = 8

  const docs = bookwornList.value
  console.log('닥스 배열크기', docs.length)

  let uniqueBooks = []
  // bookname이 중복되는 경우 하나만 남기고 나머지는 제거
  if (docs && Array.isArray(docs)) {
    uniqueBooks = docs.filter((doc, index, self) => {
      return index === self.findIndex((d) => d.book.bookname === doc.book.bookname)
    })
  } else {
    console.log('docs 배열이 정의되지 않았거나 빈 배열입니다.')
  }

  // const limitedArray = data1.value?.response?.docs?.slice(0, 24) || []
  const limitedArray = uniqueBooks.slice(0, 32)
  console.log('dd', limitedArray)
  const result = []
  for (let i = 0; i < limitedArray.length; i += chunkSize) {
    result.push(uniqueBooks.slice(i, i + chunkSize))
  }
  return result
})

// 카테고리 아이디 가져오기
const getCategoryId = (categoryName) => {
  for (let key in rankCateTab.value) {
    if (rankCateTab.value[key] === categoryName) {
      return key
    }
  }
  return null
}

const filterTab = async (categoryName, key) => {
  try {
    // categoryName을 이용해서 카테고리 ID를 얻는다
    const categoryId = getCategoryId(categoryName)
    if (!categoryId) {
      console.error('카테고리 ID를 찾을 수 없습니다.')
      return
    }

    query.value[1].kdc = categoryId

    const data = await getBookToHome(query.value[1])

    const books = data.response.docs

    // 필터된 데이터로 갱신하고, 12개만 추출
    rankBook.value = books
    filteredBooks.value = books
    activeTab.value = key
  } catch (error) {
    console.error('필터링 실패:', error)
  }
}

//탭 필터 기능
const getColumns = (filteredBooks) => {
  const columns = [[], [], [], []]

  filteredBooks.forEach((item, index) => {
    const columnIndex = index % 4
    columns[columnIndex].push(item)
  })

  return columns
}

const closestLibrary = ref<LibraryInfoResult>()
const closestLibraryBooks = ref([])
const locationStore = useLocationStore()
const regionData = ref()
const detailRegionData = ref()

let max = 999999

function getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
  //lat1:위도1, lng1:경도1, lat2:위도2, lat2:경도2
  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }
  let R = 6371 // Radius of the earth in km
  let dLat = deg2rad(lat2 - lat1) // deg2rad below
  let dLon = deg2rad(lng2 - lng1)
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  let d = R * c // Distance in km
  return d
}

const getAddress = async () => {
  const data = await getAddressByLocation(locationStore.userLocation)
  console.log(data)
  const library = await getLibraryInfo(data)
  console.log(library)

  for (const item of library.libs) {
    const latitude = Number(item.lib.libInfo.latitude)
    const longtitude = Number(item.lib.libInfo.longitude)
    const d = getDistanceFromLatLonInKm(
      locationStore.userLocation.latitude,
      locationStore.userLocation.longitude,
      latitude,
      longtitude,
    )

    if (d < max) {
      max = d
      closestLibrary.value = item.lib.libInfo
    }
  }
  const libraryPopularBooks = await getLibraryPopularBooks(Number(closestLibrary?.value.libCode))
  const arr = []
  for (let i = 0; i < 10; i++) {
    arr.push(libraryPopularBooks.loanBooks[i].book)
  }
  closestLibraryBooks.value = arr

  let code = 11
  for (const item of REGION_CODE) {
    if (item.name === data.regionDepth1) {
      code = item.code
    }
  }

  const detailCode = regions[data.regionDepth2]
  const regionAnalysis = await getRegionReadAnalysis(code)
  const detailRegionAnalysis = await getDetailRegionReadAnalysis(detailCode)

  regionData.value = regionAnalysis
  detailRegionData.value = detailRegionAnalysis
  console.log(detailRegionData.value, regionData.value)
}

onMounted(() => {
  function success(position: GeolocationPosition) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    if (
      latitude !== locationStore.userLocation.latitude ||
      longitude !== locationStore.userLocation.longitude
    ) {
      locationStore.setUserLocation({ latitude, longitude })
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
      <swiper
        :slidesPerView="1"
        :spaceBetween="10"
        :loop="true"
        :pagination="{ clickable: true }"
        :navigation="true"
        :modules="[Navigation]"
        class="mySwiper"
      >
        <swiper-slide v-for="(chunk, index) in bookChunk.slice(0, 24)" :key="index">
          <div style="display: flex; padding-top: 10px">
            <HomeBookItem
              v-for="item in chunk"
              :key="item"
              :title="item.book.bookname"
              :authors="item.book.authors"
              :bookimage="item.book.bookImageURL"
            />
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="category-buttons"></div>
    <div class="title">이달의 인기 대출 도서</div>
    <div class="bookCategory">
      <RoundCategoryTab
        v-for="(value, key) in rankCateTab"
        :key="key"
        :name="value"
        @click="filterTab(value, key)"
        :class="['categorybtn', { active: activeTab === key }]"
      />
    </div>
    <div style="display: flex">
      <div
        v-for="(column, colIndex) in getColumns(filteredBooks)"
        :key="colIndex"
        class="rankBook-column"
      >
        <div v-for="item in column" :key="item.id" class="rankBook-container">
          <RankBook
            :bookname="item.doc.bookname"
            :ranking="item.doc.ranking"
            :authors="item.doc.authors"
            :bookImageURL="item.doc.bookImageURL"
          />
          <!-- {{ item }} -->
        </div>
      </div>
    </div>
    <div class="library-wrapper">
      <LibraryInfo
        :tel="closestLibrary?.tel"
        :operating-time="closestLibrary?.operatingTime"
        :closed="closestLibrary?.closed"
        :address="closestLibrary?.address"
        :lib-name="closestLibrary?.libName"
      />
      <LibraryPopularBooks :books="closestLibraryBooks" />
      <LibraryChart
        v-if="regionData && detailRegionData"
        :region-name="regionData?.request.region"
        :region-data="regionData?.results"
        :detail-region-name="detailRegionData?.request.dtl_region"
        :detail-region-data="detailRegionData?.results"
      />
      <div v-else class="library-chart-default"></div>
    </div>
    <PerformanceHero />
    <PerformanceMonthly />
    <PerformanceAward />
  </div>
</template>

<style lang="scss" scoped>
.home-layout {
  max-width: 1246px;
  margin: 0 auto;
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
  margin-top: 40px;
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

.categorybtn.active {
  background: $secondary-color-300;
  color: white;
  border: none;
}

.library-chart-default {
  width: 480px;
  height: 280px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  padding: 20px;
}
</style>
