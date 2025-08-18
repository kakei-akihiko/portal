<template>
  <div>
    <div class="title-bar">
      <h2>{{ category.title }}</h2>
      <fieldset class="title-bar-buttons">
        <ButtonCategorySettingPage :category-id="category.id"/>
        <ButtonArticleCreatePage :category-id="category.id"/>
      </fieldset>
    </div>
    <div class="command-bar d-flex justify-content-end">
      <NavArticleViewMode
        :mode="mode"
        @change="navViewModeChange"
      />
    </div>

    <div class="alerts pt-3">
      <div
        v-if="alertCompactOnlyVisible"
        class="alert alert-warning"
      >
        詳細モードで可能な記事がありません。コンパクトモードであれば表示できます。
      </div>
      <div
        v-if="alertDetailOnlyVisible"
        class="alert alert-warning"
      >
        コンパクトモードで可能な記事がありません。詳細モードであれば表示できます。
      </div>
      <div
        v-if="alertNoArticle"
        class="alert alert-warning"
      >
        検索条件に合致する記事がありません。
      </div>
    </div>

    <div
      v-if="modeDetailActive"
      class="pt-3"
    >
      <ArticlePanel
        v-for="article in articles"
        :key="article.id"
        :article="article"
        :tagPosition="category.tagPosition"
        @expand="articleExpand(article, $event)"
      />
    </div>

    <CampactLinksPanel
      v-if="modeCompactActive"
      :table="table"
      class="pt-3"
    />

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { setArticleExpanded, setArticlesViewModeToCategory, articlesRef, selectedTagTextsRef } from '../../store/index'

import ArticlePanel from '../../components/panels/articles/ArticlePanel.vue'
import ButtonArticleCreatePage from '../../components/buttons/ButtonArticleCreatePage.vue'
import ButtonCategorySettingPage from '../../components/buttons/ButtonCategorySettingPage.vue'
import CampactLinksPanel from '../../components/panels/CampactLinksPanel.vue'
import NavArticleViewMode from '../../components/navs/NavArticleViewMode.vue'
import CompactTableFactory from '../../infrastructure/CompactTableFactory.js'

const compactTableFactory = new CompactTableFactory()

const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})

const mode = computed(() => {
  return props.category.articlesViewMode === 'detail' ? 'detail' : 'compact'
})

const modeCompactActive = computed(() => {
  return mode.value === 'compact'
})

const modeDetailActive = computed(() => {
  return mode.value === 'detail'
})

const articles = computed(() => {
  return articlesRef.value
    .filter(article => {
      return compactTableFactory.isTargetArticle(article, selectedTagTextsRef.value)
    })
})

const table = computed(() => {
  const _articles = articlesRef.value
  return compactTableFactory.create(_articles, selectedTagTextsRef.value)
})

const alertCompactOnlyVisible = computed(() => {
  return modeDetailActive.value && articles.value.length <= 0 && table.value.length > 0
})

const alertDetailOnlyVisible = computed(() => {
  return modeCompactActive.value && articles.value.length > 0 && table.value.length <= 0
})

const alertNoArticle = computed(() => {
  return articles.value.length <= 0 && table.value.length <= 0
})

const articleExpand = (article, expanded) => {
  const { id } = article
  setArticleExpanded({ id, expanded })
}

const navViewModeChange = (articlesViewMode) => {
  const categoryId = props.category.id
  setArticlesViewModeToCategory({
    categoryId,
    articlesViewMode
  })
}
</script>

<style>
.title-bar {
  display: grid;
  grid-template-columns: 1fr auto;
}

.title-bar-buttons {
  border-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
</style>
