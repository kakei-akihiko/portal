import { computed } from 'vue'
import store, { dependances } from './index.js'

export const allTagsRef = computed(() => {
  const tagTexts = store.state.articles
    .map(article => article.tags ?? [])
    .reduce((results, tags) => {
      tags.filter(tag => results.includes(tag) === false)
        .forEach(tag => results.push(tag))
      return results
    }, [])
  return tagTexts.map(tagText => {
    const selected = store.state.selectedTagTexts.includes(tagText)
    return { selected, text: tagText, value: tagText }
  })
})

export const exportArticles = async categoryId => {
  const articles = await dependances.articleService.get({ categoryId })
  dependances.articleRepository.export(articles)
}

export const setSidebarArticleId = async articleId => {
  const { settingService } = dependances
  await settingService.setSidebarArticleId(articleId)
  store.commit('sidebar/setArticleId', articleId)
}

export const loadSidebarSetting = async () => {
  const { articleService, settingService } = dependances

  const { articleId } = await settingService.getSidebarSetting()
  if (articleId == null) {
    store.commit('sidebar/setArticleId', null)
    store.commit('sidebar/setArticle', null)
    return
  }
  const articles = await articleService.get({ articleId })
  const article = articles[0]
  store.commit('sidebar/setArticleId', articleId)
  store.commit('sidebar/setArticle', article)
}
