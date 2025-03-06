import type { Post } from './community/communityType'

export interface UserType {
  _id: string
  email: string
  fullName: string
  coverImage: string
  image: string
  role: 'user' | 'admin'
  isOnline: boolean
  post: Post[]
  likes: LikesType[]
  comments: string[]
  followers: FollowersType[]
  following: FollowingType[]
  createdAt: string
}

export interface LikesType {
  _id: string
  user: string
  post: string
  createdAt: string
  updatedAt: string
}

export interface FollowersType {
  _id: string
  user: string
  follower: string
  createdAt: string
  updatedAt: string
}

export interface FollowingType {
  _id: string
  user: string
  follower: string
  createdAt: string
  updatedAt: string
}
