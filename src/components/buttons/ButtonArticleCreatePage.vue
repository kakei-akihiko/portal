<script setup>
import { defineProps } from 'vue'
import router from '../../router/index'

const props = defineProps({
  categoryId: Number
})

const buttonClick = () => {
  const { categoryId } = props
  router.push({
    name: 'ArticleCreatePage',
    params: { categoryId }
  })
}
</script>

<template>
  <button
    class="btn btn-link"
    @click="buttonClick"
  >
    <i class="fas fa-plus"></i>
  </button>
</template>
