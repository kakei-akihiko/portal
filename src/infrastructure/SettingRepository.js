export default class SettingRepository {
  constructor (articlesDatabase) {
    this.database = articlesDatabase.instance
  }

  async get (name) {
    return await this.database.settings.get(name)
  }

  async put (value) {
    try {
      return await this.database.settings.put(value)
    } catch (ex) {
      console.error(ex.stack ?? ex)
    }
  }
}
