<template>
  <div class="d-flex flex-column h-100">
    <h1 class="h2">
      <span>🏠</span>
      <span class="site-title-animals">🐕🦘🐬🐓🕊🦢</span>
    </h1>
    <slot/>
    <div class="mt-auto"></div>
    <div v-if="sidebarArticle != null">
      <div v-html="sidebarArticle.html" />
    </div>
    <b-form-group v-if="$route.name != 'ArticlesListPage'">
      <b-button
        variant="link"
        :to="{name: 'ArticlesListPage'}"
      >
        <i class="far fa-newspaper"></i>
        <span class="ml-2">記事</span>
      </b-button>
    </b-form-group>
    <b-form-group v-if="$route.name != 'CategoryPage'">
      <b-button
        variant="link"
        :to="{name: 'CategoryPage'}"
      >
        <i class="far fa-folder-open"></i>
        <span class="ml-2">カテゴリー</span>
      </b-button>
    </b-form-group>
    <b-form-group v-if="$route.name != 'SettingPage'">
      <b-button
        variant="link"
        :to="{name: 'SettingPage'}"
      >
        <i class="fas fa-cog"></i>
        <span class="ml-2">設定</span>
      </b-button>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: 'TheSidebar',

  computed: {
    sidebarArticle () {
      return this.$store.state.sidebar.article
    }
  },

  async mounted () {
    if (this.$store.state.sidebar.articleId == null) {
      await this.$store.dispatch('sidebar/loadSetting')
    }
  }
}
</script>

<style scoped>
.site-title-animals {
  font-size: 40%
}
</style>
