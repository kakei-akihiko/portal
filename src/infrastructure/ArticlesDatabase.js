import Dexie from 'dexie'

export default class ArticlesDatabase {
  constructor () {
    this.instance = new Dexie('articlesDatabase')

    this.instance.version(2).stores(
      {
        articles: '++id, categoryId, title, text, createdOn, updatedOn',
        articleTags: '++id, articleId, tagText',
        categories: '++id, title',
        settings: 'name'
      }
    )

    this.instance.version(1).stores(
      {
        articles: '++id, categoryId, title, text, createdOn, updatedOn',
        articleTags: '++id, articleId, tagText',
        categories: '++id, title'
      }
    )
  }

  delete () {
    Dexie.delete('articlesDatabase')
  }
}
