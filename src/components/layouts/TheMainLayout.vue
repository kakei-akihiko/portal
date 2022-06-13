<template>
  <b-container
    fluid
    class="h-100 container-main"
  >
    <b-row
      class="h-100"
    >
      <b-col
        v-if="!noSidebar"
        cols="12"
        sm="4"
        md="3"
        class="h-100-sm sidebar pr-0"
      >
        <!-- .pr-3はスクロールバーの位置調整用 -->
        <div class="h-100 pr-3">
          <slot name="sidebar"/>
        </div>
      </b-col>

      <b-col
        cols="12"
        :sm="mainPanelSmCols"
        :md="mainPanelMdCols"
        :class="mainPanelClass"
      >
        <slot name="panel-main"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: {
    noSidebar: Boolean,
    mainPanelScroll: Boolean
  },

  computed: {
    mainPanelClass () {
      return {
        'h-100-sm': true,
        'panel-main': true,
        'overflow-auto': this.mainPanelScroll
      }
    },
    mainPanelSmCols () {
      return this.noSidebar ? 12 : 8
    },
    mainPanelMdCols () {
      return this.noSidebar ? 12 : 9
    }
  }
}
</script>

<style>
.sidebar {
  background: #E0F0FF;
  overflow-y: auto;
}

.panel-main {
  padding-top: .5rem;
}

@media (min-width: 768px) {
  .h-100-sm {
    height: 100%
  }
}
</style>
