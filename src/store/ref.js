import { computed, ref } from 'vue'
import { articlesRef, selectedTagTextsRef } from './refactor'
import { articleService, articleRepository, settingService } from './index.js'
import { marked } from '../infrastructure/markdown.js'

export const allTagsRef = computed(() => {
  const tagTexts = articlesRef.value
    .map(article => article.tags ?? [])
    .reduce((results, tags) => {
      tags.filter(tag => results.includes(tag) === false)
        .forEach(tag => results.push(tag))
      return results
    }, [])
  return tagTexts.map(tagText => {
    const selected = selectedTagTextsRef.value.includes(tagText)
    return { selected, text: tagText, value: tagText }
  })
})

export const exportArticles = async categoryId => {
  const articles = await articleService.get({ categoryId })
  articleRepository.export(articles)
}

export const sidebarArticleRef = ref(null)

export const loadSidebarSetting = async () => {
  const { articleId } = await settingService.getSidebarSetting()
  if (articleId == null) {
    sidebarArticleRef.value = null
    return
  }
  const articles = await articleService.get({ articleId })
  const article = articles[0]
  const html = article?.text == null ? null : marked.parse(article.text)
  sidebarArticleRef.value = { html, ...article }
}

export const setSidebarArticleId = async articleId => {
  await settingService.setSidebarArticleId(articleId)
  await loadSidebarSetting()
}
