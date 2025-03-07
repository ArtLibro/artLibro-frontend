import axiosApi from '@/config/axiosConfig'
import { USER_ENDPOINT } from './endpoint'
import type { UserType } from '@/types/user'

// 유저 정보 조회
export const getUserInfo = async (userId: string): Promise<UserType> => {
  const response = await axiosApi.get(`${USER_ENDPOINT.userInfo}/${userId}`)

  return response.data
}

// 유저 정보 수정
/** 성공 시 true, 실패 시 false 반환 */
export const updateUserInfo = async (fullName: string): Promise<boolean> => {
  try {
    await axiosApi.put(`${USER_ENDPOINT.userInfoEdit}`, { fullName })

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

// 유저 이미지 업로드
/** 성공 시 true, 실패 시 false 반환 */
export const uploadUserImage = async (formData: FormData): Promise<boolean> => {
  try {
    await axiosApi.post(`${USER_ENDPOINT.userImageUpload}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
