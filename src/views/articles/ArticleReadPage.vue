<template>
  <TheMainLayout>
    <TheSidebar slot="sidebar">
    </TheSidebar>

    <div slot="panel-main" class="h-100">
      <b-spinner
        v-if="loading"
        variant="primary"
        label="Spinning"
      />
      <NotFoundAlert v-else-if="article == null"/>
      <section v-else class="h-100 main">
        <div class="title-div">
          <h2>{{ form.title }}</h2>
          <div>
            <b-button
              variant="link"
              :to="{name: 'ArticleEditPage', params: {id: article.id}}"
            >
              <i class="fas fa-edit"></i>
            </b-button>
            <b-button
              variant="link"
              class="button-cancel"
              :to="{name: 'ArticlesListPage'}"
            >
              <i class="fas fa-times"></i>
            </b-button>
          </div>
        </div>
        <div v-html="form.preview" class="preview"/>
        <div class="h-interval">
          <b-badge
            v-for="tag in form.tags"
            :key="tag"
            variant="info"
          >
            {{ tag }}
          </b-badge>
        </div>
      </section>
    </div>
  </TheMainLayout>
</template>

<script>
import { marked } from '../../infrastructure/markdown.js'

import ArticleRepository from '@/infrastructure/ArticleRepository.js'
import ArticlesDatabase from '@/infrastructure/ArticlesDatabase.js'
import ArticleService from '@/usecases/ArticleService.js'
import CategoryRepository from '@/infrastructure/CategoryRepository.js'

const articlesDatabase = new ArticlesDatabase()
const articleRepository = new ArticleRepository(articlesDatabase)
const categoryRepository = new CategoryRepository(articlesDatabase)
const articleService = new ArticleService(articleRepository, categoryRepository)

export default {
  name: 'ArticleReadPage',

  data () {
    const articleId = parseInt(this.$route.params.id)

    return {
      article: null,
      articleId,
      loading: true,
      form: {
        title: '',
        text: '',
        preview: '',
        tags: []
      }
    }
  },

  computed: {
    text: {
      get () {
        return this.form.text
      },
      set (value) {
        this.form.text = value
        this.form.preview = this.form.text == null ? '' : marked.parse(this.form.text)
      }
    }
  },

  watch: {
    $route (to) {
      this.articleId = parseInt(to.params.id)
      this.loadArticle()
    }
  },

  mounted () {
    this.articleId = parseInt(this.$route.params.id)
    this.loadArticle()
  },

  methods: {
    async loadArticle () {
      this.loading = true
      this.article = null

      const { articleId } = this

      const articles = await articleService.get({ articleId })

      if (articles.length > 0) {
        this.article = articles[0]
        this.form.title = this.article.title
        this.text = this.article.text
        this.form.tags = this.article.tags
      }
      this.loading = false
    }
  }
}
</script>

<style scoped>
.button-cancel {
  white-space: nowrap
}
.main {
  display: grid;
  grid-template-rows: auto 1fr auto;
}
.preview {
  overflow-y: auto;
  margin-bottom: 1rem;
}
.title-div {
  display: grid;
  grid-template-columns: 1fr auto;
}
</style>
