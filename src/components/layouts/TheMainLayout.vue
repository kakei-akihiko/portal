<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  noSidebar: Boolean,
  mainPanelScroll: Boolean
})

const mainPanelClass = computed(() => {
  return {
    'col-sm-8': !props.noSidebar,
    'col-sm-12': props.noSidebar,
    'col-md-9': !props.noSidebar,
    'col-md-12': props.noSidebar,
    'h-100-sm': true,
    'panel-main': true,
    'overflow-auto': props.mainPanelScroll
  }
})
</script>

<template>
  <div class="container-fluid h-100 container-main">
    <div class="row h-100">
      <div
        v-if="!noSidebar"
        class="col-sm-4 col-md-3 col-12 h-100-sm sidebar pr-0"
      >
        <!-- .pr-3はスクロールバーの位置調整用 -->
        <div class="h-100 pr-3">
          <slot name="sidebar"/>
        </div>
      </div>

      <div
        cols="12"
        :class="mainPanelClass"
      >
        <slot name="panel-main"/>
      </div>
    </div>
  </div>
</template>

<style>
.sidebar {
  background: #E0F0FF;
  overflow-y: auto;
}

.panel-main {
  padding-top: .5rem;
}

@media (min-width: 768px) {
  .h-100-sm {
    height: 100%
  }
}
</style>
