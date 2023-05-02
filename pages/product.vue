<template>
  <nuxt-child />
</template>

<script>
export default {
  layout: 'product',
  validate ({ store, route }) {
    return !!store.state.product.current && route.name !== 'product'
  }
}
</script>
