const API_URL = process.env.VUE_APP_API || 'http://localhost:9000'

function apiFetch(url, config, body) {
  if (!config.headers) config.headers = {}
  if (['put', 'post'].includes(config.method)) {
    config.headers['Content-Type']  = 'application/json'
  }

  if (config.body) {
    config.body = JSON.stringify(config.body)
  }

  config.credentials = 'include'

  return fetch(url, config)
}

export function login (returnPath) {
  window.location.href = `${API_URL}/auth?return=${encodeURIComponent(returnPath)}`
}

export async function fetchMe () {
  const res = await apiFetch(`${API_URL}/users/me`)
  const data = await res.json()

  return data
}

export async function fetchGuild (snowflake) {
  const res = await apiFetch(`${API_URL}/guilds/${snowflake}`)
  const data = await res.json()

  return data
}

export async function fetchRoles (snowflake) {
  const res = await apiFetch(`${API_URL}/guilds/${snowflake}/roles`)
  const data = await res.json()

  return data
}

export async function putRole (guild, role, body) {
  const res = await apiFetch(`${API_URL}/guilds/${guild}/roles/${role}`, {
    body,
    method: 'put'
  })
  const data = await res.json()

  return data
}

export async function fetchCategories (snowflake) {
  const res = await apiFetch(`${API_URL}/guilds/${snowflake}/role-categories`)
  const data = await res.json()

  return data
}

export async function fetchHeldRoles (snowflake) {
  const res = await apiFetch(`${API_URL}/guilds/${snowflake}/members/@me/roles`)
  const data = await res.json()

  return data
}
