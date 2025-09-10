<template>
  <input
    class="title-input"
    type="text"
    name="title"
    placeholder="タイトル"
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
.title-input {
  font-size: 1.2rem;
  width: 100%;
  height: 2.5rem;
  padding: .5rem;
}
</style>
