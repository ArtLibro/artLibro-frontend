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

export interface BookItem {
  doc: Book
}
