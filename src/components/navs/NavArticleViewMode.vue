<template>
  <b-nav
    pills
    small
  >
    <b-nav-item
      :active="modeCompactActive"
      @click="modeCompactNavClick"
    >
      コンパクト
    </b-nav-item>
    <b-nav-item
      :active="modeDetailActive"
      @click="modeDetailNavClick"
    >
      詳細
    </b-nav-item>
  </b-nav>
</template>

<script>
export default {

  name: 'NavArticleViewMode',

  props: {
    mode: String
  },

  computed: {
    modeCompactActive () {
      return this.mode === 'compact'
    },
    modeDetailActive () {
      return this.mode === 'detail'
    }
  },

  methods: {
    modeCompactNavClick () {
      this.$emit('change', 'compact')
    },
    modeDetailNavClick () {
      this.$emit('change', 'detail')
    }
  }
}
</script>
