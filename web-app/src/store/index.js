import Vue from 'vue'
import Vuex from 'vuex'

import alerts from './alerts'
import guilds from './guilds'
import users from './users'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    alerts,
    guilds,
    users
  }
})
