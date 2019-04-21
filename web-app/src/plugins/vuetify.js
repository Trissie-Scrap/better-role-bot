import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#2B767A',
    secondary: '#7AB8BB',
    accent: '#39DBBD',
    error: '#E02914',
    warning: '#B8816E',
    info: '#3BC487',
    success: '#38BA3E'
  }
})
