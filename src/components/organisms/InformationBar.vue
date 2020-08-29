<template>
  <b-card>
    <b-card-title class="d-flex">
      <div class="flex-grow-1">
        情報
      </div>
      <ExpandingIcon :expanded="expanded" @click="expanded = !expanded" />
    </b-card-title>

    <div v-show="expanded">
      <div v-if="todoItems.length > 0">
        <hr/>
        <section>
          <h4><i class="far fa-check-square"></i> TODO</h4>
          <b-alert show variant="warning" dismissible
              v-for="item in todoItems"
              :key="item.name"
              @dismissed="closeTodo({name: item.name})">
            {{ item.message }}
          </b-alert>
        </section>
      </div>

      <hr/>
      <section>
        <h4><i class="far fa-calendar-alt"></i> 日時</h4>
        {{ datetimeString }}
      </section>
    </div>
  </b-card>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

import dayjs from 'dayjs'

import ExpandingIcon from '@/components/inlines/ExpandingIcon'

export default {
  components: {
    ExpandingIcon,
  },

  computed: {
    ...mapGetters('todo', {
      todoItems: 'items'
    })
  },

  methods: {
    refreshDatetime() {
      this.datetimeString = dayjs().format('YYYY/MM/DD HH:mm:ss')
    },

    ...mapMutations('todo', {
      closeTodo: 'setCloseDate',
      refreshTodo: 'refresh',
    })
  },

  data() {
    return {
      expanded: true,
      datetimeString: null,
    }
  },

  mounted() {
    this.refreshDatetime()
    setInterval(() => {
      this.refreshDatetime()
    }, 333)

    this.refreshTodo()
  },
}
</script>
