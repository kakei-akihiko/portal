<template>
  <TheMainLayout main-panel-scroll>
    <template v-slot:sidebar>
      <TheSidebar/>
    </template>

    <template v-slot:panel-main>
      <h2>設定</h2>

      <div class="card">
        <div class="card-header">サイドバーの記事</div>
        <div class="card-body">
          <fieldset class="form-group" label="記事ID">
            <b-input
              name="sidebar-article-id"
              v-model="sidebarArticle.id"
            />
          </fieldset>
          <fieldset class="form-group mb-0" label-sr-only>
            <button
              class="btn btn-primary"
              type="button"
              @click="sidebarArticleButtonClick"
            >
              反映
            </button>
          </fieldset>
        </div>
      </div>

      <div class="card border-danger">
        <div class="card-header border-danger text-danger">危険な設定</div>
        <div class="card-body">
          <fieldset class="form-group">
            <button
              type="button"
              class="btn btn-secondary"
              @click="deleteDatabaseButtonClick"
            >
              データベース削除
            </button>
          </fieldset>
        </div>
      </div>
    </template>
  </TheMainLayout>
</template>

<script>
import ArticlesDatabase from '@/infrastructure/ArticlesDatabase.js'

const articlesDatabase = new ArticlesDatabase()

export default {
  name: 'SettingPage',

  data () {
    return {
      sidebarArticle: {
        id: ''
      }
    }
  },

  mounted () {
    this.reload()
  },

  methods: {
    deleteDatabaseButtonClick () {
      articlesDatabase.delete()
      console.log('データベースを削除しました。')
    },
    async reload () {
      await this.$store.dispatch('sidebar/loadSetting')
      this.sidebarArticle.id = this.$store.state.sidebar.articleId
    },
    async sidebarArticleButtonClick () {
      const idIsEmpty = this.sidebarArticle.id === '' || this.sidebarArticle.id == null
      const id = idIsEmpty ? null : Number(this.sidebarArticle.id)
      await this.$store.dispatch('sidebar/setArticleId', id)
      await this.reload()
    }
  }
}
</script>
