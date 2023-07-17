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
      const { id } = item;
      if (state.shopcarInfo[id]) {
        // 商品已存在，增加数量
        state.shopcarInfo[id].quantity += 1;
      } else {
        // 商品不存在，添加到购物车
        state.shopcarInfo[id] = { ...item, quantity: 1 };
      }
    },
    updateCartItem(state, { id, quantity }) {
      if (state.shopcarInfo[id]) {
        state.shopcarInfo[id].quantity = quantity;
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
