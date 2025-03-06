<script setup lang="ts">
import type { LibraryInfoResult } from '@/types/library/library.types.ts'

type LibraryInfoProps = Pick<LibraryInfoResult, 'libName' | 'homepage' | 'address' | 'fax' | 'tel' | 'operatingTime' | 'closed'>
defineProps<LibraryInfoProps>()
</script>

<template>
  <div class="library-info">
    <img src="/images/library-hero-image.png" height="340" width="490" />
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
          <div class="content">{{ tel }}</div>
        </div>
        <div class="tel-detail">
          <img src="/icons/library/print-icon.svg" alt="phone-icon"/>
          <div class="sub">팩스번호</div>
          <div class="content">{{ fax }}</div>
        </div>
      </div>
      <div class="tel-detail">
        <img src="/icons/library/home-icon.svg" alt="phone-icon"/>
        <div class="sub">홈페이지</div>
        <div class="content">{{ homepage }}</div>
      </div>
      <div class="operating-box">
        <div class="time-box">
          <img src="/icons/library/calendar-icon.svg" alt="calendar-icon" width="54" height="54" />
          <div class="time-content">
            <div class="time-title">운영 일시</div>
            <div class="time-word">{{ operatingTime }}</div>
          </div>
        </div>
        <div class="time-box">
          <img src="/icons/library/clock-icon.svg" alt="clock-icon" width="54" height="54"/>
          <div class="time-content">
            <div class="time-title">휴관일</div>
            <div class="closed-word">{{ closed }}</div>
          </div>
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
  height: 340px;
  margin-top: 10px;
}

.library-info-detail {
  width: 730px;
  height: 340px;
  display: grid;
  gap: 25px;
}

.info-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 600px;
  height: 45px;
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
  justify-content: space-between;
  font-size: 20px;
  height: 41px;
}

.sub {
  margin-left: 20px;
  font-size: 20px;
  font-weight: 600;
}

.tel-detail {
  display: flex;
  align-items: center;
  height: 41px;
}

.operating-box {
  width: 730px;
  height: 138px;
  display: flex;
  background-color: #EDEEF4;
  border-radius: 10px;
  padding: 20px;
  justify-content: center;
  align-items: center;
  gap :20px;
}

.content {
  margin-left: 40px;
}

.time-title {
  font-size: 18px;
  font-weight: bold;
  color : $secondary-color-300;
}

.time-box {
  display: flex;
}

.time-content {
  margin-left: 20px;
  display : grid;
  gap: 10px;
}

.time-word {
  width: 300px;
}
</style>
