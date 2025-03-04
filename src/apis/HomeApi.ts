import type { QueryItemRankBook, QueryItemReader } from '@/types/Book'
import axios from 'axios'

const LIBRARY_API_KEY = import.meta.env.VITE_LIBRARY_BIG_DATE_API_KEY

const axiosApi = axios.create({
  baseURL: 'http://data4library.kr/api',
  timeout: 1000,
  params: {
    authKey: LIBRARY_API_KEY,
    locale: 'kr',
  },
})

export async function getBook(
  query: QueryItemReader | QueryItemRankBook,
  path: string,
): Promise<object> {
  let params: { [key: string]: any } = { format: 'json' }

  if ('type' in query) {
    params = {
      ...params,
      type: query.type,
      isbn13: query.isbn13,
    }
  }

  if ('startDt' in query) {
    params = {
      ...params,
      startDt: query.startDt,
      kdc: query.kdc,
      pagesize: query.pagesize,
      pageNumber: query.pageNumber,
    }
  }

  const response = await axiosApi.get<object>(path, {
    params,
  })
  if (response.status !== 200) {
    throw 'state:' + response.status
  }

  return response.data
}

// 공통

axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response?.status === 401 ||
      error.response?.status === 403 ||
      error.response?.status === 404
    ) {
      console.warn('토근이 완료되었습니다.')
    }
  },
)
