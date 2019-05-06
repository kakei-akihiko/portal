
import Storage from '@/storeModules/storage.js'

export const settings = {
  namespaced: true,

  state: {
    background: {
      url: null,
      opacity: 0.3,
      height: '50%',
    }
  },

  mutations: {
    setBackground(state, {url, opacity, height} = {}) {
      state.background = {url, opacity, height}
    },
  },

  actions: {
    setBackground({commit}, {url, opacity, height} = {}) {
      const background = {url, opacity, height}
      commit('setBackground', background)
      Storage.setSettings({settings: {background}})
    },

    loadBackground({commit}) {
      const settings = Storage.loadSettings()
      if (settings != null) {
        commit('setBackground', settings.background)
      }
    },
  }
}
