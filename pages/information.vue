<template>
  <nuxt-child />
</template>

<script>
export default {
  layout: 'logged-in',
  middleware: ['get-order-list', 'get-product-list'],
  validate ({ route }) {
    return route.name !== 'information'
  }
}
</script>
