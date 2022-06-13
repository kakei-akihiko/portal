<template>
  <div>
    <div
      v-for="tagArticles in table"
      :key="tagArticles.text"
      class="h-interval"
    >
      <h3>{{ tagArticles.text }}</h3>
      <a
        v-for="article in tagArticles.articles"
        :key="article.id"
        :href="article.url"
        target="_blank"
      >
        {{ article.title }}
      </a>

    </div>
  </div>
</template>

<script>
export default {
  name: 'CampactLinksPanel',

  props: {
    table: Array
  }
}
</script>
