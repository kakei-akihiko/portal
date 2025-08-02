export default class CategoryRepository {
  constructor (articlesDatabase) {
    this.database = articlesDatabase.instance
  }

  async get (categoryId) {
    return await this.database.categories.get(categoryId)
  }

  async getAll () {
    return this.database.categories.toArray()
  }

  async put ({ categoryId, title, icon, articlesViewMode, tagPosition, tagSelectionMode }) {
    try {
      const _categoryId = await this.database.categories.put({
        id: categoryId,
        title,
        icon,
        articlesViewMode,
        tagPosition,
        tagSelectionMode
      })

      console.log('Inserted. categoryId:', _categoryId)

      return _categoryId
    } catch (ex) {
      console.error(ex.stack || ex)
    }
  }
}
