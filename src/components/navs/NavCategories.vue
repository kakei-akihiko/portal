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

<script>
export default {
  name: 'NavCategories',

  computed: {
    categories () {
      return this.$store.state.categories.map(category => {
        const { id, title } = category
        const active = id === this.$store.state.categoryId
        const anchorClass = {
          active,
          'nav-link': true
        }
        return { anchorClass, id, title }
      })
    }
  },

  methods: {
    async categorySelect (category) {
      if (category != null) {
        this.$store.commit('setCategoryId', category.id)
        await this.$store.dispatch('loadArticles', category.id)
      }
    }
  }
}
</script>
