<template>
  <button
    class="btn btn-link"
    @click="buttonClick"
  >
    <i class="fas fa-plus"></i>
  </button>
</template>

<script>
export default {
  name: 'ButtonArticleCreatePage',

  props: {
    categoryId: Number
  },

  methods: {
    buttonClick () {
      const { categoryId } = this
      this.$router.push({
        name: 'ArticleCreatePage',
        params: { categoryId }
      })
    }
  }
}
</script>
