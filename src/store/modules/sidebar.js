import { marked } from 'marked'

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
  },
  actions: {
    async loadSetting ({ commit, rootGetters }) {
      const { articleService, settingService } = rootGetters.getDependances()

      const { articleId } = await settingService.getSidebarSetting()
      if (articleId == null) {
        commit('setArticleId', null)
        commit('setArticle', null)
        return
      }
      const articles = await articleService.get({ articleId })
      const article = articles[0]
      commit('setArticleId', articleId)
      commit('setArticle', article)
    },
    async setArticleId ({ commit, rootGetters }, articleId) {
      const { settingService } = rootGetters.getDependances()
      await settingService.setSidebarArticleId(articleId)
      commit('setArticleId', articleId)
    }
  }
}
