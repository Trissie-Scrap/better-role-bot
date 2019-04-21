import Vue from 'vue'
import VueWait from 'vue-wait'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(VueWait)

new Vue({
  router,
  store,
  wait: new VueWait({ useVuex: true }),
  render: h => h(App)
}).$mount('#app')
