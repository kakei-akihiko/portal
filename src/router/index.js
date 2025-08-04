import { createRouter, createWebHashHistory } from 'vue-router'
import ArticlesListPage from '../views/articles/ArticlesListPage.vue'

const routes = [
  {
    path: '/',
    name: 'ArticlesListPage',
    component: ArticlesListPage
  },
  {
    path: '/categories',
    name: 'CategoryPage',
    component: () => import(/* webpackChunkName: "settings" */ '../views/articles/ArticlesListPage.vue')
  },  
  {
    path: '/settings',
    name: 'SettingPage',
    component: () => import(/* webpackChunkName: "settings" */ '../views/articles/ArticlesListPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
