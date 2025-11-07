<template>
  <button
    class="btn btn-link"
    @click="buttonClick"
  >
    <i class="fas fa-edit"></i>
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

  router.push({ name: 'ArticleEditPage', params: { id } })
}
</script>
