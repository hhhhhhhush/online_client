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
      path: '/home', component: () => import('@/views/HomePage.vue'), redirect: '/home/first', children: [
        { path: '/home/personal', component: () => import('@/views/children/PersonalPage.vue') },
        { path: '/home/first', component: () => import('@/views/children/FirstPage.vue') },
        { path: '/home/total', component: () => import('@/views/children/TotalPage.vue') },
        { path: '/home/doit', component: () => import('@/views/children/DoIt.vue') },
        { path: '/home/note', component: () => import('@/views/children/StudyNote.vue') },
        { path: '/home/note/writing', component: () => import('@/views/children/WriteNow.vue') },
        { path: '/home/note/updatenote', component: () => import('@/views/children/UpdateNote.vue') },
        { path: '/home/note/detail', component: () => import('@/views/children/NoteDetail.vue') },
        { path: '/home/activity', component: () => import('@/views/children/ActivityPage.vue') },
        { path: '/home/coursedetail', component: () => import('@/views/children/CourseDetail') },
        { path: '/home/shopcar', component: () => import('@/views/children/ShoppingCar.vue') },
        { path: '/home/message', component: () => import('@/views/children/PersonalMsg.vue') },
      ]
    },
  ]
})

export default router
