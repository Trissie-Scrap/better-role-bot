const discordApi = require('./utils/discord-api')
const debug = require('debug')('brb:guild-sync')
const db = require('./db')

async function getGuildSyncData (guildId, botId) {
  const guild = await discordApi.getGuild(guildId)
  const botInGuild = await discordApi.getGuildMember(guildId, botId)

  let botsHighestRolePosition = 0
  for (const roleId of botInGuild.roles) {
    const role = guild.roles.find(srch => srch.id === roleId)

    if (role && role.position > botsHighestRolePosition) {
      botsHighestRolePosition = role.position
    }
  }

  const roles = []

  for (const role of guild.roles) {
    roles.push({
      snowflake: role.id,
      guildSnowflake: guild.id,
      name: role.name,
      color: role.color,
      assignable: ((botsHighestRolePosition - role.position) > 0),
      permissions: role.permissions
    })
  }

  return {
    guild: {
      snowflake: guild.id,
      name: guild.name,
      iconHash: guild.icon
    },
    roles
  }
}

async function syncGuilds () {
  const guildsAvailable = await discordApi.getBotGuilds()
  const bot = await discordApi.getBot()

  debug('%d guilds found', guildsAvailable.length)

  for (const guild of guildsAvailable) {
    try {
      const dbGuild = await db.models.Guild.findByPk(guild.id)

      if (dbGuild) {
        debug(dbGuild)
      }

      const guildData = await getGuildSyncData(guild.id, bot.id)

      // Create transaction for sync
      await db.transaction(async t => {
        await db.models.Guild.upsert({
          ...guildData.guild,
          syncedAt: new Date().toISOString()
        }, { transaction: t })

        // TODO: Something cleaner/smarter in handling roles disappearing
        await db.models.Role.destroy({
          where: {
            guildSnowflake: guildData.guild.snowflake
          },
          transaction: t
        })

        await db.models.Role.bulkCreate(guildData.roles, { transaction: t })
      })
    } catch (e) {
      debug('failed to sync guild %s for \n %O', guild.id, e)
    }
  }
}

syncGuilds()
  .then(() => {
    debug('guilds synced successfully')
  })
  .catch((e) => {
    debug('something went wrong %O', e)
  })
