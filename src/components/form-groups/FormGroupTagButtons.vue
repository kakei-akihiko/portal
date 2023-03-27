<script setup>
import { computed } from 'vue'
import store from '../../store/index'
import { allTagsRef } from '../../store/ref';

const tagButtons = computed(() => {
  return allTagsRef.value.map(tag => {
    const { selected, text } = tag
    const className = selected ? 'btn btn-sm btn-info' : 'btn btn-sm btn-outline-info'
    return { selected, text, className }
  })
})

const tagButtonClick = tagButton => {
  const { text, selected } = tagButton
  store.commit('selectTagText', {
    text,
    selected: !selected
  })
}
</script>

<template>
  <fieldset class="form-group">
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
