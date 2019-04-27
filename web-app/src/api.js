const API_URL = process.env.VUE_APP_API || 'http://localhost:9000'

export function login (returnPath) {
  window.location.href = `${API_URL}/auth?return=${encodeURIComponent(returnPath)}`
}

export async function fetchMe () {
  const res = await fetch(`${API_URL}/users/me`, { credentials: 'include' })
  const data = await res.json()

  return data
}

export async function fetchGuild (snowflake) {
  const res = await fetch(`${API_URL}/guilds/${snowflake}`, { credentials: 'include' })
  const data = await res.json()

  return data
}

export async function fetchRoles (snowflake) {
  const res = await fetch(`${API_URL}/guilds/${snowflake}/roles`, { credentials: 'include' })
  const data = await res.json()

  return data
}

export async function fetchCategories (snowflake) {
  const res = await fetch(`${API_URL}/guilds/${snowflake}/role-categories`, { credentials: 'include' })
  const data = await res.json()

  return data
}

export async function fetchHeldRoles (snowflake) {
  const res = await fetch(`${API_URL}/guilds/${snowflake}/members/@me/roles`, { credentials: 'include' })
  const data = await res.json()

  return data
}
