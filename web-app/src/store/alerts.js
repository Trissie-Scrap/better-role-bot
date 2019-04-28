const state = {
  alerts: []
}

const mutations = {
  pushAlert: (state, alert) => {
    state.alerts.push(alert)
  }
}

const actions = {
  throwError: async ({ commit, dispatch }, e) => {
    console.error(e)
  }
}

const module = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default module
