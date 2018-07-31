import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    funds: 10000
  },
  getters: {
    funds: ({ funds }) => {
      if(typeof funds !== 'number')
        throw Error('funds is not a Number')

      return funds.toLocaleString('en-US')
    }
  },
  mutations: {
  },
  actions: {
  }
})
