<template>
  <TheMainLayout main-panel-scroll>
    <template v-slot:sidebar>
      <TheSidebar>
        <NavCategories class="categories"/>
        <FormGroupTagButtons class="tag-buttons"/>
      </TheSidebar>
    </template>

    <template v-slot:panel-main>
      <div
        v-if="categoryAlert.visible"
        class="alert alert-warning"
      >
        {{ categoryAlert.message }}
      </div>
      <ArticleListPageMainPanel
        v-if="selectedCategory != null"
        :category="selectedCategory"
      />
    </template>
  </TheMainLayout>
</template>

<script setup>

import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { categoryIdRef, categoriesRef, loadArticles, loadCategories } from '../../store/index'

import ArticleListPageMainPanel from './ArticleListPageMainPanel.vue'
import NavCategories from '../../components/navs/NavCategories.vue'
import FormGroupTagButtons from '../../components/form-groups/FormGroupTagButtons.vue'


const route = useRoute()

const selectedCategory = computed(() => {
  if (categoryIdRef.value == null) {
    return null
  }
  return categoriesRef.value
    .filter(category => category.id === categoryIdRef.value)[0]
})


const categoryAlert = computed(() => {
  if (categoriesRef.value == null || categoriesRef.value.length <= 0) {
    return {
      visible: true,
      message: 'カテゴリーがありません。サイドバー下部の「カテゴリー」をクリックして作成しましょう。'
    }
  }
  if (categoryIdRef.value == null) {
    return {
      visible: true,
      message: 'カテゴリーを選択してください。'
    }
  }
  return { visible: false }
})


function setCategoryIdFromQuery() {
  const id = route.params.categoryId
  if (typeof id === 'string' && /^\d+$/.test(id) && Number(id) >= 0) {
    categoryIdRef.value = Number(id)
  }
}

onMounted(() => {
  loadCategories()
  setCategoryIdFromQuery()
  if (categoryIdRef.value != null) {
    loadArticles(categoryIdRef.value)
  }
})

watch(() => route.params.categoryId, (newId) => {
  if (typeof newId === 'string' && /^\d+$/.test(newId) && Number(newId) >= 0) {
    categoryIdRef.value = Number(newId)
    if (categoryIdRef.value != null) {
      loadArticles(categoryIdRef.value)
    }
  }
})
</script>

<style>
.command-bar {
  text-align: right;
}
</style>

<style scoped>
.categories {
  margin-top: .5rem;
}

.tag-buttons {
  margin-top: .5rem;
}
</style>
