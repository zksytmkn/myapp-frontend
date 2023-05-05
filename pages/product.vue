<template>
  <nuxt-child />
</template>

<script>
export default {
  layout: 'product',
  middleware: [ 'get-product-current', 'get-product-comment' ],
  validate ({ store, route }) {
    return !!store.state.product.current && route.name !== 'product'
  }
}
</script>
