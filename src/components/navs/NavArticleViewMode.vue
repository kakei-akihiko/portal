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

<script>
export default {

  name: 'NavArticleViewMode',

  props: {
    mode: String
  },

  computed: {
    compactNavLinkClass () {
      return {
        active: this.mode === 'compact',
        'nav-link': true
      }
    },
    detailNavLinkClass () {
      return {
        active: this.mode === 'detail',
        'nav-link': true
      }
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
