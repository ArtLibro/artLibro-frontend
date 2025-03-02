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
