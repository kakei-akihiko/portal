import { marked } from '../../infrastructure/markdown.js'

export default {
  namespaced: true,

  state: () => ({
    article: null,
    articleId: null
  }),

  mutations: {
    setArticle (state, article) {
      const html = article == null || article.text == null ? null
        : marked.parse(article.text)
      state.article = { html, ...article }
    },
    setArticleId (state, id) {
      state.articleId = id
    }
  }
}
