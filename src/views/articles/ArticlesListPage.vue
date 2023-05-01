<script setup>
import { computed, onMounted } from 'vue'
import { loadCategories } from '../../store/index'
import { categoriesRef, categoryIdRef } from '../../store'

import ArticleListPageMainPanel from '@/views/articles/ArticleListPageMainPanel.vue'
import NavCategories from '@/components/navs/NavCategories.vue'
import FormGroupTagButtons from '@/components/form-groups/FormGroupTagButtons.vue'

const selectedCategory = computed(() => {
  return categoriesRef.value
        .filter(category => category.id === categoryIdRef.value)[0]
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
      <div class="h-100">
        <ArticleListPageMainPanel
          v-if="selectedCategory != null"
          :category="selectedCategory"
        />
      </div>
    </template>
  </TheMainLayout>
</template>
