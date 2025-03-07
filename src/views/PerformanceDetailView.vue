<script lang="ts" setup>
import PerformanceInfo from '@/components/PerformanceDetailView/PerformanceInfo.vue'
import { computed, onMounted, ref, toRaw, watch, watchEffect } from 'vue'
import { Dayjs } from 'dayjs'
import PerformanceTab from '@/components/PerformanceDetailView/PerformanceTab.vue'
import PerformancePlace from '@/components/PerformanceDetailView/PerformancePlace.vue'
import { useQuery } from '@tanstack/vue-query'
import type { PrfApi, PrfInfoDetail, PrfPlace, PrfPlaceInfo } from '@/types/Performance'
import { DatePicker } from 'v-calendar'
import 'v-calendar/style.css'
import { getAwardPerformances, getPerformanceDetail, getPerformances } from '@/apis/kopis'
import PerformanceRelatedDetail from '@/components/PerformanceDetailView/PerformanceAward.vue'
import PerformanceAward from '@/components/PerformanceDetailView/PerformanceAward.vue'
import PerformanceRecommend from '@/components/PerformanceDetailView/PerformanceRecommend.vue'
import { useRoute } from 'vue-router'

const router = useRoute()
const route = useRoute()

console.log('ㅁㄴㅇㅁㄴㅇㄴ', route.params.id)

const selectedColor = ref<string>('indigo')
const prfplaceId = ref<string>('')
const prfPlaceArray = ref<PrfPlaceInfo>()
const contentHeight = ref(1000) // 초기 콘텐츠 높이 (1000px)
const isEnd = ref(false) // 더보기 버튼을 숨길지 여부
const additionalContent = ref(3) // 더 추가할 콘텐츠의 갯수
// const prfPlaceArray = ref<Record<string, any> | null>(null)
const startDate = ref(null)
const endtDate = ref(null)

const prfdetail = ref()
const awardPerformances = ref([])
const recommendPerformance = ref([])

const genres = [
  { genre: '연극', code: 'AAAA' },
  { genre: '무용(서양/한국무용)', code: 'BBBC' },
  { genre: '대중무용', code: 'BBBE' },
  { genre: '서양음악(클래식)', code: 'CCCA' },
  { genre: '한국음악(국악)', code: 'CCCC' },
  { genre: '대중음악', code: 'CCCD' },
  { genre: '복합', code: 'EEEA' },
  { genre: '서커스/마술', code: 'EEEB' },
  { genre: '뮤지컬', code: 'GGGA' },
]

const loadMoreContent = () => {
  if (additionalContent.value > 0) {
    contentHeight.value += 1000 // 1000px씩 늘려준다.
    additionalContent.value-- // 추가 콘텐츠 갯수를 하나 줄인다.
  } else {
    // 추가 콘텐츠가 없으면 콘텐츠 끝까지 표시
    contentHeight.value += 1000 // 기본 높이를 추가하고
    isEnd.value = true // 끝에 도달했으므로 버튼 숨김
  }
}

// PF220430,PF132236 =>공연상세

onMounted(async () => {
  try {
    const data = await getPerformanceDetail('prfInfo', route.params.id as string)
    prfdetail.value = data
    console.log('eeeeeeeeeeeeee', prfdetail.value)

    if (prfdetail.value && prfdetail.value.mt10id) {
      const placeData = await getPerformanceDetail('prfPlace', prfdetail.value.mt10id)
      prfPlaceArray.value = placeData
      console.log('prfPlaceArray:', prfPlaceArray.value)
    } else {
      console.error('mt10id 값이 없습니다.')
    }

    // 수상작

    if (prfdetail.value?.genrenm) {
      // 장르에 맞는 data2 가져오기
      const genre = genres.find((item) => item.genre === prfdetail.value?.genrenm)
      if (genre) {
        const data2 = await getAwardPerformances(genre)
        awardPerformances.value = data2.dbs.db
        console.log('awardPerformances', awardPerformances.value)
      } else {
        console.error('해당 장르를 찾을 수 없습니다.')
      }

      // 장르에 맞는 data3 가져오기
      const genreForPerformance = genres.find((item) => item.genre === prfdetail.value?.genrenm)
      if (genreForPerformance) {
        const data3 = await getPerformances({ shcate : genreForPerformance.code, cpage : 1, rows : 8})
        recommendPerformance.value = data3?.dbs.db
        console.log('recommendPerformance', recommendPerformance.value)
      } else {
        console.error('장르에 맞는 추천 공연을 찾을 수 없습니다.')
      }
    } else {
      console.error('prfdetail에서 genrenm을 찾을 수 없습니다.')
    }
  } catch (error) {
    console.error('API 요청 실패:', error)
  }
})

console.log('prfdetail', prfdetail.value)

console.log('prfplaceId', prfplaceId.value)

console.log('야호 나오니~?', prfdetail.value)

const dateRange = computed(() => {
  return {
    start: new Date(startDate.value),
    end: new Date(endtDate.value),
  }
})

const activeKey = ref<string>('1')

watchEffect(() => {
  if (prfdetail.value?.prfpdfrom) {
    // YYYY.MM.DD 형식을 YYYY-MM-DD로 변환
    startDate.value = prfdetail.value.prfpdfrom.replace(/\./g, '-')
  }

  if (prfdetail.value?.prfpdto) {
    // YYYY.MM.DD 형식을 YYYY-MM-DD로 변환
    endtDate.value = prfdetail.value.prfpdto.replace(/\./g, '-')
  }
})

const onTabChange = (key) => {
  activeKey.value = key
}
</script>

<template>
  <div class="layout">
    <div class="poster-container">
      <PerformanceInfo
        :prfnm="prfdetail?.prfnm"
        :prfSchedule="[prfdetail?.prfpdfrom, prfdetail?.prfpdto]"
        :prfruntime="prfdetail?.prfruntime"
        :fcltynm="prfdetail?.fcltynm"
        :prfcast="prfdetail?.prfcast"
        :pcseguidance="prfdetail?.pcseguidance"
        :prfage="prfdetail?.prfage"
        :genrenm="prfdetail?.genrenm"
        :poster="prfdetail?.poster"
        :relates="prfdetail?.relates"
      />
      <div class="calendar-container" @click="abc">
        <div class="calendar">
          <DatePicker
            v-model="dateRange"
            is-range
            :disabled="true"
            :masks="{ title: 'YYYY년 MMM ' }"
            :color="selectedColor"
            :min-date="startDate"
            :max-date="endtDate"
          />
        </div>
      </div>
    </div>
    <a-tabs :active-key="activeKey" @change="onTabChange" class="performanceTab-container">
      <a-tab-pane key="1" tab="공연 상세 정보" class="performanceTab">
        <div class="poster-detail-container">
          <div :style="{ height: contentHeight + 'px' }" class="content" ref="content">
            <div v-if="Array.isArray(prfdetail?.styurls?.styurl)" class="poster-description">
              <!-- prfInfo.styurls.styurl이 배열일 때 -->
              <div v-for="(item, index) in prfdetail?.styurls?.styurl" :key="index">
                <img :src="item" alt="포스터 설명" />
              </div>
            </div>
            <div v-else>
              <div>
                <img
                  :src="prfdetail?.styurls?.styurl"
                  alt="포스터 설명"
                  class="poster-description"
                />
              </div>
            </div>
          </div>

          <button class="show-more" v-if="!isEnd" @click="loadMoreContent">펼쳐보기</button>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="공연장 상세 정보" class="performanceTab">
        <PerformancePlace
          :fcltynm="prfPlaceArray?.fcltynm"
          :seatscale="prfPlaceArray?.seatscale"
          :parkinglot="prfPlaceArray?.parkinglot"
          :mt13cnt="prfPlaceArray?.mt13cnt"
          :opende="prfPlaceArray?.opende"
          :restaurant="prfPlaceArray?.restaurant"
          :cafe="prfPlaceArray?.cafe"
          :store="prfPlaceArray?.store"
          :nolibang="prfPlaceArray?.nolibang"
          :suyu="prfPlaceArray?.suyu"
          :parkbarrier="prfPlaceArray?.parkbarrier"
          :restbarrier="prfPlaceArray?.restbarrier"
          :elevbarrier="prfPlaceArray?.elevbarrier"
          :runwbarrier="prfPlaceArray?.runwbarrier"
          :latitude="prfPlaceArray?.la"
          :longitude="prfPlaceArray?.lo"
        />
      </a-tab-pane>
      <a-tab-pane key="3" tab="연관 공연 정보" class="performanceTab">
        <div class="prf-related-container">
          <div class="prf-related-card" style="margin-bottom: 72px">
            <div class="prf-related-title">{{ prfdetail?.genrenm }} 수상작을 만나보세요</div>
            <div class="prf-related-layer">
              <template v-if="awardPerformances && awardPerformances.length > 0">
                <PerformanceAward
                  v-for="(item, index) in awardPerformances.slice(0, 4)"
                  :key="index"
                  :prfnm="item.prfnm"
                  :fcltynm="item.fcltynm"
                  :awards="item.awards"
                  :poster="item.poster"
                />
              </template>

              <template v-else>
                <div class="non-award">
                  <div class="non-award-emoji">😭</div>
                  <p class="non-award-titme">수상작이 아직 없습니다</p>
                </div>
              </template>
            </div>
          </div>
          <div class="prf-related-card">
            <div class="prf-related-title">추천하는 다른 {{ prfdetail?.genrenm }}</div>
            <div class="prf-recommend-case">
              <PerformanceRecommend
                v-for="(item, index) in recommendPerformance"
                :key="index"
                :area="item.area"
                :prfnm="item.prfnm"
                :prfpdfrom="item.prfpdfrom"
                :prfpdto="item.prfpdto"
                :poster="item.poster"
                :fcltynm="item.fcltynm"
              />
            </div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  max-width: 1246px;
  margin: 0 auto;
  margin: 70px 0 50px 0;
}
.content {
  height: 1000px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.poster-container {
  display: flex;
  justify-content: space-between;
}

.poster-detail-container {
  width: 1042px;
  margin: 0 auto;
}

.poster-description {
  text-align: center;
  margin-bottom: 17px;
}

.show-more {
  width: 100%;
  height: 61px;
  border-radius: 6px;
  background: #f1f1ef;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #4d4c4c;
  border: 1px solid #dddddd;
  cursor: pointer;
}

.calendar-container {
  width: 300px;
  display: flex;
  align-items: center;
}

.calendar {
  pointer-events: none;
}

.calendar :deep(.vc-header .vc-arrow) {
  background: white;
  width: 19px;
  height: 19px;
  color: #b4b4b5;
}

.calendar :deep(.vc-header .vc-title) {
  background: white;
  font-size: 17px;
  font-family: 'Pretendard', sans-serif;
}

.calendar :deep(.vc-weekday-7) {
  color: red;
  font-family: 'Pretendard', sans-serif;
}

.calendar :deep(.vc-weekday) {
  color: #000000;
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
}

.calendar :deep(.vc-weekday-7) {
  color: #1a54ff;
}

.calendar :deep(.vc-weekday-1) {
  color: #f73f3f;
}

// tab style
::v-deep .performanceTab-container {
  // width: 100%;
  // height: 56px;
  // // height: 70px;
  // border: 1px solid $text-color-100;
  // border-radius: 12px;
  // margin-top: 54px;
}

::v-deep .ant-tabs-nav {
  width: 100%;
  border: 1px solid $text-color-100;
  border-radius: 12px;
  margin-top: 70px;
}
::v-deep .performanceTab-container .ant-tabs-nav::before {
  border-bottom: none;
}

::v-deep .ant-tabs .ant-tabs-tab + .ant-tabs-tab {
  margin: 0;
}

::v-deep .performanceTab-container .ant-tabs-tab {
  width: calc(100% / 3);
  height: 56px;
  font-size: 18px;
  color: #222222;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid $text-color-100;
}

::v-deep .performanceTab-container .ant-tabs-tab:nth-child(3) {
  border-right: none;
}

::v-deep .performanceTab-container .ant-tabs-nav-wrap {
  display: block;
}

::v-deep .performanceTab-container .ant-tabs-tab-active {
  background-color: #f1f1ef;
}
::v-deep .performanceTab-container .ant-tabs-tab-active .ant-tabs-tab-btn {
  color: $secondary-color-300;
}

::v-deep .performanceTab-container .ant-tabs-nav-list .ant-tabs-ink-bar {
  background: $secondary-color-300;
}

.prf-related-container {
  margin-top: 20px;
}

.prf-related-layer {
  width: 948px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.prf-related-card {
  width: 100%;
  padding: 45px;
  box-sizing: border-box;
  border-radius: 8px;
  background: $text-color-100;
  border: 1px solid $text-color-100;
  box-shadow: 0 0 24px 0 rgb(140 139 153 / 50%);
  border: 1px solid #dfdfdf;
}

.prf-related-title {
  font-size: 35px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 50px;
}

.prf-recommend-case {
  width: 1100px;
  display: flex;
  padding: 55px 0;
  box-sizing: border-box;
  margin: 0 auto;
  flex-wrap: wrap;
}

.non-award {
  width: 100%;
  text-align: center;
}

.non-award-emoji {
  font-size: 85px;
}
.non-award-titme {
  margin-top: 4px;
  font-size: 29px;
  font-weight: 600;
  margin-bottom: 20px;
}
</style>
