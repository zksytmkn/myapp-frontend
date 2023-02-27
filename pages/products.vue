<template>
  <nuxt-child />
</template>

<script>
export default {
  layout: 'logged-in',
  validate ({ route }) {
    return route.name !== 'products'
  }
}
</script>
