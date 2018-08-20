import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

export const initialState = () => ({
  data: null,
  idToken: null,
  refreshToken: null,
  expiresIn: 0,
  logoutTimer: NaN
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
    SET_EXPIRES(state, n) { state.expiresIn = Date.now() + Number(n) * 1000 },
    SET_LOGOUT_TIMER(state, n) { state.logoutTimer = n },
    RESET_STATE(state) {
      const reset = initialState()
      Object.keys(state).forEach(k => state[k] = reset[k])
    }
  },
  actions: {
    async 'save-user-data'({ commit }, payload) {
      commit('SET_DATA', payload)
    },
    async 'save-token-data'({ commit }, payload) {
      commit('SET_ID_TOKEN', payload.idToken)
      commit('SET_REFRESH_TOKEN', payload.refreshToken)
      commit('SET_EXPIRES', payload.expiresIn)
    },
    async 'save-user-session'({ state }) {
      localStorage.setItem('idToken', state.idToken)
      localStorage.setItem('expiresIn', String(state.expiresIn))
    },
    async 'logout-user'({ state, commit }) {
      clearTimeout(state.logoutTimer)
      commit('RESET_STATE')
      router.push('/')
    },
    async 'logout-timer'({ commit, dispatch }, logoutInNextSeconds) {
      return new Promise((res, _) => {
        const timer = setTimeout(
          () => res(dispatch('logout-user')),
          logoutInNextSeconds
        )
        commit('SET_LOGOUT_TIMER', timer)
      })
    },
    async 'auto-logout-user'({ dispatch, state }) {
      const tokenActiveTime = state.expiresIn - Date.now()

      if(tokenActiveTime > 0) {
        return dispatch('logout-timer', tokenActiveTime)
      } else {
        return dispatch('logout-user')
      }
    },
    async 'auto-login-user'() {
    }
  }
})
