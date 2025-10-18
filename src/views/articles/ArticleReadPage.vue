<template>
  <TheMainLayout>
    <template v-slot:sidebar>
      <TheSidebar/>
    </template>

    <template v-slot:panel-main>
      <div class="h-100">
        <div class="spinner-border text-primary" role="status" v-if="loading">
          <span class="sr-only">Loading...</span>
        </div>
        <NotFoundAlert v-else-if="article == null"/>
        <section v-else class="h-100 main">
          <div class="title-div">
            <h2>{{ form.title }}</h2>
            <div>
              <button
                class="btn btn-link"
                @click="articleEditButtonClick"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                class="btn btn-link button-cancel"
                @click="articleListButtonClick"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
          <div v-html="form.preview" class="preview article-body-view"/>
          <div class="h-interval">
            <span class="badge badge-info"
              v-for="tag in form.tags"
              :key="tag"
            >
              {{ tag }}
            </span>
          </div>
        </section>
      </div>
    </template>
  </TheMainLayout>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from '../../infrastructure/markdown.js'
import router from '../../router/index'

import ArticleRepository from '../../infrastructure/ArticleRepository.js'
import ArticlesDatabase from '../../infrastructure/ArticlesDatabase.js'
import ArticleService from '../../usecases/ArticleService.js'
import CategoryRepository from '../../infrastructure/CategoryRepository.js'

const articlesDatabase = new ArticlesDatabase()
const articleRepository = new ArticleRepository(articlesDatabase)
const categoryRepository = new CategoryRepository(articlesDatabase)
const articleService = new ArticleService(articleRepository, categoryRepository)

const article = ref(null)
const articleId = ref(null)
const route = useRoute()
const loading = ref(true)
const form = ref({
  title: '',
  text: '',
  preview: '',
  tags: []
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

const loadArticle = async () => {
  loading.value = true
  article.value = null

  const articles = await articleService.get({ articleId: articleId.value })

  if (articles.length > 0) {
    article.value = articles[0]
    form.value.title = article.value.title
    form.value.tags = article.value.tags
    text.value = article.value.text
  }
  loading.value = false
}

const articleEditButtonClick = () => {
  const id = articleId.value
  router.push({ name: 'ArticleEditPage', params: { id } })
}

const articleListButtonClick = () => {
  const { categoryId } = article.value
  router.push({
    name: 'ArticlesListPage',
    params: { categoryId }
  })
}

onMounted(() => {
  articleId.value = parseInt(route.params.id)
  loadArticle()
})

watch(() => route.params.id, async newId => {
  articleId.value = parseInt(newId)
  loadArticle()
})
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
