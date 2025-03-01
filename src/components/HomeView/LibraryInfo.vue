<script setup lang="ts">

</script>

<template>
  <div class="library-info">
    <div class="title">가까운 도서관</div>
    <div class="info">
      <div class="content-wrapper">
        <img src="/icons/home-library/library.svg" alt="library-icon" height="24px" width="24px" />
        <div>이름 :</div>
      </div>
      <div class="content-wrapper">
        <img src="/icons/home-library/map.svg" alt="map-icon" height="24px" width="24px" />
        <div>주소 :</div>
      </div>
      <div class="content-wrapper">
        <img src="/icons/home-library/phone.svg" alt="phone-icon" height="24px" width="24px" />
        <div>전화번호 :</div>
      </div>
      <div class="content-wrapper">
        <img src="/icons/home-library/calendar-days.svg" alt="calendar-icon" height="24px" width="24px" />
        <div>휴관일 :</div>
      </div>
      <div class="content-wrapper">
        <img src="/icons/home-library/clock-4.svg" alt="clock-icon" height="24px" width="24px" />
        <div>운영시간 :</div>
      </div>
      <div class="content-wrapper">
        <img src="/icons/home-library/book.svg" alt="book-icon" height="24px" width="24px" />
        <div>단행본수 :</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.library-info {
  width : 263px;
  height: 280px;
  background-color: #3F5892;
  border-radius: 10px;
  padding: 20px;
  display: grid;
}

.title {
  color : #FFFFFF;
  font-size: 24px;
  font-weight: bold;
  height: 30px;
}

.info {
  display: grid;
  color : #FFFFFF;
  font-size: 18px;
  gap : 8px;
  margin-bottom : 12px;
}

.content-wrapper {
  display: flex;
  align-items: center;
  gap : 6px;
}
</style>
