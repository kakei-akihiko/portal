import Vue from 'vue'
import Vuex from 'vuex'

import {articles} from './storeModules/articles.js'
import {settings} from './storeModules/settings.js'
import {todo} from './storeModules/todo.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    articles,
    settings,
    todo,
  },
})
