import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    funds: 10000,
    port: []
  },
  getters: {
    funds: ({ funds }) => {
      if(typeof funds !== 'number')
        throw Error('funds is not a Number')

      return funds.toLocaleString('en-US')
    }
  },
  mutations: {
    WITHDRAW_FUNDS: (state, amount) => {
      state.funds -= amount
    },
    ADD_STOCK: (state, stock) => {
      const existing =  state.port.map(s => s.name)
      const toAddMore = state.port.findIndex(s => s.name === stock.name)

      if(existing.includes(stock.name)) {
        state.port[toAddMore].quantity += stock.quantity
      } else {
        state.port.push(stock)
      }
    }
  }
})
