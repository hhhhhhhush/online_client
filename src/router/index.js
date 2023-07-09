import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

]

const router = new VueRouter({
  routes: [
    { path: '/', component: () => import('@/views/LoginPage.vue'), redirect: '/login', },
    { path: '/login', component: () => import('@/views/LoginPage.vue') },
    {
      path: '/home', component: () => import('@/views/HomePage.vue'), children: [
        { path: '/home/personal', component: () => import('@/views/children/PersonalPage.vue') }
      ]
    },
  ]
})

export default router
