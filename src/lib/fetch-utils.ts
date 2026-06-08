type FetchMethod =
  | 'GET'
  | 'PUT'
  | 'POST'
  | 'PATCH'
  | 'DELETE'
  | 'OPTIONS'
  | 'QUERY'
  | 'HEAD'

type FetchContentType =
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'
  | 'text/plain'
  | 'text/html'

type FetchHeader =
  | ['Content-Type', FetchContentType]
  | ['Authorization', `Bearer ${string}`]

type FetchCredentials = 'same-origin' | 'include' | 'omit'

type FetchResponse<T> = T | null

type FetchOptions<T> = {
  request?: T
  method?: FetchMethod
  headers?: FetchHeader[]
  credentials?: FetchCredentials
}

export const fetchData = async <T, R>(
  url: string,
  options: FetchOptions<R>
): Promise<FetchResponse<T>> => {
  const { request, method, headers, credentials } = options

  const controller = new AbortController()

  try {
    const response = !method
      ? await fetch(url, { signal: controller.signal })
      : await fetch(url, {
          method,
          headers,
          credentials,
          body: JSON.stringify(request),
          signal: controller.signal,
        })

    if (!response.ok)
      throw new Error('La petición <<fetch>> fallo', {
        cause: response.statusText,
      })

    return (await response.json()) as T
  } catch (error) {
    if (error instanceof Error) console.error(error.message, error.cause)

    console.error(error)
  } finally {
    controller.abort()
  }

  return null
}
