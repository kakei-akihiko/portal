import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store, { dependances } from './store'

import 'bootstrap/dist/css/bootstrap.css'

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

const settingRepository = new SettingRepository(dependances.articlesDatabase)
const settingService = new SettingService(settingRepository)

dependances.settingService = settingService

Vue.createApp({
  render: h => h(App)
}).use(router).use(store).mount('#app')
