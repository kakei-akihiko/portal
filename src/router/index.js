import { createRouter, createWebHashHistory } from 'vue-router'
import ArticlesListPage from '../views/articles/ArticlesListPage.vue'

const routes = [
  {
    path: '/',
    name: 'ArticlesListPage',
    component: ArticlesListPage
  },
  {
    path: '/categories/:categoryId/articles/create',
    name: 'ArticleCreatePage',
    component: () => import(/* webpackChunkName: "articles" */ '../views/articles/ArticleCreatePage.vue')
  },
  {
    path: '/categories',
    name: 'CategoryPage',
    component: () => import(/* webpackChunkName: "settings" */ '../views/categories/CategoryPage.vue')
  },
  {
    path: '/categories/:id/import',
    name: 'CategoryImportPage',
    component: () => import(/* webpackChunkName: "categories" */ '../views/categories/CategoryImportPage.vue')
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
