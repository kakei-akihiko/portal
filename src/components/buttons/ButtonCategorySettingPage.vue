<template>
  <button
    class="btn btn-link"
    @click="buttonClick"
  >
    <i class="fas fa-cog"></i>
  </button>
</template>

<script>
export default {
  name: 'ButtonCategorySettingPage',

  props: {
    categoryId: Number
  },

  methods: {
    buttonClick () {
      const { categoryId } = this
      this.$router.push({
        name: 'CategorySettingPage',
        params: { categoryId }
      })
    }
  }
}
</script>
