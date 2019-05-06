<template>
  <MainTemplate title="Home">
    <div slot="sidebar">
      <b-card title="設定">
      </b-card>
    </div>

    <section class="h-100" slot="main">
      <div class="h-100 scroll">
        <b-card>
          <b-form-group label="背景画像" label-cols="3">
            <b-form-input v-model="model.background.url"/>
          </b-form-group>

          <b-form-group label="背景画像高さ" label-cols="3">
            <b-form-radio-group
              name="background-image-height"
              :options="options.imageHeight"
              v-model="model.background.height"/>
          </b-form-group>

          <b-form-group label="背景不透明度" label-cols="3">
            <b-form-input v-model="model.background.opacity" type="number" step="0.1" max="1.0" min="0"/>
          </b-form-group>

          <b-form-group label-cols="3">
            <b-button variant="primary" @click="saveButtonClick">保存</b-button>
          </b-form-group>
        </b-card>
      </div>
    </section>
  </MainTemplate>
</template>

<script>
import {mapState, mapActions} from 'vuex'

import MainTemplate from '@/components/templates/MainTemplate.vue'

export default {
  name: 'settings-page',

  components: {
    MainTemplate,
  },

  computed: {
    ...mapState('settings', ['background'])
  },

  methods: {
    saveButtonClick() {
      this.setBackground(this.model.background)

    },

    ...mapActions('settings', ['setBackground', 'loadBackground'])
  },

  data() {
    return {
      model: {
        background: {
          url: '',
          height: '50%',
          opacity: 0.5,
        },
      },
      options: {
        imageHeight: [
          {text: '50%', value: '50%'},
          {text: '100%', value: '100%'},
        ],
      },
    }
  },

  mounted() {
    this.loadBackground()
    const {url, opacity, height} = this.background
    this.model.background = {url, opacity, height}
  },
}
</script>
