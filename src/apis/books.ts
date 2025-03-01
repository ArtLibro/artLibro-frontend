import LibraryApi from '@/config/axiosLibraryConfig'
import { LIBRARY_ENDPOINT } from './endpoint'
import type { BookItem } from '@/types/libraryType'
import type { KakaoAddress } from '@/types/location.types.ts'
import { regions } from '@/constants/detail-region-code.ts'

export const getBookList = async (
  keyword: string,
  pageNo: number,
  pageSize: number,
): Promise<BookItem[]> => {
  try {
    const response = await LibraryApi.get(LIBRARY_ENDPOINT.bookList, {
      params: {
        keyword,
        pageNo,
        pageSize,
        format: 'json',
      },
    })

    const responseData = await response.data.response.docs

    return responseData
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getLibraryInfo = async (address : KakaoAddress) => {
  try{
    const detailRegionCode = regions[address.regionDepth2];
    const response = await LibraryApi.get(LIBRARY_ENDPOINT.libraryDetail, {
      params : {
        dtl_region : detailRegionCode,
        format: 'json',
      }
    })
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}

export const getLibraryPopularBooks = async (libCode : string) => {
  try{
    const response = await LibraryApi.get(LIBRARY_ENDPOINT.libraryPopularBook, {
      params : {
        libCode : libCode,
        format: 'json',
      }
    })
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}
