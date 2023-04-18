import { ref } from 'vue'

export const articlesRef = ref([])

export const categoryIdRef = ref(null)

export const selectedTagTextsRef = ref([])

export const categoriesRef = ref([])

export const setCategoryId = categoryId => {
  categoryIdRef.value = categoryId
  selectedTagTextsRef.value = []
}

export const selectTagText = ({ text, selected }) => {
  const selectedCategories = categoriesRef.value
    .filter(category => category.id === categoryIdRef.value)

  const tagSelectionMode = selectedCategories[0]?.tagSelectionMode ?? 'single'

  const alreadySelected = selectedTagTextsRef.value.includes(text)

  if (tagSelectionMode === 'single') {
    if (alreadySelected) {
      selectedTagTextsRef.value = []
    } else {
      selectedTagTextsRef.value = [text]
    }
    return
  }

  if (alreadySelected) {
    if (selected === false) {
      selectedTagTextsRef.value = selectedTagTextsRef.value
        .filter(_text => _text !== text)
      console.log('1')
    }
  } else if (selected) {
    selectedTagTextsRef.value.push(text)
  }
}
