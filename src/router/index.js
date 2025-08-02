import { createRouter, createWebHashHistory } from 'vue-router'
import ArticlesListPage from '../views/articles/ArticlesListPage.vue'

const routes = [
  {
    path: '/',
    name: 'ArticlesListPage',
    component: ArticlesListPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
