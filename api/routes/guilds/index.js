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
    res.status(201).json(newRoleCategory)
  } catch (e) {
    next(e)
  }
})

// put role category
router.put('/:guildId/role-categories/:categoryId', ensureUserIsInGuild, ensureUserIsGuildAdmin, async (req, res, next) => {
  try {
    const roleCategory = await db.models.RoleCategory.findByPk(req.params.categoryId)

    if (!roleCategory || roleCategory.guildSnowflake !== req.params.guildId) {
      const err = new Error('specified role-category does not exist in specified guild')
      err.statusCode = 404

      throw err
    }

    await roleCategory.update({
      name: req.body.name,
      description: req.body.description,
      exclusive: req.body.exclusive
    })

    res.status(200).json(roleCategory)
  } catch (e) {
    next(e)
  }
})

// set category for role
router.put('/:guildId/roles/:roleId', ensureUserIsInGuild, ensureUserIsGuildAdmin, async (req, res, next) => {
  try {
    if (!req.body.categoryId) {
      const err = new Error('no category specified')
      err.statusCode = 422

      throw err
    }

    const category = await db.models.RoleCategory.findByPk(req.body.categoryId)
    if (!category || category.guildSnowflake !== req.params.guildId) {
      const err = new Error('specified category does not exist in specified guild')
      err.statusCode = 422

      throw err
    }

    const role = await db.models.Role.findByPk(req.params.roleId)
    if (!role || role.guildSnowflake !== req.params.guildId) {
      const err = new Error('specified role does not exist in specified guild')
      err.statusCode = 404

      throw err
    }

    await role.update({
      categoryId: req.body.categoryId
    })

    res.status(200).json(role)
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
        guildSnowflake: req.params.guildId
      }
    })

    const memberRoles = req.member.roles

    const data = []
    for (const category of categories) {
      const categoryPlain = category.get({ plain: true })
      categoryPlain.roles = []

      const categoryRoles = roles.filter(role => role.categoryId === category.id)
      for (const role of categoryRoles) {
        categoryPlain.roles.push({
          ...role.get({ plain: true }),
          memberHas: memberRoles.includes(role.snowflake)
        })
      }

      data.push(categoryPlain)
    }

    res.status(200).json(data)
  } catch (e) {
    next(e)
  }
})

module.exports = router
