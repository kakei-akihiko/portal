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
    const className = selected ? 'tag-selected' : 'tag-no-selected'
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

<style scoped>
.tag-selected,
.tag-no-selected:hover {
  background-color: #60A0FF;
  border-radius: 100px;
  padding: 0 .5rem;
  color: #E0F0FF;
  border: solid 1px #60A0FF;
  user-select: none;
}

.tag-selected:hover,
.tag-no-selected {
  background-color: #E0F0FF;
  border-radius: 100px;
  padding: 0 .5rem;
  color: #60A0FF;
  border: solid 1px #60A0FF;
  user-select: none;
}

.form-group {
  border-width: 0;
  display: flex;
  gap: 5px;
}
</style>
