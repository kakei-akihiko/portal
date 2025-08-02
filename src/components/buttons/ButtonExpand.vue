<script setup>
const emit = defineEmits(['click'])

const props = defineProps({
  expanded: Boolean
})

const buttonClick = () => {
  emit('click')
}
</script>

<template>
  <button
    class="btn btn-link p-0"
    @click="buttonClick"
  >
    <i v-if="props.expanded" class="fas fa-arrow-circle-down"></i>
    <i v-else class="fas fa-arrow-circle-up"></i>
  </button>
</template>
