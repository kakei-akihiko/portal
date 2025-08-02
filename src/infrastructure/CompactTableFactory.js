export default class CompactTableFactory {
  create (articles, selectedTagTexts) {
    const _articles = this.getArticles(articles, selectedTagTexts)

    const _tags = this.getTags(_articles)

    return this.getTable(_articles, _tags)
  }

  getArticles (articles, selectedTagTexts) {
    return articles
      .filter(article => article.url != null)
      .filter(article => {
        return this.isTargetArticle(article, selectedTagTexts)
      })
  }

  isTargetArticle (article, selectedTagTexts) {
    if (selectedTagTexts == null || selectedTagTexts.length <= 0) {
      return true
    }

    if (article.tags == null) {
      return false
    }

    // 選択されたタグをすべて含む
    return selectedTagTexts
      .every(tagText => article.tags.includes(tagText))
  }

  getTags (articles) {
    const noTagArticleFound = articles.some(article => {
      return article.tags == null || article.tags.length <= 0
    })

    const nullTags = noTagArticleFound
      ? [{ text: '（タグなし）', value: null }]
      : []

    const tagArticles = articles
      .map(article => article.tags)
      .reduce((array, tags) => {
        tags.forEach(tag => {
          if (array.includes(tag) === false) {
            array.push(tag)
          }
        })
        return array
      }, [])
      .map(tag => {
        return { text: tag, value: tag }
      })

    return [...nullTags, ...tagArticles]
  }

  getTable (articles, tags) {
    return tags.map(tag => {
      const _articles = articles.filter(article => {
        if (tag.value == null) {
          return article.tags == null || article.tags.length <= 0
        } else {
          return article.tags != null && article.tags.includes(tag.value)
        }
      })
      return { ...tag, articles: _articles }
    })
  }
}
