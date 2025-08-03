<script setup>
import { computed } from 'vue'

const props = defineProps({
  noSidebar: Boolean,
  mainPanelScroll: Boolean
})

const entireClass = computed(() => {
  return {
    'no-sidebar': props.noSidebar,
    'entire': true
  }
})
</script>

<template>
  <div :class="entireClass">
    <slot name="sidebar"/>
    <slot name="panel-main"/>
  </div>
</template>

<style>
.entire {
  height: 100%;
  display: grid;
  grid-template-columns: 300px 1fr;
}

.no-sidebar .sidebar {
  display: none;
}
</style>
