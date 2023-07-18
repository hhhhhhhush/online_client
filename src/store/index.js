import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    shopcarInfo: []
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
    // 购物车信息
    addToCart(state, item) {
      const existId = state.shopcarInfo.find(course => course.id === item.id);
      if( existId ) {
        console.log(existId)
        // console.log(state.shopcarInfo)
        existId.quantity += 1
      } else {
        state.shopcarInfo.push(item)
      }

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
