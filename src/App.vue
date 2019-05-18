<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
html, body, #app {
  height: 100%
}

.h-100 {
  height: 100%
}

.h-0 {
  height: 0
}

.scroll {
  overflow-y: auto;
}

.nav-tabs {
  border-bottom-color: #4582EC !important;
}

.nav-tabs .nav-link:hover, .nav-tabs .nav-link:focus {
  border-color: #4582EC #4582EC transparent !important;
}

.nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
  border-color: #4582EC #4582EC white !important;
  cursor: default;
  font-weight: bold;
}

.v-interval > *:nth-child(n+2) {
  margin-left: 0.5rem
}

h1, .h1 {
  font-size: 2.0rem !important;
}
h2, .h2 {
  font-size: 1.8rem !important;
}
h3, .h3 {
  font-size: 1.5rem !important;
}
h4, .h4 {
  font-size: 1.4rem !important;
}
</style>
