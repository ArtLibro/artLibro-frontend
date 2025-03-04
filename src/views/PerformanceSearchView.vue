<script setup lang="ts">
import { ref } from 'vue';
import { BOOK_BADGE_LIST } from '@/constants/book-badge';




const value = ref("전체");

</script>

<template>

  <div class="layout">
    <div class="banner">
      <img src="/public/icons/Performance/PerformanceBanner_2.svg">
      <div class="banner-text">
        <div style="color: var(--Secondary-Orange, #EA5313);">'{{ value }}' </div>
        <div>&nbsp;에 대한 검색 결과 입니다</div>
      </div>
    </div>

    <div style="">
      <h2>공연 장르</h2>
      <div style="margin-top: 21px;">

        <div class="keyword_badge_container">
          <div class="badge" v-for="badge in BOOK_BADGE_LIST" :key="badge.id">
            <span># {{ badge.title }}</span>
          </div>
            <a-button class="badge" >Primary Button</a-button>
        </div>
      </div>


    </div>
  </div>




</template>

<style lang="scss" scoped>
.layout {
  width: 1246px;
  height: 903px;
}

.banner {
  margin-top: 57px;
  height: 284px;
  /* margin-left: -85px; */
  /* width: 1426px; */

  /* position: absolute;
      position: relative;
    top: 50%;
    left: 50%;
    width: 1920px;
    height: 560px;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%); */
}

.banner-text {
  display: flex;
  margin-top: -178px;
  margin-left: 94px;
  color: #FFF;
  font-family: Pretendard;
  font-size: 40px;
}

.keyword_badge_container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  .badge {
    display: inline-block;
    border-radius: 30px;
    border: 1px solid #D3D0CB;
    padding: .5rem 1rem;
    color: #61605D;
  }
}
</style>
