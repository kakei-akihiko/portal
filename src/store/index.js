import Vue from 'vue'
import Vuex from 'vuex'

import ArticleCardFactory from '@/infrastructure/ArticleCardFactory.js'
import ArticleRepository from '@/infrastructure/ArticleRepository.js'
import ArticlesDatabase from '@/infrastructure/ArticlesDatabase.js'
import ArticleService from '@/usecases/ArticleService.js'
import CategoryRepository from '@/infrastructure/CategoryRepository.js'
import CategoryService from '@/usecases/CategoryService.js'
import sidebar from './modules/sidebar.js'

const articleCardFactory = new ArticleCardFactory()
const articlesDatabase = new ArticlesDatabase()
const articleRepository = new ArticleRepository(articlesDatabase)
const categoryRepository = new CategoryRepository(articlesDatabase)
const categoryService = new CategoryService(categoryRepository)
const articleService = new ArticleService(articleRepository, categoryRepository)

export const dependances = {
  articlesDatabase,
  articleRepository,
  articleService,
  settingService: null
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: [],
    categoryId: null,
    categories: [],
    selectedTagTexts: []
  },
  getters: {
    allTags (state) {
      const tagTexts = state.articles
        .map(article => article.tags ?? [])
        .reduce((results, tags) => {
          tags.filter(tag => results.includes(tag) === false)
            .forEach(tag => results.push(tag))
          return results
        }, [])
      return tagTexts.map(tagText => {
        const selected = state.selectedTagTexts.includes(tagText)
        return { selected, text: tagText, value: tagText }
      })
    },
    getDependances () {
      return () => ({ ...dependances })
    }
  },
  mutations: {
    selectTagText (state, { text, selected }) {
      const selectedCategories = state.categories
        .filter(category => category.id === state.categoryId)
      const tagSelectionMode = selectedCategories[0]?.tagSelectionMode ?? 'single'

      const alreadySelected = state.selectedTagTexts.includes(text)

      if (tagSelectionMode === 'single') {
        if (alreadySelected) {
          state.selectedTagTexts = []
        } else {
          state.selectedTagTexts = [text]
        }
        return
      }

      if (alreadySelected) {
        if (selected === false) {
          state.selectedTagTexts = state.selectedTagTexts
            .filter(_text => _text !== text)
        }
      } else if (selected) {
        state.selectedTagTexts.push(text)
      }
    },
    setArticleExpand (state, { id, expanded }) {
      state.articles
        .filter(article => article.id === id)
        .forEach(article => {
          article.expanded = expanded
        })
    },
    setArticles (state, articles) {
      state.articles = articles
    },
    setCategories (state, { autoSelect, categories }) {
      state.categories = categories
      if (categories.length > 0 && state.categoryId == null) {
        state.categoryId = categories[0].id
      }
    },
    setCategoryId (state, categoryId) {
      state.categoryId = categoryId
      state.selectedTagTexts = []
    },
    setCategorySettings (state, { categoryId, articlesViewMode, tagPosition, tagSelectionMode }) {
      state.categories
        .filter(category => category.id === categoryId)
        .forEach(category => {
          category.articlesViewMode = articlesViewMode ?? category.articlesViewMode
          category.tagPosition = tagPosition ?? category.tagPosition
          category.tagSelectionMode = tagSelectionMode ?? category.tagSelectionMode
        })
    }
  },
  actions: {
    async exportArticles (context, { categoryId }) {
      const articles = await articleService.get({ categoryId })
      articleRepository.export(articles)
    },
    async loadArticles (context, categoryId) {
      const articles = await articleService.get({ categoryId })
      const articleCards = articleCardFactory.fromArticles(articles)
      context.commit('setArticles', articleCards)
      context.commit('setCategoryId', categoryId)
    },
    async loadCategories ({ commit, dispatch, state }) {
      const categories = await categoryRepository.getAll()
      commit('setCategories', { autoSelect: true, categories })
      if (state.categoryId != null) {
        await dispatch('loadArticles', state.categoryId)
      }
    },
    setArticleExpanded (context, { id, expanded }) {
      context.commit('setArticleExpand', { id, expanded })
      articleService.setExpanding(id, expanded)
    },
    async setArticlesViewModeToCategory (context, { categoryId, articlesViewMode }) {
      console.log('store...', { categoryId, articlesViewMode })
      context.commit('setCategorySettings', { categoryId, articlesViewMode })
      await categoryService.setSettings(categoryId, { articlesViewMode })
    },
    async setCategorySettings (context, { categoryId, tagPosition, tagSelectionMode }) {
      context.commit('setCategorySettings', { categoryId, tagPosition, tagSelectionMode })
      await categoryService.setSettings(categoryId, { tagPosition, tagSelectionMode })
    }
  },
  modules: {
    sidebar
  }
})
