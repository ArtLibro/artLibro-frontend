<script setup lang="ts">
import {RouterLink} from "vue-router";
</script>

<template>
  <div>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <button class="btn">주요 색상 SCSS 사용하기</button>
  </div>
</template>

<style lang="scss" scoped>
div {
  display: grid;
}

.btn {
  background-color: $primary-color-100;
  color: white;
  padding: 10px 15px;
  width: 300px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
