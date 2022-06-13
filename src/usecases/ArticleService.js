export default class ArticleService {
  constructor (articleRepository, categoryRepository) {
    this.articleRepository = articleRepository
    this.categoryRepository = categoryRepository
  }

  async get ({ categoryId, articleId }) {
    try {
      const articles = await this.articleRepository.getArticles({ categoryId, articleId })

      const articleIds = articles.map(article => article.id)

      const articleTags = await this.articleRepository.getArticleTags(articleIds)

      return articles.map(article => {
        return this.getResult(article, articleTags)
      })
    } catch (ex) {
      console.error('記事読み込めませんでした。', ex)
    }
  }

  async set ({ id, categoryId, expanded, title, text, tags }) {
    const category = await this.categoryRepository.get(categoryId)

    if (category == null) {
      console.error('Specified categoryId not found. categoryId:', categoryId)
      throw new Error('Specified categoryId not found. categoryId: ' + categoryId)
    }

    try {
      const articleId = await this.articleRepository.setArticle({ id, categoryId, expanded, title, text })

      console.log('Inserted. articleId:', articleId)

      const articleTags = await this.articleRepository.getArticleTags([articleId])

      if (!this.areEqualTagsToArticleTags(tags, articleTags)) {
        const ids = articleTags.map(articleTag => articleTag.id)
        await this.articleRepository.deleteTagsFromArticle(ids)
        await this.articleRepository.addTagsToArticle(articleId, tags)
      }

      return articleId
    } catch (ex) {
      console.error('記事を保存できませんでした。', ex.stack || ex)
    }
  }

  async setExpanding (id, expanded) {
    try {
      const articles = await this.articleRepository.getArticles({ articleId: id })

      if (articles.length <= 0) {
        throw new Error('Specified articleId not found. articleId: ' + id)
      }

      articles[0].expanded = expanded

      this.articleRepository.setArticle(articles[0])
    } catch (ex) {
      console.error('記事を保存できませんでした。', ex.stack || ex)
    }
  }

  getResult (article, articleTags) {
    const _tags = articleTags
      .filter(articleTag => articleTag.articleId === article.id)
      .map(articleTag => articleTag.tagText)

    const tags = Array.from(new Set(_tags).values())

    return { ...article, tags }
  }

  areEqualTagsToArticleTags (tags, articleTags) {
    if (tags.length !== articleTags.length) {
      return false
    }
    for (let i = 0; i < tags.length; i++) {
      if (tags[i] !== articleTags[i].tagText) {
        return false
      }
    }
    return true
  }
}
