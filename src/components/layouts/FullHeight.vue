<template>
  <div class="d-flex flex-column h-100">
    <slot name="header"></slot>
    <div class="flex-grow-1 h-0">
      <div class="h-100">
        <slot></slot>
      </div>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<style scoped>
.h-0 {
  height: 0;
}
</style>
