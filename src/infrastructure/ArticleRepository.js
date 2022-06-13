import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export default class ArticleRepository {
  constructor (articlesDatabase) {
    this.database = articlesDatabase.instance
  }

  async addTagsToArticle (articleId, tags) {
    const articleTags = tags.map(tagText => {
      return { articleId, tagText }
    })

    await this.database.articleTags.bulkPut(articleTags)
  }

  async deleteTagsFromArticle (ids) {
    await this.database.articleTags.bulkDelete(ids)
  }

  export (articles) {
    const json = JSON.stringify({ articles }, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.target = '_blank'
    a.download = 'Articles.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  async getArticles ({ categoryId, articleId }) {
    return await this.database.articles
      .filter(article => {
        return (categoryId == null || article.categoryId === categoryId) &&
          (articleId == null || article.id === articleId)
      })
      .toArray()
  }

  async getArticleTags (articleIds) {
    return await this.database.articleTags
      .filter(articleTag => articleIds.includes(articleTag.articleId))
      .toArray()
  }

  async getTagTexts (articleId) {
    return await this.database.articleTags
      .filter(articleTag => articleTag.articleId === articleId)
      .toArray()
  }

  async setArticle ({ id, categoryId, expanded, title, text }) {
    const updatedOn = dayjs.utc().format()
    return await this.database.articles.put({ id, categoryId, expanded, title, text, updatedOn })
  }
}
