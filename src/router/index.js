import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

]

const router = new VueRouter({
  routes: [
    { path: '/login', component: () => import('@/views/LoginPage.vue') }
  ]
})

export default router
