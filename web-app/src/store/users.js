import { login, fetchMe } from '../api'

const stateTemplate = {
  me: {
    username: null,
    snowflake: null,
    avatarHash: null
  }
}

const mutations = {
  setMe: (state, user) => {
    state.me = {
      username: user.username,
      snowflake: user.snowflake,
      avatarHash: user.avatarHash
    }
  }
}

const actions = {
  login: (ctx, returnPath) => {
    login(returnPath)
  },
  fetchMe: async ({ commit, dispatch }) => {
    dispatch('wait/start', 'users.fetchMe', { root: true })

    try {
      const me = await fetchMe()
      commit('setMe', me)
    } catch (e) {
      commit('setMe', stateTemplate.me)
      if (!(e.statusCode && e.statusCode === 401)) {
        dispatch('alerts/throwError', e, { root: true })
      }
    } finally {
      dispatch('wait/end', 'users.fetchMe', { root: true })
    }
  }
}

const getters = {
  isLoggedIn: state => {
    return !!state.me.snowflake
  }
}

const module = {
  namespaced: true,
  state: stateTemplate,
  mutations,
  actions,
  getters
}

export default module
