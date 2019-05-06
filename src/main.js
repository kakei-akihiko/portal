import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BootstrapVue from 'bootstrap-vue'
import './assets/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import FullHeight from '@/components/templates/FullHeight.vue'

// BootStrap Vueバグ対策

let originalVueComponent = Vue.component
Vue.component = function (name, definition) {
  if (name === 'bFormCheckboxGroup' || name === 'bCheckboxGroup' ||
      name === 'bCheckGroup' || name === 'bFormRadioGroup') {
    definition.components = {bFormCheckbox: definition.components[0]}
  }
  originalVueComponent.apply(this, [name, definition])
}
Vue.use(BootstrapVue)
Vue.component = originalVueComponent

Vue.component('FullHeight', FullHeight)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
