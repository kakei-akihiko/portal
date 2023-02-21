<template>
  <TheMainLayout no-sidebar>
    <template v-slot:panel-main>
      <div class="h-100">
        <div class="spinner-border text-primary" role="status" v-if="loading">
          <span class="sr-only">Loading...</span>
        </div>
        <NotFoundAlert v-else-if="article == null"/>
        <FullHeight v-else>
          <template v-slot:header>
            <fieldset class="form-group">
              <input
                class="form-control"
                type="text"
                name="title"
                placeholder="タイトル"
                v-model="form.title"
              />
            </fieldset>
          </template>

          <div class="row h-100 pb-3">
            <div cols="6" class="col-6 h-100">
              <textarea
                name="text"
                placeholder="本文"
                class="form-control h-100 text-body"
                v-model="text"
                wrap="soft"
                rows="2"
              ></textarea>
            </div>
            <div cols="6" class="col-6 overflow-auto h-100">
              <div v-html="form.preview" class="article-body-view"/>
            </div>
          </div>

          <template v-slot:footer>
            <fieldset class="form-group">
              <div class="d-flex h-interval">
                <b-input
                  name="tags"
                  placeholder="タグ1 タグ2 ..."
                  v-model="form.tagsString"
                />
                <button
                  class="btn btn-primary button-save"
                  @click="saveButtonClick"
                >
                  保存
                </button>
                <button
                  class="btn btn-secondary button-cancel"
                  @click="cancelButtonClick"
                >
                  キャンセル
                </button>
              </div>
            </fieldset>
          </template>
        </FullHeight>
      </div>
    </template>
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
    cancelButtonClick () {
      this.$router.push({name: 'ArticlesListPage'})
    },
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

      this.$router.push({
        name: 'ArticleReadPage',
        parems: { id }
      })
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
