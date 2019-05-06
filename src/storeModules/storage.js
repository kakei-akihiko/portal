
export default class Storage {
  static setArticles({articles} = {}) {
    const json = JSON.stringify({articles})
    localStorage.setItem('TagAndText.Articles', json)
  }

  static loadArticles() {
    const json = localStorage.getItem('TagAndText.Articles')
    if (json == null) {
      return null
    }
    const parsed = JSON.parse(json)
    return parsed.articles
  }

  static setSettings({settings} = {}) {
    const json = JSON.stringify(settings)
    localStorage.setItem('TagAndText.Settings', json)
  }

  static loadSettings() {
    const json = localStorage.getItem('TagAndText.Settings')
    if (json == null) {
      return null
    }
    const parsed = JSON.parse(json)
    return parsed
  }
}
