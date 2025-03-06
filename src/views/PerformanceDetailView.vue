<script lang="ts" setup>
import PerformanceInfo from '@/components/PerformanceDetailView/PerformanceInfo.vue'
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
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
const query = ref<PrfApi[]>([
  {
    path: '/pblprfr/PF132236',
  },

  {
    path: '',
  },
])

// 잘오는중....
const { data: prfdetail } = useQuery({
  queryKey: ['performance-detail', route.params.id],
  queryFn: () => getPerformanceDetail('prfInfo', route.params.id as string),
})

onMounted(async () => {
  try {
    const data = await getPerformanceDetail('prfPlace', prfdetail.value.mt10id)
    prfPlaceArray.value = data
    console.log('22222222222222', prfPlaceArray.value)
  } catch (error) {
    console.error('API 요청 실패:', error)
  }
})

console.log('prfdetail', prfdetail.value)

// const { data: prfdetail } = useQuery({
//   queryKey: ['performance-detail', route.params.id],
//   queryFn: () => getPerformanceDetail('prfInfo'),
// })

// const { data: prfplaceData, isLoading } = useQuery({
//   queryKey: ['performance-place', query],
//   queryFn: () => getPerformanceDetail('prfPlace'),
// })

// const mt10id = computed(() => {
//   return prfPlaceArray.value?.mt10id ||
// })

// 장소 불러왔음
onMounted(async () => {
  // FC001431
  try {
    const data = await getPerformanceDetail('prfPlace', prfdetail.value.mt10id)
    prfPlaceArray.value = data
    console.log('22222222222222', prfPlaceArray.value)
  } catch (error) {
    console.error('API 요청 실패:', error)
  }
})

const prfInfo = ref<PrfInfoDetail | null>(prfdetail.value)
const awardPerformances = ref([])
const recommendPerformance = ref([])

console.log('555555555', prfInfo?.value?.genrenm)

//수상작
onMounted(async () => {
  const genre = genres.find((item) => item.genre === prfInfo?.value?.genrenm)
  console.log('Selected genre:', genre) // genre 값 확인

  try {
    const data = await getAwardPerformances(
      genres.find((item) => item.genre === prfInfo?.value?.genrenm),
    )
    console.log('66666666666', data)
    console.log('$4444444444444444444', data.dbs.db)

    awardPerformances.value = data.dbs.db
    console.log('awardPerformances', awardPerformances)
  } catch (error) {
    console.error('API 요청 실패:', error)
  }
})

//추천
onMounted(async () => {
  try {
    const data = await getPerformances(
      genres.find((item) => item.genre === prfInfo?.value?.genrenm),
    )
    recommendPerformance.value = data.dbs.db
  } catch (error) {
    console.error('API 요청 실패:', error)
  }
})

// watchEffect(() => {
//   if (prfdetail.value) {
//     prfplaceId.value = prfdetail.value.mt10id || ''
//   }
// })
// watchEffect(() => {
//   if (prfplaceId.value) {
//     query.value[1].path = `/prfplc/${prfplaceId.value}`
//     console.log('UPDATE', query.value[1].path)
//   }
// })

// watchEffect(() => {
//   if (isLoading.value) {
//     console.log('데이터 로딩 중...')
//   } else if (prfplaceData.value) {
//     console.log('prfplaceData:', prfplaceData.value) // 데이터 로드 후 prfplaceData 출력
//     // prfplaceData를 사용하여 추가 작업 수행
//   } else {
//     console.log('prfplaceData는 아직 로드되지 않았습니다.')
//   }
// })

// console.log('발견', prfplaceData.value)

// console.log('나와주새ㅔ여', prfplaceData.value)

console.log('prfplaceId', prfplaceId.value)

console.log('야호 나오니~?', prfdetail.value)

// console.log('이름이 뭐야~?', prfplaceData.value)

const startDate = ref(prfInfo.value?.prfpdfrom)
const endtDate = ref(prfInfo.value?.prfpdto)

const formattedStd = startDate.value?.split('.').join('-')
const formattedEnd = endtDate.value?.split('.').join('-')

const dateRange = ref<object>({
  start: new Date('' + formattedStd),
  end: new Date('' + formattedEnd),
})

const activeKey = ref<string>('1')

const onTabChange = (key) => {
  activeKey.value = key
}
</script>

<template>
  <div class="layout">
    <div class="poster-container">
      <PerformanceInfo
        :prfnm="prfInfo?.prfnm"
        :prfSchedule="[prfInfo?.prfpdfrom, prfInfo?.prfpdto]"
        :prfruntime="prfInfo?.prfruntime"
        :fcltynm="prfInfo?.fcltynm"
        :prfcast="prfInfo?.prfcast"
        :pcseguidance="prfInfo?.pcseguidance"
        :prfage="prfInfo?.prfage"
        :genrenm="prfInfo?.genrenm"
        :poster="prfInfo?.poster"
        :relates="prfInfo?.relates"
      />
      <div class="calendar-container">
        <div class="calendar">
          <DatePicker
            v-model="dateRange"
            is-range
            :disabled="true"
            :masks="{ title: 'YYYY년 MMM ' }"
            :color="selectedColor"
          />
        </div>
      </div>
    </div>
    <a-tabs :active-key="activeKey" @change="onTabChange" class="performanceTab-container">
      <a-tab-pane key="1" tab="공연 상세 정보" class="performanceTab">
        <div class="poster-detail-container">
          <div :style="{ height: contentHeight + 'px' }" class="content" ref="content">
            <div v-if="Array.isArray(prfInfo?.styurls?.styurl)" class="poster-description">
              <!-- prfInfo.styurls.styurl이 배열일 때 -->
              <div v-for="(item, index) in prfInfo?.styurls?.styurl" :key="index">
                <img :src="item" alt="포스터 설명" />
              </div>
            </div>
            <div v-else>
              <div>
                <img :src="prfInfo?.styurls?.styurl" alt="포스터 설명" class="poster-description" />
              </div>
            </div>
          </div>

          <button class="show-more" v-if="!isEnd" @click="loadMoreContent">펼쳐보기</button>
        </div>
      </a-tab-pane>

      장애시설 경사로 없음
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
            <div class="prf-related-title">{{ prfInfo?.genrenm }} 수상작을 만나보세요</div>
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
            <div class="prf-related-title">추천하는 다른 {{ prfInfo?.genrenm }}</div>
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
