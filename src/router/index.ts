import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:id',
      name: 'details',
      component: Main
    },
    {
      path: '/',
      name: 'home',
      component: Main
    },
  ]
})

export default router
