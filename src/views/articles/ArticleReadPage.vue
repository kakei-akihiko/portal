<template>
  <TheMainLayout>
    <TheSidebar slot="sidebar">
      <NavCategories class="mt-3"/>
      <FormGroupTagButtons class="mt-3"/>
    </TheSidebar>

    <div slot="panel-main" class="h-100">
      <b-spinner
        v-if="loading"
        variant="primary"
        label="Spinning"
      />
      <NotFoundAlert v-else-if="article == null"/>
      <section v-else class="h-100 main">
        <h2>{{ form.title }}</h2>
        <div v-html="form.preview" class="preview"/>
        <div class="d-flex h-interval">
          <b-input
            name="tags"
            placeholder="タグ1 タグ2 ..."
            readonly
            v-model="form.tagsString"
          />
          <b-button
            variant="secondary"
            class="button-cancel"
            :to="{name: 'ArticlesListPage'}"
          >
            閉じる
          </b-button>
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
import NavCategories from '@/components/navs/NavCategories.vue'
import FormGroupTagButtons from '@/components/form-groups/FormGroupTagButtons.vue'

const articlesDatabase = new ArticlesDatabase()
const articleRepository = new ArticleRepository(articlesDatabase)
const categoryRepository = new CategoryRepository(articlesDatabase)
const articleService = new ArticleService(articleRepository, categoryRepository)

export default {
  name: 'ArticleReadPage',

  components: { FormGroupTagButtons, NavCategories },

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
        tagsString: ''
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
        this.form.tagsString = this.article.tags?.join(' ') ?? ''
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
</style>
