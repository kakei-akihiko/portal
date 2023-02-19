<template>
  <button
    class="btn btn-link p-0"
    @click="buttonClick"
  >
    <i v-if="expanded" class="fas fa-arrow-circle-down"></i>
    <i v-else class="fas fa-arrow-circle-up"></i>
  </button>
</template>

<script>
export default {
  name: 'ButtonExpand',
  props: {
    expanded: Boolean
  },
  methods: {
    buttonClick () {
      this.$emit('click')
    }
  }
}
</script>
