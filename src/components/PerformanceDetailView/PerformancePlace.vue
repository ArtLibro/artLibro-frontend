<script setup lang="ts">
import { onMounted } from 'vue'

// import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps'

defineProps({
  fcltynm: String,
  seatscale: String,
  parkinglot: String,
  mt13cnt: String,
  opende: String,
  restaurant: String,
  cafe: String,
  store: String,
  nolibang: String,
  suyu: String,
  parkbarrier: String,
  restbarrier: String,
  elevbarrier: String,
  runwbarrier: String,
})

// const coordinate = {
//   lat: 37.566826,
//   lng: 126.9786567,
// }

const { VITE_KAKAO_MAP_KEY } = import.meta.env.VITE_KAKAOMAP_KEY

// const mapContainer = ref<HTMLElement | null>(null)
onMounted(() => {
  // 카카오 맵 SDK를 동적으로 로드
  const script = document.createElement('script')
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${VITE_KAKAO_MAP_KEY}&autoload=false`
  script.onload = initMap // SDK 로드 완료 후 initMap 호출
  document.head.appendChild(script)
})

// const loadKakaoMap = (container: HTMLElement): void => {
//   const script = document.createElement('script')
//   script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${VITE_KAKAO_MAP_KEY}&autoload=false`
//   document.head.appendChild(script)

//   script.onload = () => {
//     // kakao 객체가 로드되었는지 확인하고 지도 초기화

//     const kakao = window?.kakao as any
//     if (kakao && kakao.maps) {
//       kakao.maps.load(() => {
//         const options = {
//           center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도 중심 좌표
//           level: 3, // 지도 확대 레벨
//           maxLevel: 5, // 지도 축소 제한 레벨
//         }

//         // 지도 인스턴스 생성
//         new kakao.maps.Map(container, options)
//       })
//     } else {
//       console.error('Kakao Map API가 로드되지 않았습니다.')
//     }
//   }

//   script.onerror = () => {
//     console.error('Kakao Map API 로딩 오류 발생')
//   }
// }

const initMap = () => {
  const kakao = window?.kakao as any
  const container = document.getElementById('map')
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  }
  new kakao.maps.Map(container, options)
}
</script>

<template>
  <div class="performance-place-container">
    <div class="performance-place-info">
      <div class="performance-place-row1 performance-place-title">장소</div>
      <div class="performance-place-row2">{{ fcltynm }}</div>
      <div class="performance-place-row3 performance-place-title">총 객석수</div>
      <div class="performance-place-row4">{{ seatscale }} 석</div>
    </div>
    <div class="performance-place-info">
      <div class="performance-place-row1 performance-place-title">주차</div>
      <div class="performance-place-row2">
        <span v-if="parkinglot === 'Y'">주차가능</span>
        <span v-else>주차 불가(인근 무.유료 주차장 이용 권장)</span>
      </div>
      <div class="performance-place-row3 performance-place-title">공연장 수</div>
      <div class="performance-place-row4">{{ mt13cnt }} 개</div>
    </div>
    <div class="performance-place-info">
      <div class="performance-place-row1 performance-place-title">개관연도</div>
      <div class="performance-place-row2">{{ opende }} 년</div>
      <div class="performance-place-row3 performance-place-title">주변식당</div>
      <div class="performance-place-row4">
        <span v-if="restaurant === 'Y'">있음</span>
        <span v-else>없음</span>
      </div>
    </div>
    <div class="performance-place-info">
      <div class="performance-place-row1 performance-place-title">카페</div>
      <div class="performance-place-row2">
        <span v-if="cafe === 'Y'">있음</span>
        <span v-else>없음</span>
      </div>
      <div class="performance-place-row3 performance-place-title">편의점</div>
      <div class="performance-place-row4">
        <span v-if="store === 'Y'">있음</span>
        <span v-else>없음</span>
      </div>
    </div>
    <div class="performance-place-info">
      <div class="performance-place-row1 performance-place-title">놀이방</div>
      <div class="performance-place-row2">
        <span v-if="nolibang === 'Y'">있음</span>
        <span v-else>없음</span>
      </div>
      <div class="performance-place-row3 performance-place-title">수유실</div>
      <div class="performance-place-row4">
        <span v-if="suyu === 'Y'">있음</span>
        <span v-else>없음</span>
      </div>
    </div>
    <div class="performance-place-info">
      <div class="performance-place-row1 performance-place-title">장애 시설 주차장</div>
      <div class="performance-place-row2">
        <span v-if="parkbarrier === 'Y'">있음</span>
        <span v-else>없음</span>
      </div>
      <div class="performance-place-row3 performance-place-title">장애시설 화장실</div>
      <div class="performance-place-row4">
        <span v-if="restbarrier === 'Y'">있음</span>
        <span v-else>없음</span>
      </div>
    </div>
    <div class="performance-place-info">
      <div class="performance-place-row1 performance-place-title">장애시설 엘리베이터</div>
      <div class="performance-place-row2">
        <span v-if="elevbarrier === 'Y'">있음</span>
        <span v-else>없음</span>
      </div>
      <div class="performance-place-row3 performance-place-title">장애시설 경사로</div>
      <div class="performance-place-row4">
        <span v-if="runwbarrier === 'Y'">있음</span>
        <span v-else>없음</span>
      </div>
    </div>
  </div>

  <!-- /// -->
  <!-- <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true">
    <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
  </KakaoMap> -->
  <!-- <div ref="mapContainer" style="width: 100%; height: 70vh"></div> -->
  <div id="map" style="width: 100%; height: 400px"></div>
</template>

<style lang="scss" scoped>
.performance-place-info {
  width: 100%;
  background: #f8f8f8;
  display: flex;
  margin-bottom: 5px;
  padding: 15px 0;
}

.performance-place-info:first-child {
  border-radius: 20px 20px 0 0;
}

.performance-place-info:last-child {
  border-radius: 0 0 20px 20px;
}

.performance-place-row1,
.performance-place-row3 {
  width: 20%;
  padding: 0 30px 0 51px;
  box-sizing: border-box;
  font-weight: 600;
}

.performance-place-row2,
.performance-place-row4 {
  width: 30%;
  padding: 0 32px;
  box-sizing: border-box;
  font-weight: 500;
}

.performance-place-title {
  color: $text-color-300;
}

.performance-place-title::before {
  content: '•';
  font-size: 15px;
  color: $text-color-300;
  margin-right: 10px;
}
</style>
