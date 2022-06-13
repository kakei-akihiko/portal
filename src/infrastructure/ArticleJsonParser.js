export default class ArticleJsonParser {
  async parse (file) {
    try {
      const json = await this.readFileAsText(file)
      const articles = JSON.parse(json).articles
      return { succeeded: true, articles }
    } catch (ex) {
      const message = 'ファイルの読み込みに失敗しました。'
      console.log(message, ex)
      return { succeeded: false, exception: ex, message }
    }
  }

  async readFileAsText (file) {
    return await new Promise(resolve => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.readAsText(file)
    })
  }
}
