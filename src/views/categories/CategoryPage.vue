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
            class="create-button"
            @click="createCategoryButtonClick"
          >
            作成
          </button>
        </fieldset>
      </section>
      <section class="categories">
        <h3>一覧</h3>
        <div class="categories-list">
          <div class="category-div"
            v-for="category in categoriesRef"
            :key="category.id"
          >
            <h4>
              {{ category.title }}
            </h4>
            <router-link
              :to="{name: 'CategoryImportPage', params: {id: category.id}}"
            >
              インポート
            </router-link>
            <button
              class="button-export"
              type="button"
              @click="exportButtonClick(category)"
            >
              <i class="fas fa-download"/>
              エクスポート
            </button>
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
.categories {
  margin-top: 20px;
}

.categories-list {
  display: flex;
  flex-wrap: wrap;
}

.category-div {
  width: 300px;
  border: solid 1px #ccc;
  padding: 10px 20px;
  border-radius: 5px;
}

.button-export {
  margin-left: 10px;
}

.category-div h4 {
  font-size: 1.3rem;
  border: 0;
  padding: 0;
}

.form-group {
  border-width: 0;
  padding: 0;
}

.create-button {
  margin-top: 10px;
}

.form-control {
  width: 100%;
  height: 2rem;
  max-width: 20rem;
}
</style>
