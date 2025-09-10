<template>
  <router-link :to="linkTo">
    <i class="fas fa-plus"></i>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  categoryId: Number
})

const linkTo = computed(() => ({
  name: 'ArticleCreatePage',
  params: {
     categoryId: props.categoryId
  }
}))
</script>
