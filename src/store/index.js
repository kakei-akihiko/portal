import { ref } from 'vue'
import ArticleCardFactory from '../infrastructure/ArticleCardFactory.js'
import ArticleRepository from '../infrastructure/ArticleRepository.js'
import ArticlesDatabase from '../infrastructure/ArticlesDatabase.js'
import ArticleService from '../usecases/ArticleService.js'
import CategoryRepository from '../infrastructure/CategoryRepository.js'
import CategoryService from '../usecases/CategoryService.js'
import SettingRepository from '../infrastructure/SettingRepository.js'
import SettingService from '../usecases/SettingService.js'

const articleCardFactory = new ArticleCardFactory()
const articlesDatabase = new ArticlesDatabase()
const categoryRepository = new CategoryRepository(articlesDatabase)
const categoryService = new CategoryService(categoryRepository)
export const articleRepository = new ArticleRepository(articlesDatabase)
export const articleService = new ArticleService(articleRepository, categoryRepository)
const settingRepository = new SettingRepository(articlesDatabase)
export const settingService = new SettingService(settingRepository)

export const articlesRef = ref([])

export const categoryIdRef = ref(null)

export const selectedTagTextsRef = ref([])

export const categoriesRef = ref([])

export const setCategoryId = categoryId => {
  categoryIdRef.value = categoryId
  selectedTagTextsRef.value = []
}

const setArticleExpand = ({ id, expanded }) => {
  articlesRef.value
    .filter(article => article.id === id)
    .forEach(article => {
      article.expanded = expanded
    })
}

const _setCategorySettings = ({ categoryId, articlesViewMode, tagPosition, tagSelectionMode }) => {
  categoriesRef.value
    .filter(category => category.id === categoryId)
    .forEach(category => {
      category.articlesViewMode = articlesViewMode ?? category.articlesViewMode
      category.tagPosition = tagPosition ?? category.tagPosition
      category.tagSelectionMode = tagSelectionMode ?? category.tagSelectionMode
    })
}

export const loadArticles = async categoryId => {
  const articles = await articleService.get({ categoryId })
  articlesRef.value = articleCardFactory.fromArticles(articles)
}

export const loadCategories = async () => {
  const categories = await categoryRepository.getAll()
  categoriesRef.value = categories
}

export const setArticleExpanded = ({ id, expanded }) => {
  setArticleExpand({ id, expanded })
  articleService.setExpanding(id, expanded)
}

export const setArticlesViewModeToCategory = async ({ categoryId, articlesViewMode }) => {
  _setCategorySettings({ categoryId, articlesViewMode })
  await categoryService.setSettings(categoryId, { articlesViewMode })
}

export const setCategorySettings = async ({ categoryId, tagPosition, tagSelectionMode }) => {
  _setCategorySettings({ categoryId, tagPosition, tagSelectionMode })
  await categoryService.setSettings(categoryId, { tagPosition, tagSelectionMode })
}

export const selectTagText = ({ text, selected }) => {
  const selectedCategories = categoriesRef.value
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
}
