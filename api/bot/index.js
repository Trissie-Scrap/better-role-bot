const Discord = require('discord.js')
const config = require('config')

const BOT_TOKEN = config.get('db.pass')

const client = new Discord.Client()

client.on('ready', () => {

})

client.login(BOT_TOKEN)
