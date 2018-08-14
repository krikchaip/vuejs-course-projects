import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const randomSign = () => Math.random() < 0.5 ? -1 : 1
const randomRange = (a, b) => Math.round(Math.random() * b) + a

const repairFunds = incoming => {
  if(typeof incoming.funds !== 'number') {
    incoming.funds = 10000
  }
}
const repairStocks = incoming => {
  if(!(incoming.stocks instanceof Array)) {
    incoming.stocks = []
  }
}

const initialState = () => ({
  funds: 10000,
  stocks: [],
  stocksData: [
    { name: 'BMW', price: 100 },
    { name: 'Google', price: 200 },
    { name: 'Apple', price: 250 },
    { name: 'Twitter', price: 50 }
  ]
})

export default new Vuex.Store({
  state: {
    funds: 10000,
    stocks: [],
    stocksData: [
      { name: 'BMW', price: 100 },
      { name: 'Google', price: 200 },
      { name: 'Apple', price: 250 },
      { name: 'Twitter', price: 50 }
    ]
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
    SET_FUNDS(state, n) {
      state.funds = n
    },
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
    SET_STOCKS(state, stocks) {
      state.stocks = stocks
    },
    ADD_STOCK(state, newStock) {
      state.stocks = state.stocks.concat([newStock])
    },
    REMOVE_STOCK(state, name) {
      const target = state.stocks.findIndex(s => s.name === name)
      state.stocks.splice(target, 1)
    },
    SET_DATA(state, stocksData) {
      state.stocksData = stocksData
    },
    RANDOM_DATA_PRICE(state, modifier) {
      state.stocksData.forEach(s => {
        const maxRange = Math.round(s.price * modifier)
        s.price += randomSign() * randomRange(0, maxRange)
      })
    },
    UPDATE_PRICE(state) {
      state.stocks.forEach(s => {
        s.price = state.stocksData.filter(sd => sd.name === s.name)[0].price
      })
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
    },
    async 'end-day'({ getters, commit }) {
      commit('RANDOM_DATA_PRICE', 0.05)
      commit('UPDATE_PRICE')
    },
    async 'restore-data'({ commit }, incoming) {
      repairFunds(incoming)
      repairStocks(incoming)

      commit('SET_FUNDS', incoming.funds)
      commit('SET_STOCKS', incoming.stocks)
      commit('SET_DATA', incoming.stocksData)
    }
  }
})
