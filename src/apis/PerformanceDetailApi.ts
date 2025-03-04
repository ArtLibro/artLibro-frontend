import type { PrfApi, PrfInfoDetail, PrfPlace } from '@/types/Performance'
import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'

const KOPIS_API_KEY = import.meta.env.VITE_KOPIS_KEY

const axiosApi = axios.create({
  baseURL: 'http://kopis.or.kr/openApi/restful',
  timeout: 1000,
  params: {
    service: KOPIS_API_KEY,
    // locale: 'kr',
  },
})

//할일
//1. 공연 id 가지고 불러와서 데이터 채워넣기
//2. 지도 위도경도 해서 지도 그리기
//3. 마지막 탭 채우기  (예상 내 내일 진도 )
//4 . 더보기 처리하기
//5. 왜 늦게 나오는지 확인하기
//6. 에러나는거 처리
export async function getPerformaceDetail(
  query: PrfApi,
  path: string,
): Promise<PrfPlace | PrfInfoDetail> {
  console.log('API 호출 경로:', path) // path 확인
  try {
    let params: { [key: string]: any } = {}

    if ('shprfnmfct' in query) {
      params = {
        ...params,
        shprfnmfct: query.shprfnmfct,
        cpage: query.cpage,
        rows: query.rows,
      }
    }

    const response = await axiosApi.get(path, {
      params,
    })

    const parser = new XMLParser()
    const jsonResponse = parser.parse(response.data) // XML -> JSON 변환

    const performanceDetail = jsonResponse.dbs.db

    return performanceDetail
  } catch (error) {
    console.error('Error fetching performance details:', error)
    throw new Error('Failed to fetch performance details')
  }
}
