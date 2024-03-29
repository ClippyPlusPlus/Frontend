import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import { MESSAGE_TIMEOUT } from '../utils/constants'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
]

const router = new VueRouter({
  routes
})

export default router
