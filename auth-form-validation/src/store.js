import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const initialState = () => ({
  data: null,
  idToken: null,
  refreshToken: null,
  expiresIn: 0
})

export default new Vuex.Store({
  state: initialState(),
  getters: {
    isAuthenticated(state) { return !!state.idToken }
  },
  mutations: {
    SET_DATA(state, newData) { state.data = newData },
    SET_ID_TOKEN(state, token) { state.idToken = token },
    SET_REFRESH_TOKEN(state, token) { state.refreshToken = token },
    SET_EXPIRES(state, n) { state.expiresIn = Date.now() + Number(n) }
  },
  actions: {
    async 'save-user-data'({ commit }, payload) {
      commit('SET_DATA', payload)
    },
    async 'save-token-data'({ commit }, payload) {
      commit('SET_ID_TOKEN', payload.idToken)
      commit('SET_REFRESH_TOKEN', payload.refreshToken)
      commit('SET_EXPIRES', payload.expiresIn)
    }
  }
})
