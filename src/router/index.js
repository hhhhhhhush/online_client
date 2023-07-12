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
      path: '/home', component: () => import('@/views/HomePage.vue'), redirect: '/home/first',children: [
        { path: '/home/personal', component: () => import('@/views/children/PersonalPage.vue') },
        { path: '/home/first', component: () => import('@/views/children/FirstPage.vue') },
        { path: '/home/total', component: () => import('@/views/children/TotalPage.vue') },
        { path: '/home/school', component: () => import('@/views/children/SchoolPage.vue') },
        { path: '/home/skill', component: () => import('@/views/children/SkillPage.vue') },
        { path: '/home/activity', component: () => import('@/views/children/ActivityPage.vue') },
      ]
    },
  ]
})

export default router
