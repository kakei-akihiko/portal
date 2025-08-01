import { createRouter, createWebHashHistory } from 'vue-router'
import RootView from '../views/RootView.vue'

const routes = [
  {
    path: '/',
    name: 'root',
    component: RootView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
