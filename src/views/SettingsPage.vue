<template>
  <MainTemplate title="Home">
    <div slot="sidebar">
      <b-card title="設定">
      </b-card>
    </div>

    <section class="h-100" slot="main">
      <div class="h-100 scroll">
        <b-card title="背景">
          <b-form-group label="画像" label-cols="3">
            <b-form-input v-model="model.background.url"/>
          </b-form-group>

          <b-form-group label="画像の高さ" label-cols="3">
            <b-form-radio-group
              name="background-image-height"
              :options="options.imageHeight"
              v-model="model.background.height"/>
          </b-form-group>

          <b-form-group label="不透明度" label-cols="3">
            <b-form-input v-model="model.background.opacity" type="number" step="0.1" max="1.0" min="0"/>
          </b-form-group>

          <b-form-group label-cols="3">
            <b-button variant="primary" @click="saveButtonClick">保存</b-button>
          </b-form-group>
        </b-card>

        <b-card title="バックアップ・リストア">
          <b-form-group label="バックアップ" label-cols="3" inline>
            <div class="v-interval">
              <b-button variant="primary" @click="backupButtonClick">出力</b-button>
              <b-button v-if="model.backup.text != null"
                  variant="outline-primary" @click="model.backup.text = null">
                クリア
              </b-button>
            </div>
          </b-form-group>

          <b-form-group label-cols="3">
            <b-textarea v-if="model.backup.text != null" :value="model.backup.text"/>
          </b-form-group>

          <b-form-group label="リストア" label-cols="3" inline>
            <div class="v-interval">
              <b-button variant="primary" @click="overrideRestoreButtonClick">上書き</b-button>
              <b-button variant="primary" @click="appendRestoreButtonClick">追加</b-button>
            </div>
          </b-form-group>

        </b-card>

      </div>
    </section>
  </MainTemplate>
</template>

<script>
import {mapState, mapActions} from 'vuex'

import MainTemplate from '@/components/templates/MainTemplate.vue'

import Storage from '@/storeModules/storage.js'

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

    backupButtonClick() {
      const articles = Storage.loadArticles();
      if (articles == null || articles.length <= 0) {
        this.model.backup.text = null;
        this.model.backup.error = 'バックアップ対象のデータがありません。';
      } else {
        this.model.backup.text = JSON.stringify(articles, null, 2);
        this.model.backup.error = null;
      }
    },

    overrideRestoreButtonClick() {
    },

    appendRestoreButtonClick() {
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
        backup: {
          text: null,
          error: null,
        },
        restore: {
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
