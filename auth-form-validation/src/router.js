import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import SignUp from '@/views/SignUp'

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
    }
  ]
})
