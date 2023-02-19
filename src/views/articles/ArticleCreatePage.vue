<template>
  <TheMainLayout no-sidebar>
    <template v-slot:panel-main>
      <div class="h-100">
        <FullHeight>
          <template v-slot:header>
            <b-form-group label-sr-only>
              <b-input
                name="title"
                placeholder="タイトル"
                v-model="form.title"
              />
            </b-form-group>
          </template>

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

          <template v-slot:footer>
            <b-form-group label-sr-only>
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
            </b-form-group>
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

  name: 'ArticleCreatePage',

  data () {
    return {
      categoryFound: null,
      categoryId: parseInt(this.$route.params.categoryId),
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
      this.categoryId = parseInt(to.params.categoryId)
      this.categoryFound = null
      this.confirmCategoryExistence()
    }
  },

  mounted () {
    this.confirmCategoryExistence()
  },

  methods: {
    cancelButtonClick () {
      this.$router.push({name: 'ArticlesListPage'})
    },
    async confirmCategoryExistence () {
      const category = await categoryRepository.get(this.categoryId)
      this.categoryFound = category != null
      if (this.categoryFound === false) {
        this.showCatgoryNotFoundToast()
      }
    },

    async saveButtonClick () {
      const { categoryId } = this
      const { title, text, tagsString } = this.form

      if (this.categoryFound == null) {
        await this.confirmCategoryExistence()
      }

      if (this.categoryFound !== true) {
        this.showCatgoryNotFoundToast()
        return
      }

      const tags = Array.from(
        new Set(tagsString.split(' ').filter(tag => tag.length > 0)).values()
      )

      await articleService.set({ categoryId, title, text, tags })

      this.$router.push({ name: 'ArticlesListPage' })
    },

    showCatgoryNotFoundToast () {
      this.$bvToast.toast('カテゴリが見つかりません。', {
        autoHideDelay: 5000,
        appendToast: true
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
