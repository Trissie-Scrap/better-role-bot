import Vue from 'vue'
import Vuex from 'vuex'

import users from './users'
import guilds from './guilds'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    guilds
  }
})
