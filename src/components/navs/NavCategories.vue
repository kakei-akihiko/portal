<template>
  <div class="categories">
    <div class="nav-item"
      v-for="category in categories"
      :key="category.id"
      @click="categorySelect(category)"
    >
      <a :class="category.anchorClass" href="#" target="_self">
        {{ category.title }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { categoriesRef, categoryIdRef } from '../../store/index'

const router = useRouter()

const categories = computed(() => {
  return categoriesRef.value.map(category => {
    const { id, title } = category
    const active = id === categoryIdRef.value
    const anchorClass = {
      active,
      'nav-link': true,
      'sidebar-item': true
    }
    return { anchorClass, id, title }
  })
})

const categorySelect = async category => {
  if (category != null) {
    const categoryId = category.id
    console.log({
      name: 'ArticlesListPage',
      params: { categoryId }
    })
    router.push({
      name: 'ArticlesListPage',
      params: { categoryId }
    })
  }
}
</script>

<style scoped>
.categories {
  padding: 0 .5rem;
}

.sidebar-item {
  display: grid;
  height: 50px;
  align-items: center;
  color: #505050;
  padding-left: 10px;
}

.sidebar-item:hover {
  background-color: #FFFFFF80;
  border-radius: .2rem;
}
</style>
