<template>
  <div class="h-100">
    <div class="d-flex">
      <h2>{{ category.title }}</h2>
      <div class="ml-auto">
        <fieldset class="form-group">
          <ButtonCategorySettingPage :category-id="category.id"/>
          <ButtonArticleCreatePage :category-id="category.id"/>
        </fieldset>
      </div>
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

<script>
import ArticlePanel from '@/components/panels/articles/ArticlePanel.vue'
import ButtonArticleCreatePage from '@/components/buttons/ButtonArticleCreatePage.vue'
import ButtonCategorySettingPage from '@/components/buttons/ButtonCategorySettingPage.vue'
import CampactLinksPanel from '@/components/panels/CampactLinksPanel.vue'
import NavArticleViewMode from '@/components/navs/NavArticleViewMode.vue'
import CompactTableFactory from '@/infrastructure/CompactTableFactory.js'

const compactTableFactory = new CompactTableFactory()

export default {

  name: 'ArticleListPageMainPanel',

  components: {
    ArticlePanel,
    ButtonArticleCreatePage,
    ButtonCategorySettingPage,
    CampactLinksPanel,
    NavArticleViewMode
  },

  props: {
    category: {
      type: Object,
      required: true
    }
  },

  computed: {
    alertCompactOnlyVisible () {
      return this.modeDetailActive && this.articles.length <= 0 && this.table.length > 0
    },
    alertDetailOnlyVisible () {
      return this.modeCompactActive && this.articles.length > 0 && this.table.length <= 0
    },
    alertNoArticle () {
      return this.articles.length <= 0 && this.table.length <= 0
    },
    articles () {
      const { articles, selectedTagTexts } = this.$store.state
      return articles
        .filter(article => {
          return compactTableFactory.isTargetArticle(article, selectedTagTexts)
        })
    },
    mode () {
      return this.category.articlesViewMode === 'detail' ? 'detail' : 'compact'
    },
    modeCompactActive () {
      return this.mode === 'compact'
    },
    modeDetailActive () {
      return this.mode === 'detail'
    },
    table () {
      const { articles, selectedTagTexts } = this.$store.state
      return compactTableFactory.create(articles, selectedTagTexts)
    }
  },

  methods: {
    articleExpand (article, expanded) {
      const { id } = article
      this.$store.dispatch('setArticleExpanded', { id, expanded })
    },
    navViewModeChange (articlesViewMode) {
      const categoryId = this.category.id
      this.$store.dispatch('setArticlesViewModeToCategory', {
        categoryId,
        articlesViewMode
      })
    }
  }
}
</script>
