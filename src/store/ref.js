import { computed } from 'vue'
import store from './index.js'

export const allTagsRef = computed(() => {
  const tagTexts = store.state.articles
    .map(article => article.tags ?? [])
    .reduce((results, tags) => {
      tags.filter(tag => results.includes(tag) === false)
        .forEach(tag => results.push(tag))
      return results
    }, [])
  return tagTexts.map(tagText => {
    const selected = store.state.selectedTagTexts.includes(tagText)
    return { selected, text: tagText, value: tagText }
  })
})
