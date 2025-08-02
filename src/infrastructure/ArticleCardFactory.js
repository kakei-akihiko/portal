export default class ArticleCardFactory {
  fromArticles (articles) {
    return articles.map(article => {
      const match = article.text == null ? null : article.text.match('^https?://[^ \r\n\t]+')

      const url = match == null ? null : match[0]

      return {
        expanded: false,
        url,
        ...article
      }
    })
  }
}
