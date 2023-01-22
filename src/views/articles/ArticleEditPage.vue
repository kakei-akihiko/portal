<template>
  <TheMainLayout no-sidebar>
    <div slot="panel-main" class="h-100">
      <b-spinner
        v-if="loading"
        variant="primary"
        label="Spinning"
      />
      <NotFoundAlert v-else-if="article == null"/>
      <FullHeight v-else>
        <b-form-group
          slot="header"
          label-sr-only
        >
          <b-input
            name="title"
            placeholder="タイトル"
            v-model="form.title"
          />
        </b-form-group>

        <b-row class="h-100 pb-3">
          <b-col cols="6" class="h-100">
            <b-textarea
              name="text"
              placeholder="本文"
              no-resize
              class="h-100"
              v-model="text"
            />
          </b-col>
          <b-col cols="6" class="overflow-auto h-100">
            <div v-html="form.preview"/>
          </b-col>
        </b-row>

        <b-form-group
          slot="footer"
          label-sr-only
        >
          <div class="d-flex h-interval">
            <b-input
              name="tags"
              placeholder="タグ1 タグ2 ..."
              v-model="form.tagsString"
            />
            <b-button
              variant="primary"
              class="button-save"
              @click="saveButtonClick"
            >
              保存
            </b-button>
            <b-button
              variant="secondary"
              class="button-cancel"
              :to="{name: 'ArticlesListPage'}"
            >
              キャンセル
            </b-button>
          </div>
        </b-form-group>
      </FullHeight>
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

  name: 'ArticleEditPage',

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
    },

    async saveButtonClick () {
      const { id, categoryId } = this.article
      const { title, text, tagsString } = this.form

      const tags = Array.from(
        new Set(tagsString.split(' ').filter(tag => tag.length > 0)).values()
      )

      await articleService.set({ id, categoryId, title, text, tags })

      this.$router.push({ name: 'ArticlesListPage' })
    }
  }
}
</script>

<style scoped>
.button-save {
  white-space: nowrap
}
.button-cancel {
  white-space: nowrap
}
</style>
