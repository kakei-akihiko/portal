<template>
  <b-button
    variant="link"
    :to="{ name: 'ArticleCreatePage', params: { categoryId } }"
  >
    <i class="fas fa-plus"></i>
  </b-button>
</template>

<script>
export default {
  name: 'ButtonArticleCreatePage',

  props: {
    categoryId: Number
  }
}
</script>
