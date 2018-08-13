import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    funds: 10000,
    stocks: []
  },
  getters: {
    funds: ({ funds }) => funds.toLocaleString('en-US'),
    containStock: ({ stocks }) => name =>
      !!stocks.filter(s => s.name === name)[0],
    priceOf: ({ stocks }) => name =>
      stocks.filter(s => s.name === name)[0].price,
    stockIsEmpty: ({ stocks }) => name =>
      stocks.filter(s => s.name === name)[0].quantity <= 0
  },
  mutations: {
    WITHDRAW_FUNDS(state, n) {
      state.funds -= n
    },
    ADD_FUNDS(state, n) {
      state.funds += n
    },
    INC_QUANTITY(state, data) {
      const target = state.stocks.findIndex(s => s.name === data.name)
      state.stocks[target].quantity += data.quantity
    },
    DEC_QUANTITY(state, data) {
      const target = state.stocks.findIndex(s => s.name === data.name)
      state.stocks[target].quantity -= data.quantity
    },
    ADD_STOCK(state, newStock) {
      state.stocks = state.stocks.concat([newStock])
    },
    REMOVE_STOCK(state, name) {
      const target = state.stocks.findIndex(s => s.name === name)
      state.stocks.splice(target, 1)
    }
  },
  actions: {
    async 'make-payment'({ commit }, amount) {
      if(amount < 0) {
        throw new Error('amount should not be negative')
      }
      commit('WITHDRAW_FUNDS', amount)
    },
    async 'add-user-stock'({ getters, commit }, stockData) {
      if(stockData.quantity < 1) {
        throw new Error('quantity should greater than 0')
      }
      if(getters.containStock(stockData.name)) {
        commit('INC_QUANTITY', stockData)
      } else {
        commit('ADD_STOCK', stockData)
      }
    },
    async 'sell-stock'({ getters, commit }, data) {
      commit('DEC_QUANTITY', data)
      commit('ADD_FUNDS', getters.priceOf(data.name) * data.quantity)

      if(getters.stockIsEmpty(data.name)) {
        commit('REMOVE_STOCK', data.name)
      }
    }
  }
})
