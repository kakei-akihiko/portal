import Vue from 'vue'
import Router from 'vue-router'
import SettingsPage from './views/SettingsPage.vue'
import TagAndTextPage from './views/TagAndTextPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'tag-and-text-page',
      component: TagAndTextPage,
    },
    {
      path: '/settings',
      name: 'settings-page',
      component: SettingsPage,
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
    }
  ]
})
