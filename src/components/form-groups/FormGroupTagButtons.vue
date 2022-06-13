<template>
  <b-form-group>
    <b-button
      v-for="tagButton in tagButtons"
      :key="tagButton.text"
      :variant="tagButton.variant"
      size="sm"
      @click="tagButtonClick(tagButton)"
    >
      {{ tagButton.text }}
    </b-button>
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
        const variant = selected ? 'info' : 'outline-info'
        return { selected, text, variant }
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
