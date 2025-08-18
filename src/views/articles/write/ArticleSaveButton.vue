<template>
  <button
    class="btn btn-primary button-save"
    type="button"
    :disabled="props.disabled"
    @click="$emit('click')"
  >
    保存
  </button>
</template>

<script setup>
const props = defineProps({
  disabled: {
    type: Boolean
  }
})
const emit = defineEmits(['click'])
</script>

<style scoped>
.button-save {
  white-space: nowrap
}
</style>
