<script setup lang="ts"></script>

<template>
  <div class="rankbookItem">
    <div class="rankbook"></div>
    <div class="rankbook-text">
      <div class="title">퇴마록 국내편</div>
      <div class="subtitle">이우혁</div>
    </div>
    <div class="rank-num">2</div>
    <div class="rank-shadow">2</div>
  </div>
</template>

<style lang="scss" scoped>
.rankbookItem {
  display: flex;
  position: relative;
  margin-bottom: 14px;
  align-items: center;
  width: 305px;
}

.rankbook {
  width: 72px;
  height: 101px;
  background: gray;
  border-radius: 0 4px 4px 0;
}

.rankbook-text {
  margin-left: 17px;
}

.rankbook-text .title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 180px;
}

.rankbook-text .subtitle {
  font-size: 14px;
  color: $text-color-200;
  font-weight: 200;
}

.rank-num {
  font-size: 50px;
  font-weight: 500;
  position: absolute;
  bottom: 3px;
  left: -17px;
  color: white;
  z-index: 9;
}

.rank-shadow {
  font-size: 60px;
  font-weight: 700;
  position: absolute;
  bottom: 0;
  left: -20px;
  color: #c9c9c9;
}
</style>
