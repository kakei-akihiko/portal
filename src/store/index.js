import Vue from 'vue'
import Vuex from 'vuex'

import ArticleCardFactory from '@/infrastructure/ArticleCardFactory.js'
import ArticleRepository from '@/infrastructure/ArticleRepository.js'
import ArticlesDatabase from '@/infrastructure/ArticlesDatabase.js'
import ArticleService from '@/usecases/ArticleService.js'
import CategoryRepository from '@/infrastructure/CategoryRepository.js'
import CategoryService from '@/usecases/CategoryService.js'
import { categoryIdRef, selectedTagTextsRef, setCategoryId } from './refactor'

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
    categories: []
  },
  mutations: {
    selectTagText (state, { text, selected }) {
      const selectedCategories = state.categories
        .filter(category => category.id === categoryIdRef.value)
      const tagSelectionMode = selectedCategories[0]?.tagSelectionMode ?? 'single'

      const alreadySelected = selectedTagTextsRef.value.includes(text)

      if (tagSelectionMode === 'single') {
        if (alreadySelected) {
          selectedTagTextsRef.value = []
        } else {
          selectedTagTextsRef.value = [text]
        }
        return
      }

      if (alreadySelected) {
        if (selected === false) {
          selectedTagTextsRef.value = selectedTagTextsRef.value
            .filter(_text => _text !== text)
          console.log('1')
        }
      } else if (selected) {
        selectedTagTextsRef.value.push(text)
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
      if (categories.length > 0 && categoryIdRef.value == null) {
        categoryIdRef.value = categories[0].id
      }
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
    async loadArticles (context, categoryId) {
      const articles = await articleService.get({ categoryId })
      const articleCards = articleCardFactory.fromArticles(articles)
      context.commit('setArticles', articleCards)
      setCategoryId(categoryId)
    },
    async loadCategories ({ commit, dispatch, state }) {
      const categories = await categoryRepository.getAll()
      commit('setCategories', { autoSelect: true, categories })
      if (categoryIdRef.value != null) {
        await dispatch('loadArticles', categoryIdRef.value)
      }
    },
    setArticleExpanded (context, { id, expanded }) {
      context.commit('setArticleExpand', { id, expanded })
      articleService.setExpanding(id, expanded)
    },
    async setArticlesViewModeToCategory (context, { categoryId, articlesViewMode }) {
      context.commit('setCategorySettings', { categoryId, articlesViewMode })
      await categoryService.setSettings(categoryId, { articlesViewMode })
    },
    async setCategorySettings (context, { categoryId, tagPosition, tagSelectionMode }) {
      context.commit('setCategorySettings', { categoryId, tagPosition, tagSelectionMode })
      await categoryService.setSettings(categoryId, { tagPosition, tagSelectionMode })
    }
  }
})
