<template>
  <nuxt-child/>
</template>

<script>
export default {
  layout: 'products',
  validate ({ route }) {
    return route.name !== 'products'
  }
}
</script>
