const API_URL = process.env.VUE_APP_API || 'http://localhost:9000'

async function apiFetch (url, config, body) {
  if (!config) config = {}
  if (!config.headers) config.headers = {}
  if (['put', 'post'].includes(config.method)) {
    config.headers['Content-Type'] = 'application/json'
  }

  if (config.body) {
    config.body = JSON.stringify(config.body)
  }

  config.credentials = 'include'

  const res = await fetch(url, config)
  const data = res.json()

  if (!res.ok) {
    const err = new Error(data.message)
    err.statusCode = res.status
    err.detail = data.details

    throw err
  }

  return data
}

export function login (returnPath) {
  window.location.href = `${API_URL}/auth?return=${encodeURIComponent(returnPath)}`
}

export function fetchMe () {
  return apiFetch(`${API_URL}/users/me`)
}

export function fetchGuild (snowflake) {
  return apiFetch(`${API_URL}/guilds/${snowflake}`)
}

export function fetchRoles (snowflake) {
  return apiFetch(`${API_URL}/guilds/${snowflake}/roles`)
}

export function postRole (guild, body) {
  return apiFetch(`${API_URL}/guilds/${guild}/roles`, {
    body,
    method: 'post'
  })
}

export function putRole (guild, role, body) {
  return apiFetch(`${API_URL}/guilds/${guild}/roles/${role}`, {
    body,
    method: 'put'
  })
}

export function fetchCategories (snowflake) {
 return apiFetch(`${API_URL}/guilds/${snowflake}/role-categories`)
}

export function fetchHeldRoles (snowflake) {
  return apiFetch(`${API_URL}/guilds/${snowflake}/members/@me/roles`)
}
