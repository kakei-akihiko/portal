<template>
  <b-button
    variant="link"
    :to="{ name: 'CategorySettingPage', params: { categoryId } }"
  >
    <i class="fas fa-cog"></i>
  </b-button>
</template>

<script>
export default {
  name: 'ButtonCategorySettingPage',

  props: {
    categoryId: Number
  }
}
</script>
