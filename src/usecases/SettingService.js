export default class SettingService {
  constructor (settingRepository) {
    this.settingRepository = settingRepository
  }

  async getSidebarSetting () {
    const { articleId } = await this.settingRepository.get('sidebar') ?? {}
    return { name: 'sidebar', articleId }
  }

  async setSidebarArticleId (id) {
    const sidebar = await this.getSidebarSetting()
    sidebar.articleId = id
    console.log('service sidebar:', sidebar)
    await this.settingRepository.put(sidebar)
  }
}
