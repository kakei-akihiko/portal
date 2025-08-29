<template>
  <button
    class="expand-button"
    @click="buttonClick"
  >
    <i v-if="props.expanded" class="fas fa-arrow-circle-down"></i>
    <i v-else class="fas fa-arrow-circle-up"></i>
  </button>
</template>

<script setup>
const emit = defineEmits(['click'])

const props = defineProps({
  expanded: Boolean
})

const buttonClick = () => {
  emit('click')
}
</script>

<style scoped>
.expand-button {
  border-width: 0;
}

.expand-button:hover {
  background-color: var(--button-hover-background);
}
</style>
