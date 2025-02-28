import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { Location } from '@/types/location.types.ts'

export const useLocationStore = defineStore('location', () => {
  const userLocation = reactive<Location>({latitude : null, longitude: null});

  function setUserLocation(location: Location) {
    userLocation.latitude = location.latitude;
    userLocation.longitude = location.longitude;
  }

  return { userLocation, setUserLocation }
})
