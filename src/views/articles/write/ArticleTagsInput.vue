<template>
  <input
    name="tags"
    class="tags-input"
    placeholder="タグ1 タグ2 ..."
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.tags-input {
  height: 100%;
  padding: .5rem;
}
</style>
