const Discord = require('discord.js')
const config = require('config')
const debug = require('debug')('brb:bot')

const BOT_TOKEN = config.get('discord.botToken')

const client = new Discord.Client()

client.on('ready', () => {
  debug('bot readied')
})

client.login(BOT_TOKEN)
