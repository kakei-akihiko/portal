<template>
  <button
    class="btn btn-link"
    @click="buttonClick"
  >
    <i class="fas fa-times"></i>
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  categoryId: Number
})

const buttonClick = () => {
  const categoryId = props.categoryId
  router.push({
    name: 'ArticlesListPage',
    params: { categoryId }
  })
}
</script>
