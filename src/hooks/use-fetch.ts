import { useEffect, useState } from 'react'

type FetchData<T> = T | null

type FetchError = Error | null

interface FetchResponse<T> {
  data: FetchData<T>
  loading: boolean
  error: FetchError
}

export const useFetch = <T>(url: string): FetchResponse<T> => {
  const [data, setData] = useState<FetchData<T>>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<FetchError>(null)

  useEffect(() => {
    const fetchController = new AbortController()

    const fetchData = async () => {
      setLoading(true)

      try {
        const response = await fetch(url, {
          signal: fetchController.signal,
        })

        if (!response.ok) throw new Error('Algo salio mal con la petición')

        const responseData = (await response.json()) as T

        setData(responseData)
      } catch (error) {
        setError(error as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => {
      fetchController.abort()
    }
  }, [url])

  return { data, loading, error }
}
