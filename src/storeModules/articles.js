import marked from 'marked'

import Storage from '@/storeModules/storage.js'

const getTagsFormArticles = (articles) => {
  const tagsHash = articles.map(article => {
    return article.tags
  }).reduce((builder, tags) => {
    tags.forEach(tag => builder[tag] = true)
    return builder
  }, {})
  return Object.keys(tagsHash)
}

export const articles = {
  namespaced: true,

  state: {
    lastCreatedId: 3,

    articles: [
      {
        id: 1,
        title: '最初の記事',
        lead: 'リード1',
        text: '本文1',
        tags: ['記事', '非コンパクト'],
        url: null,
        compact: false,
        attributes: {
          leadHtml: null,
          bodyHtml: null,
        },
      },
      {
        id: 2,
        title: 'コンパクト記事',
        lead: 'リード2',
        text: '本文2',
        tags: ['記事', 'コンパクト'],
        url: 'http://localhost:8080',
        compact: true,
        attributes: {
          leadHtml: null,
          bodyHtml: null,
        },
      },
      {
        id: 3,
        title: 'コンパクトな何か',
        lead: 'リード3',
        text: '本文3',
        tags: ['コンパクト'],
        url: 'http://localhost:8080',
        compact: true,
        attributes: {
          leadHtml: null,
          bodyHtml: null,
        },
      },
    ],

    selectedTags: [],
  },

  mutations: {
    setArticle(state, {article} = {}) {
      let {id, title, text, tags, compact} = article

      const lines = (text || '').split('\n').filter(line => line.length > 0)
      const url = (lines.length > 0 && lines[0].match('^https?://')) ? lines[0] : null
      const leadIndex = url == null ? 0 : 1
      const lead = leadIndex < lines.length ? lines[leadIndex] : url

      const leadHtml = lead == null ? '' : marked(lead)
      const bodyHtml = text == null ? '' : marked(text)
      const newArticle = {
        id, title, lead, text, tags, url, compact,
        attributes: {leadHtml, bodyHtml}
      }

      if (newArticle.id == null) {
        state.lastCreatedId++
        newArticle.id = state.lastCreatedId
      } else if(newArticle.id > state.lastCreatedId) {
        state.lastCreatedId = newArticle.id
      }

      const matchedArticles = state.articles.filter(article => article.id == newArticle.id)
      if (matchedArticles.length <= 0) {
        state.articles.push(newArticle)
      } else {
        matchedArticles.forEach(article => {Object.assign(article, newArticle)})
      }

      Storage.setArticles({articles: state.articles})
    },

    selectTag(state, {tag, selected} = {}) {
      if (tag == null || selected == null) {
        log.error('selectedTag tag', tag, 'selected:', selected)
        throw Error('ArgumentNullException')
      }
      const selectedNow = state.selectedTags.some(_tag => _tag == tag)
      if (selected == selectedNow) {
        return
      }
      if (selected) {
        state.selectedTags.push(tag)
      } else {
        state.selectedTags = state.selectedTags.filter(_tag => _tag != tag)
      }
    },
  },

  getters: {
    articlesHasnotTag(state) {
      return state.articles.filter(article => {
        return article.tags == null || article.tags.length <= 0
          || article.tags.join('').length <= 0
      })
    },

    articlesHasSelectedTag(state) {
      return state.articles.filter(article => {
        return article.tags != null && article.tags.some(tag => {
          return state.selectedTags.some(_tag => tag == _tag)
        })
      })
    },

    compactTable(state, getters) {
      return getters.compactTags.reduce((builder, compactTag) => {
        const articles = state.articles.filter(article => {
          const compactable = article.url != null && article.compact && article.tags != null
          return compactable && article.tags.some(tag => {
            return compactTag == tag
          })
        })
        builder.push({tag: compactTag, articles})
        return builder
      }, [])
    },

    compactTags(state) {
      const articles = state.articles.filter(article => {
        return article.compact && article.url != null
      })
      return getTagsFormArticles(articles)
    },

    tags(state) {
      return getTagsFormArticles(state.articles)
    },
  },

  actions: {
    loadArticles({commit}) {
      const articles = Storage.loadArticles()
      if (articles != null) {
        articles.forEach(article => {
          commit('setArticle', {article})
        })
      }
    }
  }
}
