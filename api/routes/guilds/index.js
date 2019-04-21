const db = require('../../db')
const discordApi = require('../../utils/discord-api')
const router = require('express').Router()

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

    for (const role of guild.roles) {

    }

    // No role found with high enough priv, return 403
    const err = new Error('user does not have admin privilege')
    err.statusCode = 403

    throw err
  } catch (e) {
    next(e)
  }
}

router.get('/', async (req, res) => {
  res.sendStatus(403) // admin only and not implemented
})

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

router.post('/:guildId/role-categories')

module.exports = router
