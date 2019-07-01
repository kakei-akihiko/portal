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
          <b-form-group label="バックアップ" label-cols="3" inline
              :invalid-feedback="model.backup.error" :state="backupState">
            <div class="v-interval">
              <b-button variant="primary" @click="backupButtonClick">出力</b-button>
            </div>
          </b-form-group>

          <b-form-group label="リストア" label-cols="3"
              :invalid-feedback="model.restore.error" :state="restoreState">
            <b-file v-model="restoreFile" accept="application.json" :state="restoreState" />
          </b-form-group>

          <b-form-group label-cols="3" inline>
            <div class="v-interval">
              <b-button variant="primary"
                @click="overrideRestoreButtonClick"
                :disabled="restoreFile == null">
                上書き
              </b-button>
              <b-button variant="primary"
                @click="appendRestoreButtonClick"
                :disabled="restoreFile == null">
                追加
              </b-button>
            </div>
          </b-form-group>

        </b-card>

      </div>
    </section>
  </MainTemplate>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'

import MainTemplate from '@/components/templates/MainTemplate.vue'

import Storage from '@/storeModules/storage.js'

export default {
  name: 'settings-page',

  components: {
    MainTemplate,
  },

  computed: {
    backupState() {
      return this.model.backup.error == null ? null : false;
    },

    restoreFile: {
      get() {
        return this.model.restore.file;
      },
      set(value) {
        this.model.restore.file = value;
        this.model.restore.error = null;
      },
    },

    restoreState() {
      return this.model.restore.error == null ? null : false;
    },

    ...mapState('settings', ['background'])
  },

  methods: {
    saveButtonClick() {
      this.setBackground(this.model.background)
    },

    backupButtonClick() {
      const articles = Storage.loadArticles();
      if (articles == null || articles.length <= 0) {
        this.model.backup.error = 'バックアップ対象のデータがありません。';
      } else {
        this.model.backup.error = null;

        const json = JSON.stringify({articles}, null, 2);

        const blob = new Blob([json], {type: 'application/json'});
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.target = '_blank';
        a.download = 'Articles.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    },

    async readFileAsText(file) {
      return await new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = _ => resolve(reader.result);
        reader.readAsText(file);
      });
    },

    async overrideRestoreButtonClick() {
      try {
        const json = await readFileAsText(this.model.restore.file);
        this.setArticles(JSON.parse(json).articles);
        this.model.restore.file = null;
        this.model.restore.error = null;
      } catch(ex) {
        const message = 'ファイルの読み込みに失敗しました。';
        console.log(message, ex);
        this.model.restore.error = message;
      }
    },

    async appendRestoreButtonClick() {
      try {
        const json = await readFileAsText(this.model.restore.file);
        JSON.parse(json).articles.forEach(article => {
          delete article.id;
          this.setArticle({article});
        });
        this.model.restore.file = null;
        this.model.restore.error = null;
      } catch(ex) {
        const message = 'ファイルの読み込みに失敗しました。';
        console.log(message, ex);
        this.model.restore.error = message;
      }
    },

    ...mapActions('settings', ['setBackground', 'loadBackground']),
    ...mapMutations('articles', ['setArticle', 'setArticles']),
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
          error: null,
        },
        restore: {
          file: null,
          error: null,
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
