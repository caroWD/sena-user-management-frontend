import { create } from 'zustand'

export type Gender = 'male' | 'female' | 'non-binary'

export type Role = 'admin' | 'suport' | 'regular'

export type TokenProfile = {
  accessToken?: string
  refreshToken?: string
}

export type AuthProfile = {
  id: string
  username: string
  fullName: string
  gender: Gender
  email: string
  admin: boolean
}

export type UserProfile = {
  id: string
  username: string
  firstName: string
  lastName: string
  fullName: string
  gender: Gender
  avatar: string | null
  email: string
  role?: Role
  createdAt: string
  updatedAt: string
  deletedAt?: string | null
}

type ProfileState = {
  token: TokenProfile | null
  auth: AuthProfile | null
  user: UserProfile | null
}

type ProfileAction = {
  setToken: (token: ProfileState['token']) => void
  setAuth: (auth: ProfileState['auth']) => void
  setUser: (user: ProfileState['user']) => void
}

const getToken = () =>
  typeof localStorage === 'undefined' || !localStorage.getItem('tokens')
    ? null
    : (JSON.parse(localStorage.getItem('tokens')!) as TokenProfile)

export const useProfileStore = create<ProfileState & ProfileAction>()(
  (set) => ({
    token: getToken(),
    auth: null,
    user: null,
    setToken: (newToken) => set(() => ({ token: newToken })),
    setAuth: (newAuth) => set(() => ({ auth: newAuth })),
    setUser: (newUser) => set(() => ({ user: newUser })),
  })
)
