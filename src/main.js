import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store, { dependances } from './store'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import NotFoundAlert from '@/components/alerts/NotFoundAlert.vue'
import FullHeight from '@/components/layouts/FullHeight.vue'
import TheMainLayout from '@/components/layouts/TheMainLayout.vue'
import TheSidebar from '@/components/sidebar/TheSidebar.vue'

import SettingRepository from '@/infrastructure/SettingRepository.js'
import SettingService from '@/usecases/SettingService.js'

Vue.component('NotFoundAlert', NotFoundAlert)
Vue.component('FullHeight', FullHeight)
Vue.component('TheMainLayout', TheMainLayout)
Vue.component('TheSidebar', TheSidebar)

Vue.config.productionTip = false

Vue.use(BootstrapVue)

const settingRepository = new SettingRepository(dependances.articlesDatabase)
const settingService = new SettingService(settingRepository)

dependances.settingService = settingService

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
