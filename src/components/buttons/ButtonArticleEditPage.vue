<template>
  <button
    class="btn btn-link"
    @click="buttonClick"
  >
    <i class="fas fa-edit"></i>
  </button>
</template>

<script setup>
const props = defineProps({
  id: Number
})

const buttonClick = () => {
  router.push({ name: 'ArticleEditPage', params: { id } })
}
</script>
