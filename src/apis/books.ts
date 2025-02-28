import LibraryApi from '@/config/axiosLibraryConfig'
import { LIBRARY_ENDPOINT } from './endpoint'
import type { BookItem } from '@/types/libraryType'

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
