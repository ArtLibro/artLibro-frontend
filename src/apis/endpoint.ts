const LIBRARY_KEY = import.meta.env.VITE_API_LIBRARY_KEY

/**
# ======================#
|       RESERVATION     |
# ======================#
*/

// export const LIBRARY_ENDPOINT = Object.freeze({
//   bookList: (keyword: string, pageNo: number, pageSize: number) =>
//     `/srchBooks?authKey=${LIBRARY_KEY}&keyword=${keyword}&pageNo=${pageNo}&pageSize=${pageSize}&format=json`,
// })

export const LIBRARY_ENDPOINT = Object.freeze({
  bookList: `/srchBooks?authKey=${LIBRARY_KEY}`,
})
