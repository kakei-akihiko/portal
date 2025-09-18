<template>
  <button
    class="button"
    @click="buttonClick"
  >
    <i class="fas fa-cog"></i>
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  categoryId: Number
})

const buttonClick = () => {
  router.push({
    name: 'CategorySettingPage',
    params: {
      categoryId: props.categoryId
    }
  })
}
</script>

<style scoped>
.button {
  border-width: 0;
  background-color: var(--button-background);
}

.button:hover {
  background-color: var(--button-hover-background);
}
</style>
