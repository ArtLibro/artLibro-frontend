<script setup lang="ts">
import BookItem from '@/components/common/BookItem.vue'
import CategoryTab1 from '@/components/common/CategoryTab1.vue'
import HeroImage from '@/components/Home/HeroImage.vue'
import RankBook from '@/components/Home/RankBook.vue'
</script>

<template>
  <div class="layout">
    <h2>홈화면입니다</h2>
    <HeroImage />
    <div class="title">대출 급상승 도서</div>
    <div class="bokkitem-container">
      <BookItem />
      <BookItem />
      <BookItem />
      <BookItem />
      <BookItem />
      <BookItem />
    </div>
    <div class="title">이달의 인기 대출 도서</div>
    <div class="bookCategory">
      <CategoryTab1 />
      <CategoryTab1 />
      <CategoryTab1 />
      <CategoryTab1 />
      <CategoryTab1 />
      <CategoryTab1 />
    </div>
    <div style="display: flex">
      <div class="rankBook-container">
        <RankBook />
        <RankBook />
        <RankBook />
      </div>
      <div class="rankBook-container">
        <RankBook />
        <RankBook />
        <RankBook />
      </div>
      <div class="rankBook-container">
        <RankBook />
        <RankBook />
        <RankBook />
      </div>
      <div class="rankBook-container">
        <RankBook />
        <RankBook />
        <RankBook />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
div {
  display: grid;
  height: 100vh;
}

.btn {
  background-color: $primary-color-100;
  color: white;
  padding: 10px 15px;
  width: 200px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.layout {
  max-width: 1246px;
  margin: 0 auto;
}

.title {
  margin-bottom: 24px;
  font-size: 30px;
  font-weight: 600;
  margin-top: 57px;
}

.bokkitem-container {
  display: flex;
}

.bookCategory {
  display: flex;
  margin-bottom: 17px;
}

.rankBook-container {
  display: flex;
  flex-direction: column;
}
</style>
