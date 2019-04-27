import { fetchGuild, fetchRoles, fetchCategories, fetchHeldRoles } from '../api'

const state = {
  selected: {
    guild: {
      snowflake: '',
      name: '',
      iconHash: '',
      syncedAt: ''
    },
    roles: [],
    categories: [],
    held: []
  }
}

const mutations = {
  setGuild: (state, guild) => {
    state.selected.guild = guild
  },
  setRoles: (state, roles) => {
    state.selected.roles = roles
  },
  setCategories: (state, categories) => {
    state.selected.categories = categories
  },
  setHeldRoles: (state, held) => {
    state.selected.held = held
  }
}

const actions = {
  fetchGuild: async ({ commit, dispatch }, snowflake) => {
    dispatch('wait/start', 'guilds.fetchGuild', { root: true })

    try {
      const me = await fetchGuild(snowflake)
      commit('setGuild', me)
    } catch (e) {
      dispatch('alerts/throwError', e, { root: true })
    } finally {
      dispatch('wait/end', 'guilds.fetchGuild', { root: true })
    }
  },
  fetchRoles: async ({ commit, dispatch, state }) => {
    dispatch('wait/start', 'guilds.fetchRoles', { root: true })

    try {
      const me = await fetchRoles(state.selected.guild.snowflake)
      commit('setRoles', me)
    } catch (e) {
      dispatch('alerts/throwError', e, { root: true })
    } finally {
      dispatch('wait/end', 'guilds.fetchRoles', { root: true })
    }
  },
  fetchCategories: async ({ commit, dispatch, state }) => {
    dispatch('wait/start', 'guilds.fetchCategories', { root: true })

    try {
      const me = await fetchCategories(state.selected.guild.snowflake)
      commit('setCategories', me)
    } catch (e) {
      dispatch('alerts/throwError', e, { root: true })
    } finally {
      dispatch('wait/end', 'guilds.fetchCategories', { root: true })
    }
  },
  fetchHeldRoles: async ({ commit, dispatch, state }) => {
    dispatch('wait/start', 'guilds.fetchHeldRoles', { root: true })

    try {
      const me = await fetchHeldRoles(state.selected.guild.snowflake)
      commit('setHeldRoles', me)
    } catch (e) {
      dispatch('alerts/throwError', e, { root: true })
    } finally {
      dispatch('wait/end', 'guilds.fetchHeldRoles', { root: true })
    }
  },
  fetchGuildData: async ({ commit, dispatch }, guildId) => {
    await dispatch('fetchGuild', guildId)

    await Promise.all([
      dispatch('fetchRoles'),
      dispatch('fetchCategories'),
      dispatch('fetchHeldRoles')])
  }
}

const getters = {
}

const module = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default module