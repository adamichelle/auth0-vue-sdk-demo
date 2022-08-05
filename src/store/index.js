import { createStore } from 'vuex'

export default createStore({
  state: {
    showAuthButton: true,
    isAuthenticated: false
  },
  getters: {
  },
  mutations: {
    updateAuthButtonVisibility (state, { fullPath }) {
      state.showAuthButton = fullPath === '/' || fullPath === '/about'
    },
    updateAuthenticationStatus (state, { isAuthenticated }) {
      state.isAuthenticated = isAuthenticated
    }
  },
  actions: {
  },
  modules: {
  }
})
