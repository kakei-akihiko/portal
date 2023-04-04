<script setup>
import { computed } from 'vue'
import store from '../../store/index'
import { categoriesRef, categoryIdRef, setCategoryId } from '../../store/refactor'

const categories = computed(() => {
  return categoriesRef.value.map(category => {
    const { id, title } = category
    const active = id === categoryIdRef.value
    const anchorClass = {
      active,
      'nav-link': true
    }
    return { anchorClass, id, title }
  })
})

const categorySelect = async category => {
  if (category != null) {
    setCategoryId(category.id)
    await store.dispatch('loadArticles', category.id)
  }
}
</script>

<template>
  <ul class="nav flex-column nav-category mt-3">
    <li class="nav-item"
      v-for="category in categories"
      :key="category.id"
      @click="categorySelect(category)"
    >
      <a :class="category.anchorClass" href="#" target="_self">
        {{ category.title }}
      </a>
    </li>
  </ul>
</template>
