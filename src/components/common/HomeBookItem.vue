<script setup lang="ts">
defineProps({
  // 원래 title String
  title: Number,
  authors: String,
  bookimage: String,
})
</script>

<template>
  <div class="bookItem">
    <!-- <img
      :src="bookimage"
      alt="ddd"
      style="width: 195px; height: 260px; background: gray; border-radius: 12px"
    /> -->
    <div style="width: 195px; height: 260px; background: gray; border-radius: 12px"></div>
    <div class="bookItem-title">{{ title }}</div>
    <div class="bookItem-subtitle">{{ authors }}</div>
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
  width: 193px;
}

.bookItem-subtitle {
  font-size: 14px;
  font-weight: 600;
  color: $text-color-400;
  margin-top: 10px;
}
</style>
