const LIBRARY_KEY = import.meta.env.VITE_API_LIBRARY_KEY
const KOPIS_KEY = import.meta.env.VITE_KOPIS_KEY

/**
# ======================#
|       LIBRARY    |
# ======================#
*/

export const LIBRARY_ENDPOINT = Object.freeze({
  bookList: `/srchBooks?authKey=${LIBRARY_KEY}`, // 도서 리스트
  bookDetail: `/srchDtlList?authKey=${LIBRARY_KEY}`, // 도서 상세
  libraryLoanPossible: `/libSrchByBook?authKey=${LIBRARY_KEY}`, // 도서관 대출 가능 여부
  libraryUsageAnalysis: `/usageAnalysisList?authKey=${LIBRARY_KEY}`, // 도서 별 이용 분석
  libraryDetail: `/extends/libSrch?authKey=${LIBRARY_KEY}`,
  libraryPopularBook: `/extends/loanItemSrchByLib?authKey=${LIBRARY_KEY}`,
  bookwormList: `/recommandList?authKey=${LIBRARY_KEY}`,
  bookRankList: `/loanItemSrch?authKey=${LIBRARY_KEY}`,
  readQuantityAnalysis: `/readQt?authKey=${LIBRARY_KEY}`,
})

/**
 # ======================#
 |       KOPIS    |
 # ======================#
 */

const today = new Date()
const firstDate = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}01`
const todayDate = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`

export const KOPIS_ENDPOINT = Object.freeze({
  awardList: `/prfawad?service=${KOPIS_KEY}&stdate=${firstDate}&eddate=${todayDate}&cpage=1&rows=5`,
  monthlyList: `/boxoffice?service=${KOPIS_KEY}&stdate=${firstDate}&eddate=${todayDate}&cpage=1&rows=5`,
  prfDetailList: `/pblprfr/ID?service=${KOPIS_KEY}`,
  prfDetailPlace: `/prfplc/ID?service=${KOPIS_KEY}`,
  prfSearch: `/pblprfr?service=${KOPIS_KEY}&stdate=${firstDate}&eddate=${todayDate}&cpage=1&rows=8`,
})
