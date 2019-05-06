<template>
  <b-button @click="$emit('click')" size="sm" class="m-0" variant="link">
    <span v-if="direction == 'down'">
      <i class="fas fa-caret-down fa-lg" v-if="expanded"></i>
      <i class="fas fa-caret-up fa-lg" v-else></i>
    </span>
    <span v-if="direction == 'left'">
      <i class="fas fa-caret-right fa-lg" v-if="expanded"></i>
      <i class="fas fa-caret-left fa-lg" v-else></i>
    </span>
    <span v-if="direction == 'right'">
      <i class="fas fa-caret-left fa-lg" v-if="expanded"></i>
      <i class="fas fa-caret-right fa-lg" v-else></i>
    </span>
  </b-button>
</template>

<script>
export default {
  props: {
    expanded: {
      type: Boolean,
      required:true
    },
    direction: {
      type: String,
      default: 'down'
    },
  }
}
</script>
