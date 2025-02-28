<script setup lang="ts">
import { onMounted } from 'vue'
import { useLocationStore } from '@/stores/locationStore.ts'
import { getAddressByLocation } from '@/apis/kakaoLocals.ts'

const locationStore = useLocationStore();
onMounted(() => {
  function success(position : GeolocationPosition) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    if (latitude !== locationStore.userLocation.latitude || longitude !== locationStore.userLocation.longitude) {
      locationStore.setUserLocation({latitude, longitude});
      console.log(locationStore.userLocation);
    }
    const getAddress = async () => {
      const data = await getAddressByLocation(locationStore.userLocation);
      console.log(data);
    }

    getAddress();
  }

  function error() {
    alert('에러')
  }

  console.log(`컴포넌트가 마운트 됐습니다.`);
  navigator.geolocation.getCurrentPosition(success, error);
})


</script>



<template>
  <div>
    홈 화면입니다
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
</style>
