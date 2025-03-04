<script lang="ts" setup>
import PerformanceInfo from '@/components/PerformanceDetailView/PerformanceInfo.vue'
import { computed, ref, watchEffect } from 'vue'
import { Dayjs } from 'dayjs'
import PerformanceTab from '@/components/PerformanceDetailView/PerformanceTab.vue'
import PerformancePlace from '@/components/PerformanceDetailView/PerformancePlace.vue'
import { useQuery } from '@tanstack/vue-query'
import { getPerformaceDetail } from '@/apis/PerformanceDetailApi'
import type { PrfApi, PrfInfoDetail, PrfPlace } from '@/types/Performance'
import { DatePicker } from 'v-calendar'
import 'v-calendar/style.css'

const selectedColor = ref<string>('indigo')

// 공연장소 // 지워야 할거
// const prfplace = ref<string>('')
const prfplaceId = ref<string>('')

// PF220430,PF132236 =>공연상세
const query = ref<PrfApi[]>([
  {
    path: '/pblprfr/PF132236',
  },

  //지워야 할거
  // {
  //   shprfnmfct: prfplace.value,
  //   path: '/prfplc',
  //   cpage: '1',
  //   rows: '10',
  // },
  {
    path: '',
  },
])

const { data: prfdetail } = useQuery({
  queryKey: ['performance-detail', query],
  queryFn: () => getPerformaceDetail(query.value[0], query.value[0].path),
})

const { data: prfplaceData, isLoading } = useQuery({
  queryKey: ['performance-place', query],
  queryFn: () => getPerformaceDetail(query.value[1], query.value[1].path),
})

const prfInfo = ref<PrfInfoDetail | null>(prfdetail.value)

watchEffect(() => {
  if (prfdetail.value) {
    prfplaceId.value = prfdetail.value.mt10id || ''
  }
})
watchEffect(() => {
  if (prfplaceId.value) {
    query.value[1].path = `/prfplc/${prfplaceId.value}`
    console.log('UPDATE', query.value[1].path)
  }
})

// watchEffect(() => {
//   if (isLoading.value) {
//     console.log('데이터 로딩 중...')
//   } else if (prfplaceData.value) {
//     console.log('prfplaceData:', prfplaceData.value)
//   }
// })

// watchEffect(() => {
//   if (isLoading.value) {
//     console.log('데이터 로딩 중...')
//   } else if (prfplaceData.value) {
//     console.log('prfplaceData:', prfplaceData.value)
//   }
// })
watchEffect(() => {
  if (isLoading.value) {
    console.log('데이터 로딩 중...')
  } else if (prfplaceData.value) {
    console.log('prfplaceData:', prfplaceData.value) // 데이터 로드 후 prfplaceData 출력
    // prfplaceData를 사용하여 추가 작업 수행
  } else {
    console.log('prfplaceData는 아직 로드되지 않았습니다.')
  }
})

// const prfplace = ref<PrfPlace | null>(prfplaceData.value)

console.log('발견', prfplaceData.value)

console.log('나와주새ㅔ여', prfplaceData.value)

console.log('prfplaceId', prfplaceId.value)

console.log('야호 나오니~?', prfdetail.value)

console.log('이름이 뭐야~?', prfInfo.value?.mt10id)

const startDate = ref(prfInfo.value?.prfpdfrom)
const endtDate = ref(prfInfo.value?.prfpdto)

const formattedStd = startDate.value?.split('.').join('-')
const formattedEnd = endtDate.value?.split('.').join('-')

const dateRange = ref<object>({
  start: new Date('' + formattedStd),
  end: new Date('' + formattedEnd),
})

console.log('궁금', prfInfo)
console.log('궁금11111111111', prfInfo.value?.fcltynm)

// const prfplace = '' + data2.value?.fcltynm.replace(/\s?\(.*\)/, '')

// console.log('이애ㅐㅐㅐㅐㅐㅐㅐ', prfplace.mt10id

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

          <div class="show-more">펼쳐보기</div>
        </div>
      </a-tab-pane>

      장애시설 경사로 없음
      <a-tab-pane key="2" tab="공연장 상세 정보" class="performanceTab">
        <PerformancePlace
          :fcltynm="prfplaceData?.fcltynm"
          :seatscale="prfplaceData?.seatscale"
          :parkinglot="prfplaceData?.parkinglot"
          :mt13cnt="prfplaceData?.mt13cnt"
          :opende="prfplaceData?.opende"
          :restaurant="prfplaceData?.restaurant"
          :cafe="prfplaceData?.cafe"
          :store="prfplaceData?.store"
          :nolibang="prfplaceData?.nolibang"
          :suyu="prfplaceData?.suyu"
          :parkbarrier="prfplaceData?.parkbarrier"
          :restbarrier="prfplaceData?.restbarrier"
          :elevbarrier="prfplaceData?.elevbarrier"
          :runwbarrier="prfplaceData?.runwbarrier"
        />
      </a-tab-pane>
      <a-tab-pane key="3" tab="연관 공연 정보" class="performanceTab">Tab 3 Content</a-tab-pane>
    </a-tabs>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  max-width: 1246px;
  margin: 0 auto;
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
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}

.calendar-container {
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: end;
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
  margin-top: 54px;
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
</style>
