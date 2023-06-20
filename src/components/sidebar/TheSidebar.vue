<script setup>
import { onMounted } from 'vue'
import { loadSidebarSetting, sidebarArticleRef } from '../../store/ref'
import router from '../../router/index'

onMounted(async () => {
  // まだ読み込んでいない場合だけ読み込む
  if (sidebarArticleRef.value == null) {
    await loadSidebarSetting()
  }
})

const articleListButtonClick = () => {
  router.push({ name: 'ArticlesListPage' })
}

const categoryButtonClick = () => {
  router.push({ name: 'CategoryPage' })
}

const settingButtonClick = () => {
  router.push({ name: 'SettingPage' })
}
</script>

<template>
  <div class="d-flex flex-column h-100">
    <h1 class="h2">
      <span>🏠</span>
      <span class="site-title-animals">🐕🦘🐬🐓🕊🦢</span>
    </h1>
    <slot/>
    <div class="mt-auto"></div>
    <div v-if="sidebarArticleRef != null">
      <div v-html="sidebarArticleRef.html" />
    </div>
    <fieldset class="form-group" v-if="$route.name != 'ArticlesListPage'">
      <button
        class="btn btn-link"
        @click="articleListButtonClick"
      >
        <i class="far fa-newspaper"></i>
        <span class="ml-2">記事</span>
      </button>
    </fieldset>
    <fieldset class="form-group" v-if="$route.name != 'CategoryPage'">
      <button
        class="btn btn-link"
        @click="categoryButtonClick"
      >
        <i class="far fa-folder-open"></i>
        <span class="ml-2">カテゴリー</span>
      </button>
    </fieldset>
    <fieldset class="form-group" v-if="$route.name != 'SettingPage'">
      <button
        class="btn btn-link"
        @click="settingButtonClick"
      >
        <i class="fas fa-cog"></i>
        <span class="ml-2">設定</span>
      </button>
    </fieldset>
  </div>
</template>

<style scoped>
.site-title-animals {
  font-size: 40%
}
</style>
