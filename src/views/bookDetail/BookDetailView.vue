<template>
  <div>
    <h1>Book Detail</h1>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

console.log(props.id);
</script>

<style scoped lang="scss">
@import './BookDetailView.scss';
</style>
