<script setup>
import { computed, onMounted } from 'vue'
import { categoryIdRef, categoriesRef, loadCategories } from '../../store/index'

import ArticleListPageMainPanel from './ArticleListPageMainPanel.vue'
import NavCategories from '../../components/navs/NavCategories.vue'
import FormGroupTagButtons from '../../components/form-groups/FormGroupTagButtons.vue'

const selectedCategory = computed(() => {
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

onMounted(() => {
  loadCategories()
})
</script>

<style>
.command-bar {
  text-align: right;
}
</style>

<template>
  <TheMainLayout main-panel-scroll>
    <template v-slot:sidebar>
      <TheSidebar>
        <NavCategories class="mt-3"/>
        <FormGroupTagButtons class="mt-3"/>
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
