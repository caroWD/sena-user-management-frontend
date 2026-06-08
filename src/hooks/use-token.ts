import { VITE_API_HOST, VITE_JWT_SECRET } from '@/config'
import { jwtVerify } from 'jose'
import { useEffect, useState } from 'react'

type TokenData<T> = T | null

type TokenError = Error | null

interface TokenResponse<T> {
  data: TokenData<T>
  loading: boolean
  error: TokenError
}

export const useToken = <T>(token: string): TokenResponse<T> => {
  const [data, setData] = useState<TokenData<T>>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<TokenError>(null)

  useEffect(() => {
    const verifyToken = async () => {
      try {
        setLoading(true)

        if (!token) throw new Error('El token no está definido.')

        const { payload } = await jwtVerify(
          token,
          new TextEncoder().encode(VITE_JWT_SECRET),
          { issuer: VITE_API_HOST }
        )

        setData({ ...(payload as T) })
      } catch (error) {
        setError(error as Error)
      } finally {
        setLoading(false)
      }
    }

    verifyToken()
  }, [token])

  return { data, loading, error }
}
