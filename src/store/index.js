import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null
  },
  getters: {
  },
  mutations: {
    setUser(state, user) { // 更新用户信息的 mutation
      state.userInfo = user;
    },
  },
  actions: {
  },
  modules: {
  }
})
