import { ref } from 'vue'

export const articlesRef = ref([])

export const categoryIdRef = ref(null)

export const selectedTagTextsRef = ref([])

export const setCategoryId = categoryId => {
  categoryIdRef.value = categoryId
  selectedTagTextsRef.value = []
}
