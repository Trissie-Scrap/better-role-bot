import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import(/* webpackChunkName: "test" */ './views/Tester.vue')
    },
    {
      path: '/g/:snowflake/u',
      name: 'userFlow',
      component: () => import(/* webpackChunkName: "userFlow" */ './views/UserFlow.vue')
    },
    {
      path: '/g/:snowflake/a',
      name: 'adminFlow',
      component: () => import(/* webpackChunkName: "adminFlow" */ './views/AdminFlow.vue')
    },
    {
      path: '/login/success',
      component: () => import(/* webpackChunkName: "loginSuccess" */ './views/LoginSuccess.vue')
    },
    {
      path: '*',
      name: '404',
      component: () => import(/* webpackChunkName: "404" */ './views/Err404.vue')
    }
  ]
})
