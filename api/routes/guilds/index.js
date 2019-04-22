const db = require('../../db')
const discordApi = require('../../utils/discord-api')
const router = require('express').Router()

// ensures a user is logged in, and in guild. Adds req.guild and req.member
const ensureUserIsInGuild = async (req, res, next) => {
  try {
    if (!(req.user && req.user.snowflake)) {
      const err = Error('missing user session')
      err.statusCode = 403

      throw err
    }

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

    req.guild = guild
    req.member = member

    next()
  } catch (e) {
    next(e)
  }
}

// Ensures that user is a guild admin
const ensureUserIsGuildAdmin = async (req, res, next) => {
  try {
    const guildRoles = await db.models.Role.findAll({
      where: {
        guildSnowflake: req.guild.snowflake
      }
    })

    for (const role of guildRoles) {
      if (req.member.roles.includes(role.snowflake)) {
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
router.post('/:guildId/role-categories', ensureUserIsInGuild, ensureUserIsGuildAdmin, async (req, res, next) => {
  try {
    const newRoleCategory = await db.models.RoleCategory.build({
      ...req.body,
      guildSnowflake: req.params.guildId
    })

    await newRoleCategory.validate()

    await newRoleCategory.save()
    res.status(200).json({})
  } catch (e) {
    next(e)
  }
})

// set category for role
router.patch('/:guildId/roles/:roleId', ensureUserIsInGuild, ensureUserIsGuildAdmin, async (req, res, next) => {
  try {
    if (!req.body.categoryId) {
      const err = new Error('no category specified')
      err.statusCode = 422

      throw err
    }

    const category = await db.models.RoleCategory.findByPk(req.body.categoryId)
    if (!category) {
      const err = new Error('specified category does not exist')
      err.statusCode = 422

      throw err
    }

    const role = await db.models.Role.findByPk(req.params.roleId)
    if (!role) {
      const err = new Error('role not found')
      err.statusCode = 404

      throw err
    }

    await role.update({
      categoryId: req.body.categoryId
    })

    res.status(200).json({})
  } catch (e) {
    next(e)
  }
})

// gets categories of roles on server, and lists what the user holds
router.get('/:guildId/members/@me/roles', ensureUserIsInGuild, async (req, res, next) => {
  try {
    const categories = await db.models.RoleCategory.findAll({
      where: {
        guildSnowflake: req.params.guildId
      }
    })

    const roles = await db.models.Role.findAll({
      where: {
        guildSnowflake: req.parems.guildId
      }
    })

    const memberRoles = req.member.roles

    const data = []
    for (let category in categories) {
      category = category.get({ plain: true })
      category.roles = []

      const categoryRoles = roles.filter(role => role.categoryId === category.id)
      for (let role in categoryRoles) {
        role = role.get({ plain: true })
        role.memberHas = memberRoles.includes(memberRoles)

        category.roles.push(role)
      }
    }

    res.status(200).json(data)
  } catch (e) {
    next(e)
  }
})

module.exports = router
