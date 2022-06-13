export default class CategoryService {
  constructor (categoryRepository) {
    this.categoryRepository = categoryRepository
  }

  async setSettings (categoryId, { articlesViewMode, tagPosition, tagSelectionMode }) {
    const category = await this.categoryRepository.get(categoryId)

    if (category == null) {
      console.error('Specified categoryId not found. categoryId:', categoryId)
      throw new Error('Specified categoryId not found. categoryId: ' + categoryId)
    }

    const newCategory = {
      ...category,
      categoryId,
      articlesViewMode: articlesViewMode ?? category.articlesViewMode,
      tagPosition: tagPosition ?? category.tagPosition,
      tagSelectionMode: tagSelectionMode ?? category.tagSelectionMode
    }

    try {
      await this.categoryRepository.put(newCategory)
      console.log('保存しました(service):', newCategory)
    } catch (ex) {
      console.error('カテゴリーを保存できませんでした。', ex.stack || ex)
    }
  }
}
