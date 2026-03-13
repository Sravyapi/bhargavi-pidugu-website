export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function apiFetch<T = unknown>(
  endpoint: string,
  data?: unknown,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(endpoint, {
    method: data !== undefined ? 'POST' : 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: data !== undefined ? JSON.stringify(data) : undefined,
    ...options,
  })
  const json = await res.json()
  if (!res.ok) {
    throw new ApiError(res.status, json?.error ?? json?.message ?? 'Something went wrong')
  }
  return json as T
}
