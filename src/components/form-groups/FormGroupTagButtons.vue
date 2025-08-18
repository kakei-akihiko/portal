<template>
  <fieldset class="form-group" v-if="tagButtons.length > 0">
    <button
      v-for="tagButton in tagButtons"
      :key="tagButton.text"
      :class="tagButton.className"
      @click="tagButtonClick(tagButton)"
    >
      {{ tagButton.text }}
    </button>
  </fieldset>
</template>

<script setup>
import { computed } from 'vue'
import { allTagsRef } from '../../store/ref'
import { selectTagText } from '../../store/index'

const tagButtons = computed(() => {
  return allTagsRef.value.map(tag => {
    const { selected, text } = tag
    const className = selected ? 'btn btn-sm btn-info' : 'btn btn-sm btn-outline-info'
    return { selected, text, className }
  })
})

const tagButtonClick = tagButton => {
  const { text, selected } = tagButton
  selectTagText({
    text,
    selected: !selected
  })
}
</script>
