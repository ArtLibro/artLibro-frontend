<script setup lang="ts">
import type { LibraryInfoResult } from '@/types/library/library.types.ts'

type LibraryInfoProps = Pick<LibraryInfoResult, 'libName' | 'homepage' | 'address' | 'fax' | 'tel' | 'operatingTime' | 'closed'>
defineProps<LibraryInfoProps>()
</script>

<template>
  <div class="library-info">
    <img src="/images/library-hero-image.png" height="315" width="490" />
    <div class="library-info-detail">
      <div class="info-title">
        <img src="/icons/library/map-pin.svg" alt="map-pin">
        <div class="title">{{ libName }}</div>
        <div class="address">{{ address }}</div>
      </div>
      <div class="telephone">
        <div class="tel-detail">
          <img src="/icons/library/phone-icon.svg" alt="telephone"/>
          <div class="sub">전화번호</div>
          <div>{{ tel }}</div>
        </div>
        <div class="tel-detail">
          <img src="/icons/library/print-icon.svg" alt="phone-icon"/>
          <div class="sub">팩스번호</div>
          {{ fax }}
        </div>
      </div>
      <div class="tel-detail">
        <img src="/icons/library/home-icon.svg" alt="phone-icon"/>
        <div class="sub">홈페이지</div>
        {{ homepage }}
      </div>
      <div class="operating-box">
        <div>
          <img src="/icons/library/calendar-icon.svg" alt="calendar-icon"/>
          <div>운영 일시</div>
          {{ operatingTime }}
        </div>
        <div>
          <img src="/icons/library/clock-icon.svg" alt="clock-icon"/>
          <div>휴관일</div>
          {{ closed }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.library-info {
  display: flex;
  justify-content: space-between;
  width: 1246px;
  height: 315px;
}

.library-info-detail {
  width: 730px;
  height: 315px;
  display: grid;
  gap: 25px;
}

.info-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  margin-left: 20px;
  font-size: 28px;
  font-weight: bold;
}

.address {
  font-size: 16px;
  color : $text-color-300;
  margin-left:20px;
}

.telephone {
  display: flex;
  font-size: 20px;
}

.sub {
  font-size: 20px;
  font-weight: 600;
}

.tel-detail {
  display: flex;
  align-items: center;
}

.operating-box {
  width: 730px;
  height: 124px;
  display: flex;
  background-color: #EDEEF4;
  border-radius: 10px;
  padding: 20px;
}
</style>
