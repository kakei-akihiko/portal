<template>
  <button @click="buttonClick">
    <i class="far fa-newspaper"></i>
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  id: Number
})

const buttonClick = () => {
  const id = props.id

  router.push({ name: 'ArticleReadPage', params: { id } })
}
</script>
