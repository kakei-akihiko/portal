import Vue from 'vue'
import Vuex from 'vuex'

import ArticleCardFactory from '@/infrastructure/ArticleCardFactory.js'
import ArticleRepository from '@/infrastructure/ArticleRepository.js'
import ArticlesDatabase from '@/infrastructure/ArticlesDatabase.js'
import ArticleService from '@/usecases/ArticleService.js'
import CategoryRepository from '@/infrastructure/CategoryRepository.js'
import CategoryService from '@/usecases/CategoryService.js'
import SettingRepository from '@/infrastructure/SettingRepository.js'
import SettingService from '@/usecases/SettingService.js'
import { articlesRef, categoriesRef, categoryIdRef, setCategoryId } from './refactor'

const articleCardFactory = new ArticleCardFactory()
const articlesDatabase = new ArticlesDatabase()
const categoryRepository = new CategoryRepository(articlesDatabase)
const categoryService = new CategoryService(categoryRepository)
export const articleRepository = new ArticleRepository(articlesDatabase)
export const articleService = new ArticleService(articleRepository, categoryRepository)
const settingRepository = new SettingRepository(articlesDatabase)
export const settingService = new SettingService(settingRepository)

Vue.use(Vuex)

export default new Vuex.Store({
  mutations: {
    setArticleExpand (state, { id, expanded }) {
      articlesRef.value
        .filter(article => article.id === id)
        .forEach(article => {
          article.expanded = expanded
        })
    },
    setArticles (state, articles) {
      articlesRef.value = articles
    },
    setCategories (state, { autoSelect, categories }) {
      categoriesRef.value = categories
      if (categories.length > 0 && categoryIdRef.value == null) {
        categoryIdRef.value = categories[0].id
      }
    },
    setCategorySettings (state, { categoryId, articlesViewMode, tagPosition, tagSelectionMode }) {
      categoriesRef.value
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
