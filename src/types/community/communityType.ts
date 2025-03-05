// 커뮤니티 타입

// 기존 Post 타입
export interface Post {
  id: string
  category: '도서' | '공연/행사'
  title: string
  content: string
  image: string | null
  createdAt: string
}

// id, createdAt, image 제외한 타입 정의
export type NewPost = Omit<Post, 'id' | 'createdAt' | 'image'>
