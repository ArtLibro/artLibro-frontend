import axios from 'axios'
import type { Post } from '@/types/community/communityType'

const API_BASE_URL = 'http://13.209.75.182:5001'
// 관리자 토큰
const ADMIN_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY3N2Y3YTFjMzUwYzg3NDBkZTFiZDM5YiIsImVtYWlsIjoiYWRtaW5AcHJvZ3JhbW1lcnMuY28ua3IifSwiaWF0IjoxNzQxMDAxOTQ2fQ.pGlwVCDtgfDAJmI5V2eFgAeR50N0DmP_tZVjT4tKQo0'
// 관리자 토큰으로 생성한 채널 아이디
const CHANNEL_ID = '67c5950406e63d3cffd3bb41'

// API 응답 타입
interface ApiPostResponse {
  _id: string
  title: string
  image?: string
  createdAt?: string | null
}

// 게시글 조회
export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await axios.get<ApiPostResponse[]>(
      `${API_BASE_URL}/posts/channel/${CHANNEL_ID}`,
    )

    return response.data.map((post) => {
      let category = '알 수 없음'
      let title = post.title
      let content = ''

      try {
        const parsedData = JSON.parse(post.title)
        category = parsedData.category ?? '알 수 없음'
        title = parsedData.title ?? post.title
        content = parsedData.content ?? ''
      } catch (error) {
        console.warn('⚠️ JSON 파싱 실패:', error)
      }

      return {
        id: post._id,
        category,
        title,
        content,
        image: post.image || null,
        createdAt: post.createdAt,
      }
    })
  } catch (error) {
    console.error('❌ 게시글 조회 실패:', error)
    return []
  }
}

// 게시글 추가
export const createPost = async (post: Post, imageFile: File | null) => {
  try {
    const formData = new FormData()
    const jsonData = JSON.stringify({
      category: post.category,
      title: post.title,
      content: post.content,
    })

    formData.append('title', jsonData)
    if (imageFile) formData.append('image', imageFile)
    formData.append('channelId', CHANNEL_ID)

    await axios.post(`${API_BASE_URL}/posts/create`, formData, {
      headers: {
        Authorization: `Bearer ${ADMIN_TOKEN}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log('✅ 게시글 추가 성공!')
  } catch (error) {
    console.error('❌ 게시글 추가 실패:', error)
  }
}

// 게시글 수정
export const updatePost = async (postId: string, post: Post, imageFile: File | null) => {
  try {
    const formData = new FormData()
    const jsonData = JSON.stringify({
      category: post.category,
      title: post.title,
      content: post.content,
    })

    formData.append('title', jsonData)
    if (imageFile) formData.append('image', imageFile)
    formData.append('postId', postId)
    formData.append('channelId', CHANNEL_ID)

    await axios.put(`${API_BASE_URL}/posts/update`, formData, {
      headers: {
        Authorization: `Bearer ${ADMIN_TOKEN}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log('✅ 게시글 수정 성공!')
  } catch (error) {
    console.error('❌ 게시글 수정 실패:', error)
  }
}

// 게시글 삭제
export const deletePost = async (postId: string) => {
  try {
    await axios.delete(`${API_BASE_URL}/posts/delete`, {
      headers: {
        Authorization: `Bearer ${ADMIN_TOKEN}`,
        'Content-Type': 'application/json',
      },
      data: { id: postId },
    })
    console.log('✅ 게시글 삭제 성공!')
  } catch (error) {
    console.error('❌ 게시글 삭제 실패:', error)
  }
}
