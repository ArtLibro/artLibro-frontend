// ////////////////////////////////////////////////////////////
import LibraryApi from '@/config/axiosLibraryConfig'
import { LIBRARY_ENDPOINT } from './endpoint'
import type { BookItem, SearchTypeValue, SortOptionValue } from '@/types/libraryType'

interface BookListParams {
  pageNo: number
  pageSize: number
  format: string
  title?: string
  author?: string
  sort?: SortOptionValue
}

import type { BookItem } from '@/types/libraryType'
import type { KakaoAddress } from '@/types/location.types.ts'
import { regions } from '@/constants/detail-region-code.ts'
import type { QueryItemRankBook, QueryItemReader } from '@/types/Book'

export const getBookList = async (
  searchKeyword: string,
  pageNo: number,
  searchType: SearchTypeValue,
  sortType: SortOptionValue,
): Promise<BookItem[]> => {
  try {
    const params: BookListParams = {
      pageNo,
      pageSize: 15,
      format: 'json',
      sort: sortType,
    }

    if (searchType === '도서명') {
      params.title = searchKeyword
    } else if (searchType === '저자') {
      params.author = searchKeyword
    }

    console.log(params)

    const response = await LibraryApi.get(LIBRARY_ENDPOINT.bookList, {
      params,
    })

    const responseData = await response.data.response.docs

    return responseData
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getLibraryInfo = async (address: KakaoAddress) => {
  try {
    const detailRegionCode = regions[address.regionDepth2]
    const response = await LibraryApi.get(LIBRARY_ENDPOINT.libraryDetail, {
      params: {
        dtl_region: detailRegionCode,
        format: 'json',
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getLibraryInfoByRegion = async (regionCode : number) => {
  try {
    const response = await LibraryApi.get(LIBRARY_ENDPOINT.libraryDetail, {
      params: {
        region: regionCode,
        format: 'json',
      },
    })
    return response.data.response
  } catch (error) {
    console.error(error)
  }
}

export const getLibraryInfoByLibraryCode = async (libraryCode : number) => {
  try {
    const response = await LibraryApi.get(LIBRARY_ENDPOINT.libraryDetail, {
      params: {
        libCode: libraryCode,
        format: 'json',
      },
    })
    return response.data.response
  } catch (error) {
    console.error(error)
  }
}

export const getLibraryPopularBooks = async (libCode: number) => {
  try {
    const response = await LibraryApi.get(LIBRARY_ENDPOINT.libraryPopularBook, {
      params: {
        libCode: libCode,
        format: 'json',
      },
    })
    return response.data.response
  } catch (error) {
    console.error(error)
  }
}

/// 추가 /////

export const getBookToHome = async (query: QueryItemReader | QueryItemRankBook) => {
  try {
    let params: { [key: string]: any } = { format: 'json' }
    let bookType: string = ''
    if ('type' in query) {
      bookType = LIBRARY_ENDPOINT.bookwormList
      params = {
        ...params,
        type: query.type,
        isbn13: query.isbn13,
      }
    }

    if ('startDt' in query) {
      bookType = LIBRARY_ENDPOINT.bookRankList
      params = {
        ...params,
        startDt: query.startDt,
        kdc: query.kdc,
        pagesize: query.pagesize,
        pageNumber: query.pageNumber,
      }
    }

    console.log()

    const response = await LibraryApi.get(bookType, { params })

    // 확인 조금만 하고 위코드로 변경
    // const responseData = await response.data.response.docs
    const responseData = await response.data
    return responseData
  } catch (error) {
    throw error
  }
}
