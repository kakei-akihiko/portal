<template>
  <TheMainLayout main-panel-scroll>
    <template v-slot:sidebar>
      <TheSidebar/>
    </template>

    <template v-slot:panel-main>
      <div class="h-100">
        <h2>カテゴリー</h2>
        <section class="section-new-card">
          <h3>新規作成</h3>
          <b-card class="card-new-category">
            <fieldset class="form-group" label="名称">
              <legend tabindex="-1" class="col-form-label pt-0">
                名称
              </legend>
              <b-input v-model="cardNewCategoryName" />
            </fieldset>

            <fieldset class="form-group mb-0">
              <button
                :disabled="cardNewCategoryCreateButtonDisabled"
                class="btn btn-primary"
                @click="createCategoryButtonClick"
              >
                作成
              </button>
            </fieldset>
          </b-card>
        </section>
        <section class="section-list">
          <h3>一覧</h3>
          <b-card
            v-for="category in $store.state.categories"
            :key="category.id"
            body-class="d-flex"
          >
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
          </b-card>
        </section>
      </div>
    </template>
  </TheMainLayout>
</template>

<script>
import ArticlesDatabase from '@/infrastructure/ArticlesDatabase.js'
import CategoryRepository from '@/infrastructure/CategoryRepository.js'

const articlesDatabase = new ArticlesDatabase()
const categoryRepository = new CategoryRepository(articlesDatabase)

export default {
  name: 'CategoryPage',

  computed: {
    cardNewCategoryCreateButtonDisabled () {
      const { created, name } = this.cardNewCategory
      return created || name == null || name.length <= 0
    },
    cardNewCategoryName: {
      get () {
        return this.cardNewCategory.name
      },
      set (value) {
        this.cardNewCategory.name = value
        this.cardNewCategory.created = false
      }
    }
  },

  data () {
    return {
      cardNewCategory: {
        created: false,
        name: ''
      }
    }
  },

  mounted () {
    this.$store.dispatch('loadCategories')
  },

  methods: {
    async createCategoryButtonClick () {
      this.cardNewCategory.created = true
      const title = this.cardNewCategory.name
      const tagSelectionMode = 'single'
      const categoryId = await categoryRepository.put({ title, tagSelectionMode })
      console.log('Category created. categoryId:', categoryId)
      this.$store.dispatch('loadCategories')
    },
    async exportButtonClick (category) {
      const categoryId = category.id
      this.$store.dispatch('exportArticles', { categoryId })
    }
  }
}
</script>
