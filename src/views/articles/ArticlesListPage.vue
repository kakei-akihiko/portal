<template>
  <TheMainLayout main-panel-scroll>
    <TheSidebar slot="sidebar">
      <NavCategories class="mt-3"/>
      <FormGroupTagButtons class="mt-3"/>
    </TheSidebar>

    <div slot="panel-main" class="h-100">
      <ArticleListPageMainPanel
        v-if="selectedCategory != null"
        :category="selectedCategory"
      />
    </div>
  </TheMainLayout>
</template>

<script>
import { mapState } from 'vuex'

import ArticleListPageMainPanel from '@/views/articles/ArticleListPageMainPanel.vue'
import NavCategories from '@/components/navs/NavCategories.vue'
import FormGroupTagButtons from '@/components/form-groups/FormGroupTagButtons.vue'

export default {
  name: 'ArticlesListPage',

  components: { ArticleListPageMainPanel, FormGroupTagButtons, NavCategories },

  computed: {
    ...mapState(['categories', 'categoryId']),

    selectedCategory () {
      return this.categories
        .filter(category => category.id === this.categoryId)[0]
    }
  },

  async mounted () {
    this.$store.dispatch('loadCategories')
  }
}
</script>

<style>
.command-bar {
  text-align: right;
}
</style>
