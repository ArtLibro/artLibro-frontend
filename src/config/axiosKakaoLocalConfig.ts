import axios from 'axios'

const KAKAO_MAP_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY

const KakaoLocalApi = axios.create({
  baseURL: 'https://dapi.kakao.com/v2/local',
  timeout: 1000,
  headers: {
    Authorization: `KakaoAK ${KAKAO_MAP_KEY}`,
  },
})

export default KakaoLocalApi
