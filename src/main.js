import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);
Vue.config.productionTip = false
// 创建一个新的 Vue 实例作为事件总线
export const eventBus = new Vue();

const app = new Vue({
  router,
  store,
  render: h => h(App)
})
app.$mount('#app')