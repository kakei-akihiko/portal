<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from '../../infrastructure/markdown.js'
import router from '../../router/index'
import NotFoundAlert from '../../components/alerts/NotFoundAlert.vue'
import ArticleRepository from '@/infrastructure/ArticleRepository.js'
import ArticlesDatabase from '@/infrastructure/ArticlesDatabase.js'
import ArticleService from '@/usecases/ArticleService.js'
import CategoryRepository from '@/infrastructure/CategoryRepository.js'

const articlesDatabase = new ArticlesDatabase()
const articleRepository = new ArticleRepository(articlesDatabase)
const categoryRepository = new CategoryRepository(articlesDatabase)
const articleService = new ArticleService(articleRepository, categoryRepository)

const route = useRoute()

const article = ref(null)
const articleId = ref(null)
const loading = ref(null)

const form = ref({
  title: '',
  text: '',
  preview: '',
  tagsString: ''
})

const text = computed({
  get () {
    return form.value.text
  },
  set (value) {
    form.value.text = value
    form.value.preview = value == null ? '' : marked.parse(value)
  }
})

const formDisabled = computed(() => {
  return article.value == null
})

const loadArticle = async () => {
  loading.value = true
  article.value = null

  const articles = await articleService.get({ articleId: articleId.value })

  if (articles.length > 0) {
    article.value = articles[0]
    form.value.title = article.value.title
    text.value = article.value.text
    form.value.tagsString = article.value.tags?.join(' ') ?? ''
  }
  loading.value = false
}

const saveButtonClick = async function () {
  const { id, categoryId } = article.value
  const { title, text, tagsString } = form.value

  const tags = Array.from(
    new Set(tagsString.split(' ').filter(tag => tag.length > 0)).values()
  )

  await articleService.set({ id, categoryId, title, text, tags })

  router.push({
    name: 'ArticleReadPage',
    parems: { id }
  })
}

const cancelButtonClick = () => {
  router.push({name: 'ArticlesListPage'})
}

onMounted(() => {
  articleId.value = parseInt(route.params.id)
  loadArticle()
})

watch(() => route.params.categoryId, async newId => {
  articleId.value = parseInt(newId)
  loadArticle()
})
</script>

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
                <input
                  name="tags"
                  class="form-control"
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
<style scoped>
.button-save {
  white-space: nowrap
}
.button-cancel {
  white-space: nowrap
}
</style>
