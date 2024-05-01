import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Login from '../views/login.vue'
import Home from '../views/home.vue'
import Data from '@/views/main/data.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'homePage',
      component: Home,
      children:[
        {
          path: '/data',
          name: 'dataPage',
          component: Data
        }
      ]
    }
  ]
})

export default router
