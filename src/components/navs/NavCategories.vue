<template>
  <b-nav vertical class="nav-category">
    <b-nav-item
      v-for="category in categories"
      :key="category.id"
      :active="category.active"
      @click="categorySelect(category)"
    >
      {{ category.title }}
    </b-nav-item>
  </b-nav>
</template>

<script>
export default {
  name: 'NavCategories',

  computed: {
    categories () {
      return this.$store.state.categories.map(category => {
        const { id, title } = category
        const active = id === this.$store.state.categoryId
        return { active, id, title }
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
