const Discord = require('discord.js')
const config = require('config')
const debug = require('debug')('brb:bot')

const BOT_TOKEN = config.get('discord.botToken')
const FRONTEND_URL = config.get('api.frontendUrl')

const client = new Discord.Client()

client.on('ready', () => {
  debug('bot readied')
})

client.on('message', (message) => {
  if (message.mentions.members.has(client.user.id)) {
    message.reply(`Hiya ${message.member.displayName}, edit your roles for ${message.guild.name} at ${FRONTEND_URL}/#/s/${message.guild.id}`)
  }
  if (message.content === 'BRB Ping Plz') {
    message.reply(`Current Ping: ${client.ping}ms`)
  }
})

client.login(BOT_TOKEN)
