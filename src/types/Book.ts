export interface QueryItemReader {
  type: string
  isbn13: string
  path: string
}

export interface QueryItemRankBook {
  startDt: string
  kdc: number
  pagesize: number
  pageNumber: number
  path: string
}
