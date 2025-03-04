// 커뮤니티 타입

export interface Post {
  id: string
  category: '도서' | '공연/행사'
  title: string
  content: string
  image: string | null
  createdAt: string
}
