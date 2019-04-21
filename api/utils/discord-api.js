const config = require('config')
const fetch = require('node-fetch')

const BOT_TOKEN = config.get('discord.botToken')

async function discordApi (endpoint, method, body) {
  const res = await fetch(`http://discordapp.com/api${endpoint}`, {
    method: method,
    headers: {
      Authorization: `Bot ${BOT_TOKEN}`
    }
  })

  const decoded = await res.json()
  return decoded
}

function getBot () {
  return discordApi(`/users/@me`, 'GET')
}

async function getBotGuilds () {
  const guilds = []
  let getAfter = ''

  while (true) {
    const page = await discordApi(`/users/@me/guilds?limit=100` + (getAfter ? `&after=${getAfter}` : ''))

    for (const guild of page) {
      guilds.push(guild)
    }

    if (page.length < 100) {
      break
    }

    getAfter = page[99].id
  }

  return guilds
}

function getGuild (guildId) {
  return discordApi(`/guilds/${guildId}`)
}

function getGuildMember (guildId, userId) {
  return discordApi(`/guilds/${guildId}/members/${userId}`)
}

module.exports = {
  getBot,
  getBotGuilds,
  getGuild,
  getGuildMember
}
