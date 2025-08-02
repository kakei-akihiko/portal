import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'

import NotFoundAlert from './components/alerts/NotFoundAlert.vue'
import FullHeight from './components/layouts/FullHeight.vue'
import TheMainLayout from './components/layouts/TheMainLayout.vue'
import TheSidebar from './components/sidebar/TheSidebar.vue'

const app = createApp(App).use(router)
app.component('NotFoundAlert', NotFoundAlert)
app.component('FullHeight', FullHeight)
app.component('TheMainLayout', TheMainLayout)
app.component('TheSidebar', TheSidebar)
app.mount('#app')
