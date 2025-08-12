<script setup>
import { computed } from 'vue'

const props = defineProps({
  noSidebar: Boolean
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
    <div class="panel-main">
      <slot name="panel-main"/>
    </div>
  </div>
</template>

<style>
.entire {
  width: 100%;
  height: 100%;
  .panel-main {
    height: 100%;
  }
}

.entire:has(.sidebar) {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 300px 1fr;
  & .panel-main {
    padding: 0 2rem;
  }
}
</style>
