const API_URL = process.env.VUE_APP_API || 'http://localhost:9000'

export function login (returnPath) {
  window.location.href = `${API_URL}/auth?return=${encodeURIComponent(returnPath)}`
}

export async function fetchMe () {
  const res = await fetch(`${API_URL}/users/me`, { credentials: 'include' })
  const data = await res.json()
  console.log(data)
  return data
}
