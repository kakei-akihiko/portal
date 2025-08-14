<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from '../../infrastructure/markdown.js'
import NotFoundAlert from '../../components/alerts/NotFoundAlert.vue'
import ArticleRepository from '../../infrastructure/ArticleRepository.js'
import ArticlesDatabase from '../../infrastructure/ArticlesDatabase.js'
import ArticleService from '../../usecases/ArticleService.js'
import CategoryRepository from '../../infrastructure/CategoryRepository.js'
import ArticleTitleInput from './write/ArticleTitleInput.vue'

const articlesDatabase = new ArticlesDatabase()
const articleRepository = new ArticleRepository(articlesDatabase)
const categoryRepository = new CategoryRepository(articlesDatabase)
const articleService = new ArticleService(articleRepository, categoryRepository)

const route = useRoute()
const router = useRouter()

const categoryFound = ref(null)
const categoryId = ref(null)

const form = ref({
  title: '',
  text: '',
  preview: '',
  tagsString: ''
})

const formDisabled = computed(() => {
  return categoryFound.value !== true
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

const confirmCategoryExistence = async () => {
  console.log('categoryId.value', categoryId.value)
  const category = await categoryRepository.get(categoryId.value)
  categoryFound.value = category != null
}

onMounted(() => {
  categoryId.value = parseInt(route.params.categoryId)
  categoryFound.value = null
  confirmCategoryExistence()
})

watch(() => route.params.categoryId, async newId => {
  categoryId.value = parseInt(newId)
  categoryFound.value = null
  confirmCategoryExistence()
})

const saveButtonClick = async () => {
  const { title, text, tagsString } = form.value

  const tags = Array.from(
    new Set(tagsString.split(' ').filter(tag => tag.length > 0)).values()
  )

  await articleService.set({ categoryId: categoryId.value, title, text, tags })

  router.push({ name: 'ArticlesListPage' })
}

const cancelButtonClick = () => {
  router.push({ name: 'ArticlesListPage' })
}
</script>

<template>
  <TheMainLayout>
    <template v-slot:panel-main>
      <section class="panel-main edit-section" v-if="categoryFound">
        <header>
          <ArticleTitleInput v-model="form.title" />
        </header>
        <main>
          <textarea
            name="text"
            placeholder="本文"
            class="body-input"
            v-model="text"
          ></textarea>
          <div v-html="form.preview" class="preview"/>
        </main>
        <footer>
          <input
            name="tags"
            class="tags-input"
            placeholder="タグ1 タグ2 ..."
            v-model="form.tagsString"
          />
          <button
            class="btn btn-primary button-save"
            type="button"
            :disabled="formDisabled"
            @click="saveButtonClick"
          >
            保存
          </button>
          <button @click="cancelButtonClick" class="button-cancel">
            キャンセル
          </button>
        </footer>
      </section>
      <section class="panel-main" v-else>
        <NotFoundAlert/>
      </section>
    </template>
  </TheMainLayout>
</template>

<style scoped>
.button-save {
  white-space: nowrap
}

.button-cancel {
  white-space: nowrap;
}

.edit-section {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.edit-section main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  & .preview > :first-child {
    margin-top: 0;
    padding-top: 0;
  }
}

.edit-section footer {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 5px;
}

.edit-section {
  box-sizing: border-box;
  & > * {
    box-sizing: border-box;
  }
  & > header > *,
  & > main > *,
  & > footer > * {
    box-sizing: border-box;
  }
}

.preview {
  padding: .5rem;
}

.body-input {
  resize: none;
  font-size: 1rem;
  padding: .5rem;
}

.tags-input {
  height: 100%;
  padding: .5rem;
}
</style>
