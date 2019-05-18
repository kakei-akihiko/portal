import dayjs from 'dayjs'

const storageKey = 'TagAndText.Todo'

const getInitialState = () => {
  const today = {
    date: dayjs().date(),
    day: dayjs().day(),
    dayString: dayjs().format('YYYY/MM/DD'),
  }

  const initialDefinition = {
    doutor: {lastCloseDate: null, visible: false},
    newton: {lastCloseDate: null, visible: false},
    itoyokado: {lastCloseDate: null, visible: false},
  }

  const json = localStorage.getItem(storageKey)
  const definitions = json == null ? initialDefinition : JSON.parse(json).definitions
  return {today, definitions}
}

export const todo = {
  namespaced: true,

  state: getInitialState(),

  mutations: {
    setCloseDate(state, {name} = {}) {
      const {definitions} = state
      definitions[name].lastCloseDate = dayjs().format('YYYY/MM/DD')
      definitions[name].visible = false
      localStorage.setItem(storageKey, JSON.stringify({definitions}))
    },

    refresh(state) {
      const {day, date, dayString} = state.today

      // ドトールチャージの日…1日
      const doutor = state.definitions.doutor
      doutor.visible = (date == 1) &&
        (doutor.lastCloseDate == null || doutor.lastCloseDate < dayString)

      // Newton発売日前日…25日（土以外）・24日（金）
      const newton = state.definitions.newton
      newton.visible = (date == 25 && day != 6 || date == 24 && day == 5) &&
        (newton.lastCloseDate == null || newton.lastCloseDate < dayString)

      // イトーヨーカドーハッピーデー
      const itoyokado = state.definitions.itoyokado
      itoyokado.visible = (date == 8 || date == 18 || date == 28) &&
        (itoyokado.lastCloseDate == null || itoyokado.lastCloseDate < dayString)
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
          message: '今日はヨーカドーハッピーデー',
        })
      }

      return items
    },
  },
}
