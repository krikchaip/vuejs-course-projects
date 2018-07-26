import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Portfolio from './views/Portfolio.vue'
import Stocks from './views/Stocks.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/portfolio',
      name: 'Portfolio',
      component: Portfolio
    },
    {
      path: '/stocks',
      name: 'Stocks',
      component: Stocks
    }
  ]
})
