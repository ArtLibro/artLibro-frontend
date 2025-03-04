import KopisApi from '@/config/axiosKopisConfig.ts'
import { KOPIS_ENDPOINT } from '@/apis/endpoint.ts'
import type { PrfApi, PrfInfoDetail, PrfPlace } from '@/types/Performance'

export const getMonthlyPerformances = async () => {
  try {
    const response = await KopisApi.get(KOPIS_ENDPOINT.monthlyList)
    const data = await response.data
    console.log(data)
    return data
  } catch (error) {
    console.error(error)
  }
}

export const getAwardPerformances = async () => {
  try {
    const response = await KopisApi.get(KOPIS_ENDPOINT.awardList)
    const data = await response.data
    console.log(data)
    return data
  } catch (error) {
    console.error(error)
  }
}

/// 추가

export const getPerformanceDetail = async (query: PrfApi, path: string) => {
  try {
    let params: { [key: string]: any } = {}

    // path 정리 필요
    console.log(path)
    if ('shprfnmfct' in query) {
      params = {
        ...params,
        shprfnmfct: query.shprfnmfct,
        cpage: query.cpage,
        rows: query.rows,
      }
    }

    const response = await KopisApi.get(KOPIS_ENDPOINT.prfDetailList, { params })
    const data = await response.data

    return data
  } catch (error) {
    console.error(error)
  }
}
