import { VITE_API_HOST, VITE_JWT_SECRET } from '@/config'
import type { AuthProfile, Gender } from '@/stores/use-profile-store'
import { jwtVerify } from 'jose'

type Response = {
  result: AuthProfile | null
  loading: boolean
}

export const verifyToken = (token?: string): Response => {
  let result: AuthProfile | null = null
  let loading: boolean = true

  if (!token) return { result, loading }

  const verify = async (): Promise<AuthProfile> => {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(VITE_JWT_SECRET),
      { issuer: VITE_API_HOST }
    )

    return {
      id: payload['id'] as string,
      username: payload['username'] as string,
      fullName: payload['fullname'] as string,
      gender: payload['gender'] as Gender,
      email: payload['email'] as string,
      admin: payload['admin'] as boolean,
    }
  }

  verify()
    .then((data) => (result = data))
    .catch((error) => console.error(error))
    .finally(() => (loading = false))

  return { result, loading }
}
