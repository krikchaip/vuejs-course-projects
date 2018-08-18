// @ts-nocheck
import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'
import Home from '@/views/Home'
import SignUp from '@/views/SignUp'
import SignIn from '@/views/SignIn'
import Dashboard from '@/views/Dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter(to, from, next) {
        if(store.getters.isAuthenticated) {
          next()
        } else {
          next('/signin')
        }
      }
    }
  ]
})
