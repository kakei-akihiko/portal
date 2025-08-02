<script setup>
import { computed } from 'vue'

const emit = defineEmits(['change'])

const props = defineProps({
  mode: String
})

const compactNavLinkClass = computed(() => {
  return {
    active: props.mode === 'compact',
    'nav-link': true
  }
})

const detailNavLinkClass = computed(() => {
  return {
    active: props.mode === 'detail',
    'nav-link': true
  }
})

const modeCompactNavClick = () => {
  emit('change', 'compact')
}

const modeDetailNavClick = () => {
  emit('change', 'detail')
}
</script>

<template>
  <ul class="nav nav-pills small">
    <li class="nav-item">
      <a
        :class="compactNavLinkClass"
        href="#"
        target="_self"
        @click="modeCompactNavClick"
      >
        コンパクト
      </a>
    </li>
    <li class="nav-item">
      <a
        :class="detailNavLinkClass"
        href="#"
        target="_self"
        @click="modeDetailNavClick"
      >
        詳細
      </a>
    </li>
  </ul>
</template>
