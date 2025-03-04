import KopisApi from '@/config/axiosKopisConfig.ts'
import { KOPIS_ENDPOINT } from '@/apis/endpoint.ts'

export const getMonthlyPerformances = async () => {
  try {
    const response = await KopisApi.get(KOPIS_ENDPOINT.monthlyList);
    const data = await response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error)
  }
}

export const getAwardPerformances = async () => {
  try {
    const response = await KopisApi.get(KOPIS_ENDPOINT.awardList);
    const data = await response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error)
  }
}
