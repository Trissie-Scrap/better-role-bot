const db = require('../../db')
const discordApi = require('../../utils/discord-api')
const router = require('express').Router()

// ensures a user is logged in and is an admin on the guild
const ensureUserIsGuildAdmin = async (req, res, next) => {
  try {
    if (!(req.user && req.user.snowflake)) throw new Error('missing user id')
    if (!req.params.guildId) {
      const err = new Error('missing guild id')
      err.statusCode = 422

      throw err
    }

    const guild = await db.models.Guild.findByPk(req.params.guildId)
    if (!guild) {
      const err = new Error('specified guild does not exist')
      err.statusCode = 404

      throw err
    }

    const member = await discordApi.getGuildMember(guild.snowflake, req.user.snowflake)
    if (!member) {
      const err = new Error('user is not member of guild')
      err.statusCode = 403

      throw err
    }

    const guildRoles = await db.models.Role.findAll({
      where: {
        guildSnowflake: guild.snowflake
      }
    })

    for (const role of guildRoles) {
      if (member.roles.includes(role.snowflake)) {
        if ((role.permissions & 8) === 8) {
          return next()
        }
      }
    }

    // No role found with high enough priv, return 403
    const err = new Error('user does not have admin privilege')
    err.statusCode = 403

    throw err
  } catch (e) {
    next(e)
  }
}

// get all guilds, for admin use
router.get('/', async (req, res) => {
  res.sendStatus(403) // admin only and not implemented
})

// get general guild info
router.get('/:guildId', async (req, res, next) => {
  try {
    const guild = await db.models.Guild.findByPk(req.params.guildId)

    if (!guild) {
      const err = new Error('specified guild does not exist')
      err.statusCode = 404

      throw err
    }

    res.status(200).json(guild)
  } catch (e) {
    next(e)
  }
})

// get roles for guild
router.get('/:guildId/roles', async (req, res, next) => {
  try {
    const roles = await db.models.Role.findAll({
      where: {
        guildSnowflake: req.params.guildId
      }
    })

    res.status(200).json(roles)
  } catch (e) {
    next(e)
  }
})

// get role categories for guild
router.get('/:guildId/role-categories', async (req, res, next) => {
  try {
    const roleCategories = await db.models.RoleCategory.findAll({
      where: {
        guildSnowflake: req.params.guildId
      }
    })

    res.status(200).json(roleCategories)
  } catch (e) {
    next(e)
  }
})

// create new role category for guild
router.post('/:guildId/role-categories', ensureUserIsGuildAdmin, async (req, res, next) => {
  try {
    const newRoleCategory = await db.models.RoleCategory.build({
      ...req.body,
      serverSnowflake: req.params.guildId
    })

    await newRoleCategory.validate()

    await newRoleCategory.save()
    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
})

module.exports = router
