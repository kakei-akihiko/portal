<template>
  <TheMainLayout main-panel-scroll>
    <template v-slot:sidebar>
      <TheSidebar/>
    </template>

    <template v-slot:panel-main>
      <div class="h-100">
        <NotFoundAlert v-if="category == null"/>
        <div
          v-else
          class="h-100"
        >
          <h2>記事を{{ category.title }}にインポート</h2>

          <fieldset class="form-group">
            <div class="custom-file b-form-file">
              <input 
                type="file" accept="application/json"
                @change="fileSelect"
              >
            </div>
          </fieldset>
          <div class="d-flex">
            <fieldset class="form-group ml-auto">
              <button
                :disabled="importButton.disabled"
                v-show="importButton.visible"
                class="btn btn-primary"
                @click="importButtonClick"
              >
                選択をインポート
              </button>
            </fieldset>
          </div>
          <div class="list-group">
            <div class="list-group-item d-flex"
              v-for="article in articles"
              :key="article.id"
            >
              <div>{{ article.title }}</div>
              <span
                v-if="article.completed"
                class="badge bdge-info ml-auto"
              >
                済
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </TheMainLayout>
</template>

<script>
import ArticleJsonParser from '@/infrastructure/ArticleJsonParser.js'
import ArticleRepository from '@/infrastructure/ArticleRepository.js'
import ArticleService from '@/usecases/ArticleService.js'
import ArticlesDatabase from '@/infrastructure/ArticlesDatabase.js'
import CategoryRepository from '@/infrastructure/CategoryRepository.js'

const articlesDatabase = new ArticlesDatabase()
const categoryRepository = new CategoryRepository(articlesDatabase)
const articleJsonParser = new ArticleJsonParser()
const articleRepository = new ArticleRepository(articlesDatabase)
const articleService = new ArticleService(articleRepository, categoryRepository)

export default {
  name: 'CategoryImportPage',

  data () {
    return {
      articles: [],
      category: null,
      categoryId: null,
      file: null
    }
  },

  computed: {
    importButton () {
      const count = this.articles == null
        ? 0
        : this.articles.length

      const nonCompletedCount = this.articles == null
        ? 0
        : this.articles.filter(article => !article.completed).length

      const disabled = nonCompletedCount <= 0 || this.file == null
      const visible = count > 0 && this.file != null
      return { disabled, visible }
    }
  },

  watch: {
    $route (to) {
      this.categoryId = parseInt(to.params.id)
      this.loadCategory()
    }
  },

  mounted () {
    this.categoryId = parseInt(this.$route.params.id)
    this.loadCategory()
  },

  methods: {
    async fileSelect (event) {
      console.log(event.target.files[0])
      const file = event.target.files[0]
      this.file = file
      if (file == null) {
        return
      }
      const { succeeded, articles } = await articleJsonParser.parse(file)
      if (succeeded) {
        this.articles = articles.map(article => {
          return { ...article, completed: false }
        })
      }
    },
    async importButtonClick () {
      this.articles.filter(article => !article.computed)
        .forEach(async article => {
          const { title, text, tags } = article
          const categoryId = this.categoryId
          await articleService.set({ categoryId, title, text, tags })
          article.completed = true
        })
    },
    async loadCategory () {
      this.category = await categoryRepository.get(this.categoryId)
    }
  }
}
</script>
