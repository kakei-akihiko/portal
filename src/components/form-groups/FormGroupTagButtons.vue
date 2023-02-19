<template>
  <b-form-group>
    <button
      v-for="tagButton in tagButtons"
      :key="tagButton.text"
      :class="tagButton.className"
      @click="tagButtonClick(tagButton)"
    >
      {{ tagButton.text }}
    </button>
  </b-form-group>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FormGroupTagButtons',

  computed: {
    tagButtons () {
      return this.allTags.map(tag => {
        const { selected, text } = tag
        const className = selected ? 'btn btn-sm btn-info' : 'btn btn-sm btn-outline-info'
        return { selected, text, className }
      })
    },
    ...mapGetters(['allTags'])
  },

  methods: {
    tagButtonClick (tagButton) {
      const { text, selected } = tagButton
      this.$store.commit('selectTagText', {
        text,
        selected: !selected
      })
    }
  }
}
</script>
