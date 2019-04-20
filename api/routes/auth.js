const btoa = require('btoa')
const config = require('config')
const fetch = require('node-fetch')
const router = require('express').Router()

const CLIENT_ID = config.get('discord.clientId')
const CLIENT_SECRET = config.get('discord.clientSecret')
const API_URL = config.get('api.apiUrl')

const redirect = encodeURIComponent(`${API_URL}/auth/callback`)

/**
 * Direct user to Discord for Oauth2
 */
router.get('/', (req, res) => {
  if (req.query.return) { // Allow app to specify redirect for end of process
    req.session.postAuthRedirect = req.query.return
  }

  res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirect}&response_type=code&scope=identify%20guilds`)
})

/**
 * Handle user returning from discord. Direct user to front-end site.
 */
router.get('/callback', async (req, res, next) => {
  try {
    if (!req.query.code) throw new Error('missing callback code from discord')
    const code = req.query.code
    const auth = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)

    const authResponse = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`
      }
    })
    const authData = await authResponse.json()

    if (!authData.access_token) throw new Error('no access token provided by discord')
    const userToken = authData.access_token

    const userDataResponse = await fetch(`http://discordapp.com/api/users/@me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
    const userData = await userDataResponse.json()

    if (!userData.id) throw new Error('no user id provided by discord')
    req.session.authData = authData
    req.session.userData = userData

    if (req.session.postAuthRedirect) {
      return res.redirect(req.session.postAuthRedirect)
    }
    res.status(200).json(userData)
  } catch (e) {
    next(e)
  }
})

module.exports = router
