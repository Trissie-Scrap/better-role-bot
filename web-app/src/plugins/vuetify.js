import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#607d8b',
    secondary: '#3f51b5',
    accent: '#009688',
    error: '#f44336',
    warning: '#ff9800',
    info: '#03a9f4',
    success: '#8bc34a'
  }
})
