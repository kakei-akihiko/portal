<template>
  <TheMainLayout main-panel-scroll>
    <template v-slot:sidebar>
      <TheSidebar/>
    </template>

    <template v-slot:panel-main>
      <NotFoundAlert v-if="category == null"/>
      <div v-else>
        <h2>記事を{{ category.title }}にインポート</h2>

        <fieldset class="form-group">
          <input
            type="file"
            accept="application/json"
            @change="fileSelect"
          />
        </fieldset>
        <fieldset class="form-group">
          <button
            :disabled="importButton.disabled"
            v-show="importButton.visible"
            @click="importButtonClick"
          >
            選択をインポート
          </button>
        </fieldset>
        <div class="articles-list">
          <div class="article"
            v-for="article in articles"
            :key="article.id"
          >
            <span v-if="article.completed">
              済
            </span>
            <span v-else>
              －
            </span>
            <div>{{ article.title }}</div>
          </div>
        </div>
      </div>
    </template>
  </TheMainLayout>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ArticleJsonParser from '../../infrastructure/ArticleJsonParser.js'
import ArticleRepository from '../../infrastructure/ArticleRepository.js'
import ArticleService from '../../usecases/ArticleService.js'
import ArticlesDatabase from '../../infrastructure/ArticlesDatabase.js'
import CategoryRepository from '../../infrastructure/CategoryRepository.js'

const articlesDatabase = new ArticlesDatabase()
const categoryRepository = new CategoryRepository(articlesDatabase)
const articleJsonParser = new ArticleJsonParser()
const articleRepository = new ArticleRepository(articlesDatabase)
const articleService = new ArticleService(articleRepository, categoryRepository)

const route = useRoute()

const articles = ref([])
const category = ref(null)
const categoryId = ref(null)
const file = ref(null)

const importButton = computed(() => {
  const count = articles.value?.length ?? 0

  const nonCompletedCount = articles.value?.filter(article => !article.completed).length ?? 0

  const disabled = nonCompletedCount <= 0 || file.value == null
  const visible = count > 0 && file.value != null
  return { disabled, visible }
})

const loadCategory = async () => {
  category.value = await categoryRepository.get(categoryId.value)
}

const fileSelect = async event => {
  console.log(event.target.files[0])
  file.value = event.target.files[0]
  if (file.value == null) {
    return
  }
  const result = await articleJsonParser.parse(file.value)
  if (result.succeeded) {
    articles.value = result.articles.map(article => {
      return { ...article, completed: false }
    })
  }
}

const importButtonClick = () => {
  articles.value.filter(article => !article.computed)
    .forEach(async article => {
      const { title, text, tags } = article
      await articleService.set({ categoryId: categoryId.value, title, text, tags })
      article.completed = true
    })
}

onMounted(() => {
  categoryId.value = parseInt(route.params.id)
  loadCategory()
})

watch(() => route.params.id, async newId => {
  categoryId.value = parseInt(newId)
  loadCategory()
})
</script>

<style scoped>
.article {
  display: grid;
  grid-template-columns: 2rem 1fr;
}
</style>
