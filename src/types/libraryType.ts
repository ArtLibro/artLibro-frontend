// 도서 정보
export interface Book {
  addition_symbol: string
  authors: string
  bookDtlUrl: string
  bookImageURL?: string
  bookname: string
  class_nm: string
  class_no: string
  isbn13: string
  loan_count: string
  publication_year: string
  publisher: string
  vol: string
}

// 도서 목록 아이템
export interface BookItem {
  doc: Book
}

// 정렬 옵션 값
export type SortOptionValue = 'loan' | 'title' | 'author' | 'pub' | 'pubYear' | 'isbn'

// 정렬 옵션 라벨
export type SortOptionLabel =
  | '대출건수 순'
  | '도서명 순'
  | '저자명 순'
  | '출판사 순'
  | '출판년도 순'
  | 'ISBN 순'

// 정렬 옵션
export interface SortOption {
  label: SortOptionLabel
  value: SortOptionValue
}

// 검색 타입 라벨
export type SearchTypeLabel = '도서명' | '저자'

// 검색 타입 값
export type SearchTypeValue = '도서명' | '저자'

// 검색 타입
export interface SearchType {
  label: SearchTypeLabel
  value: SearchTypeValue
}

export interface BookDetail {
  bookname: string
  authors: string
  publisher: string
  publication_year: string
  class_nm: string
  bookImageURL: string
  description: string
}
