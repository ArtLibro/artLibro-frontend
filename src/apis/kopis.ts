import KopisApi from '@/config/axiosKopisConfig.ts'
import { KOPIS_ENDPOINT } from '@/apis/endpoint.ts'
import type { PrfApi, PrfInfoDetail, PrfPlace } from '@/types/Performance'

export const getMonthlyPerformances = async () => {
  try {
    const response = await KopisApi.get(KOPIS_ENDPOINT.monthlyList)
    const data = await response.data
    return data
  } catch (error) {
    console.error(error)
  }
}

export const getAwardPerformances = async (genre: object) => {
  try {
    // 추가
    const queryParam = genre ? `&shcate=${genre?.code}` : ''
    const response = await KopisApi.get(KOPIS_ENDPOINT.awardList + queryParam)

    const data = await response.data
    return data
  } catch (error) {
    console.error(error)
  }
}

export const getPerformances = async (genre: object) => {
  try {
    // 추가
    const queryParam = genre ? `&shcate=${genre?.code}` : ''
    const response = await KopisApi.get(KOPIS_ENDPOINT.prfSearch + queryParam)
    const data = await response.data
    return data
  } catch (error) {
    console.error(error)
  }
}

/// 추가 prfSearch
// query: PrfApi 삭제 상태
export const getPerformanceDetail = async (type: string, id: string) => {
  try {
    let params: { [key: string]: any } = {}
    let prftype: string = ''
    console.log('id', id)

    if (type === 'prfInfo') {
      prftype = KOPIS_ENDPOINT.prfDetailList.replace('ID', id)
    }

    if (type === 'prfPlace') {
      prftype = KOPIS_ENDPOINT.prfDetailPlace.replace('ID', id)
    }

    console.log('prftype', prftype)
    const response = await KopisApi.get(prftype, { params })
    const data = await response.data.dbs.db

    return data
  } catch (error) {
    console.error(error)
  }
}
