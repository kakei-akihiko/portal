<template>
  <span class="tag">
    {{ props.title }}
  </span>
</template>

<script setup>
const props = defineProps({
  title: String
})
</script>
