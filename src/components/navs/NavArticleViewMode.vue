<template>
  <div>
    <button
      type="button"
      :disabled="compactButtonDisabled"
      @click="modeCompactNavClick"
    >
      コンパクト
    </button>
    <button
      type="button"
      :disabled="detailButtonDisabled"
      @click="modeDetailNavClick"
    >
      詳細
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const emit = defineEmits(['change'])

const props = defineProps({
  mode: String
})

const compactButtonDisabled = computed(() => props.mode === 'compact')

const detailButtonDisabled = computed(() => props.mode === 'detail')

const modeCompactNavClick = () => {
  emit('change', 'compact')
}

const modeDetailNavClick = () => {
  emit('change', 'detail')
}
</script>

<style scoped>

</style>
