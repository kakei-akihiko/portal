<template>
  <TheMainLayout main-panel-scroll>
    <template v-slot:sidebar>
      <TheSidebar/>
    </template>

    <template v-slot:panel-main>
      <h2>設定</h2>

      <b-card header="サイドバーの記事">
        <b-form-group label="記事ID">
          <b-input
            name="sidebar-article-id"
            v-model="sidebarArticle.id"
          />
        </b-form-group>
        <b-form-group label-sr-only class="mb-0">
          <button
            class="btn btn-primary"
            type="button"
            @click="sidebarArticleButtonClick"
          >
            反映
          </button>
        </b-form-group>
      </b-card>

      <b-card
        border-variant="danger"
        header="危険な設定"
        header-border-variant="danger"
        header-text-variant="danger"
      >
        <b-form-group>
          <button
            type="button"
            class="btn btn-secondary"
            @click="deleteDatabaseButtonClick"
          >
            データベース削除
          </button>
        </b-form-group>
      </b-card>
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
