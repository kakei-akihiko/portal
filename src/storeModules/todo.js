import dayjs from 'dayjs'

export const todo = {
  namespaced: true,

  state: {
    definitions: {
      doutor: {lastCloseDate: null, visible: false},
      newton: {lastCloseDate: null, visible: false},
      itoyokado: {lastCloseDate: null, visible: false},
    },
  },

  mutations: {
    setCloseDate(state, {name} = {}) {
      state.definitions[name].lastCloseDate = dayjs().format('YYYY/MM/DD')
      state.definitions[name].visible = false
    },

    refresh(state) {
      const date = dayjs().date()
      const day = dayjs().day()
      const dayString = dayjs().format('YYYY/MM/DD')

      state.today = {date, day, dayString}

      // ドトールチャージの日…1日
      state.definitions.doutor.visible = (
        date == 1
      ) && (
        data.doutor.lastCloseDate == null
        || data.doutor.lastCloseDate < dayString
      )

      // Newton発売日前日…25日（土以外）・24日（金）
      state.definitions.newton.visible = (
        date == 25 && day != 6 || date == 24 && day == 5
      ) && (
        data.newton.lastCloseDate == null
        || data.newton.lastCloseDate < dayString
      )

      // イトーヨーカドーハッピーデー
      state.definitions.itoyokado.visible = (
        date == 8 || date == 18 || date == 28
      ) && (
        data.itoyokado.lastCloseDate == null
        || data.itoyokado.lastCloseDate < dayString
      )
    },
  },

  getters: {
    items(state) {
      const items = []

      if (state.definitions.doutor.visible) {
        items.push({
          name: 'doutor',
          message: 'チャージの日',
        })
      }
      
      if (state.definitions.newton.visible) {
        items.push({
          name: 'newton',
          message: '明日はNewton発売日',
        })
      }
      
      if (state.definitions.itoyokado.visible) {
        items.push({
          name: 'itoyokado',
          message: 'ハッピーデー',
        })
      }

      return items
    },
  },
}
