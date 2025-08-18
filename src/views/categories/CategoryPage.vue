<template>
  <TheMainLayout>
    <template v-slot:sidebar>
      <TheSidebar/>
    </template>

    <template v-slot:panel-main>
      <h2>カテゴリー</h2>
      <section>
        <h3>新規作成</h3>

        <fieldset class="form-group" label="名称">
          <legend tabindex="-1">
            名称
          </legend>
          <input
            class="form-control"
            name="categoryName"
            type="text"
            v-model="cardNewCategoryName"
          >
        </fieldset>

        <fieldset class="form-group">
          <button
            :disabled="cardNewCategoryCreateButtonDisabled"
            class="primary-button"
            @click="createCategoryButtonClick"
          >
            作成
          </button>
        </fieldset>
      </section>
      <section class="section-list">
        <h3>一覧</h3>
        <div class="card"
          v-for="category in categoriesRef"
          :key="category.id"
        >
          <div class="card-body d-flex">
            <div>
              {{ category.title }}
            </div>
            <div class="ml-auto h-interval">
              <router-link
                :to="{name: 'CategoryImportPage', params: {id: category.id}}"
              >
                インポート
              </router-link>
              <button
                class="btn btn-info"
                @click="exportButtonClick(category)"
              >
                <i class="fas fa-download"/>
                エクスポート
              </button>
            </div>
          </div>
        </div>
      </section>
    </template>
  </TheMainLayout>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { categoriesRef, loadCategories } from '../../store/index'
import { exportArticles } from '../../store/ref.js'
import ArticlesDatabase from '../../infrastructure/ArticlesDatabase.js'
import CategoryRepository from '../../infrastructure/CategoryRepository.js'

const articlesDatabase = new ArticlesDatabase()
const categoryRepository = new CategoryRepository(articlesDatabase)

const cardNewCategory = ref({
  created: false,
  name: ''
})

const cardNewCategoryCreateButtonDisabled = computed(() => {
  const { created, name } = cardNewCategory.value
  return created || name == null || name.length <= 0
})

const cardNewCategoryName = computed({
  get () {
    return cardNewCategory.value.name
  },
  set (value) {
    cardNewCategory.value.name = value
    cardNewCategory.value.created = false
  }
})

onMounted(() => {
  loadCategories()
})

const createCategoryButtonClick = async () => {
  cardNewCategory.value.created = true
  const title = cardNewCategory.value.name
  const tagSelectionMode = 'single'
  await categoryRepository.put({ title, tagSelectionMode })
  loadCategories()
  cardNewCategory.value.name = ''
}

const exportButtonClick = category => {
  exportArticles(category.id)
}
</script>

<style scoped>
.form-group {
  border-width: 0;
  padding: 0;
}

.form-control {
  width: 100%;
  height: 2rem;
  max-width: 20rem;
}

.primary-button {
  background-color: hsl(209 100% 85% / 1);
  color: hsl(209 100% 20% / 1);
  border-color: hsl(209 100% 85% / 1);
}

.primary-button:disabled {
  background-color: hsl(209 100% 95% / 1);
  color: hsl(209 100% 60% / 1);
  border-color: hsl(209 100% 95% / 1);
}

.primary-button:hover:not([disabled]) {
  background-color: hsl(209 100% 75% / 1);
  color: hsl(209 100% 20% / 1);
  border-color: hsl(209 100% 75% / 1);
}
</style>
