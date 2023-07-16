import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    shopcarInfo: null
  },
  getters: {
  },
  mutations: {
    setUser(state, user) { // 更新用户信息的 mutation
      state.userInfo = user;
    },
    // 更新用户信息的 mutation
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    updateData(state, newData) {
      state.userInfo = newData;
    },
  },
  actions: {
    updateDataAction({ commit }, newData) {
      commit('updateData', newData);
    },
  },
  modules: {
  }
})
