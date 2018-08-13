import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const containStock = (newEntry, stocks) =>
  !!stocks.filter(s => s.name === newEntry.name)[0]

export default new Vuex.Store({
  state: {
    funds: 10000,
    stocks: []
  },
  getters: {
    funds: ({ funds }) => funds.toLocaleString('en-US')
  },
  mutations: {
    WITHDRAW_FUNDS(state, n) {
      state.funds -= n
    },
    UPDATE_STOCK(state, data) {
      const target = state.stocks.findIndex(s => s.name === data.name)
      state.stocks[target].quantity += data.quantity
    },
    ADD_STOCKS(state, newStock) {
      state.stocks = state.stocks.concat([newStock])
    }
  },
  actions: {
    async 'make-payment'({ commit }, amount) {
      if(amount < 0) {
        throw new Error('amount should not be negative')
      }
      commit('WITHDRAW_FUNDS', amount)
    },
    async 'add-user-stock'({ state, commit }, stockData) {
      if(stockData.quantity < 1) {
        throw new Error('quantity should greater than 0')
      }
      if(containStock(stockData, state.stocks)) {
        commit('UPDATE_STOCK', stockData)
      } else {
        commit('ADD_STOCKS', stockData)
      }
    }
  }
})
