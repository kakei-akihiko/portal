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
          <b-form-group>
            <b-form-file
              v-model="file"
              :value="file"
              @input="fileSelect"
              accept="application/json"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            />
          </b-form-group>
          <div class="d-flex">
            <b-form-group class="ml-auto">
              <b-button
                :disabled="importButton.disabled"
                v-show="importButton.visible"
                variant="primary"
                @click="importButtonClick"
              >
                選択をインポート
              </b-button>
            </b-form-group>
          </div>
          <b-list-group>
            <b-list-group-item
              v-for="article in articles"
              :key="article.id"
              class="d-flex"
            >
              <div>{{ article.title }}</div>
              <b-badge
                v-if="article.completed"
                variant="info"
                class="ml-auto"
              >
                済
              </b-badge>
            </b-list-group-item>
          </b-list-group>
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
    async fileSelect (file) {
      this.file = file
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
