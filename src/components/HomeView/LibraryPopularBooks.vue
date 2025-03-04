<script setup lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/css/pagination';
  import { Pagination } from 'swiper/modules';
  import { ref } from 'vue'

  const modules = ref([Pagination]);
</script>

<template>
  <div class="library-new-books">
    <div class="title">가까운 도서관 TOP5 도서</div>
    <swiper
      :slidesPerView="3"
      :spaceBetween="30"
      :pagination="{
      clickable: true,
    }"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide><swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide><swiper-slide>Slide 5</swiper-slide>
      <swiper-slide>Slide 6</swiper-slide><swiper-slide>Slide 7</swiper-slide>
      <swiper-slide>Slide 8</swiper-slide><swiper-slide>Slide 9</swiper-slide>
    </swiper>
  </div>
</template>

<style scoped lang="scss">
.library-new-books {
  width : 368px;
  height: 280px;
  background-color: #ECF4FE;
  border-radius: 10px;
  padding : 20px;
  display: grid;
}

.title {
  color : #3F3E3D;
  font-size: 24px;
  font-weight: bold;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>
