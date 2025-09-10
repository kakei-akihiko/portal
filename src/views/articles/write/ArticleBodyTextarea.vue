<template>
  <textarea
    name="text"
    placeholder="本文"
    class="body-input"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  ></textarea>
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
.body-input {
  resize: none;
  font-size: 1rem;
  padding: .5rem;
}
</style>
