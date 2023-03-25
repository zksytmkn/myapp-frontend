<template>
  <nuxt-child/>
</template>

<script>
export default {
  layout: 'product',
  validate ({ route }) {
    return route.name !== 'products'
  }
}
</script>
