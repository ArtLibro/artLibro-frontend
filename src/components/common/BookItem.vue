<script setup lang="ts"></script>

<template>
  <div class="bookItem">
    <div style="width: 195px; height: 260px; background: gray; border-radius: 12px"></div>
    <div class="bookItem-title">타입스크립트 실전 프론트엔드</div>
    <div class="bookItem-subtitle">보리스 체르니 지음 ; 우정은 옮김</div>
  </div>
</template>

<style lang="scss" scoped>
.bookItem {
  margin-right: 16px;
}

.bookItem:last-child {
  margin-right: 0px;
}
.bookItem-title {
  font-size: 20px;
  font-weight: 600;
  overflow: hidden;
  text-wrap: nowrap;
  text-overflow: ellipsis;
  margin-top: 27px;
}

.bookItem-subtitle {
  font-size: 14px;
  font-weight: 600;
  color: $text-color-400;
  margin-top: 10px;
}
</style>
