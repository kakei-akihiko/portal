<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
.h-interval > * {
  margin-right: 0.5rem
}

.h-interval > *:last-child {
  margin-right: 0rem
}

.v-interval > * {
  margin-top: 0.5rem
}

.v-interval > *:first-child {
  margin-top: 0rem
}

html, body, #app {
  height: 100%;
}

.h-100 {
  height: 100%;
}

.nav-category .active {
  font-weight: bold
}

.article-body-view {
  line-height: 1.8rem;
}
</style>
