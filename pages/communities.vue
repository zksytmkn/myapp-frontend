<template>
  <nuxt-child />
</template>

<script>
export default {
  layout: 'community',
  middleware: ['get-community-invitation', 'get-community-participation'],
  validate ({ route }) {
    return route.name !== 'communities'
  }
}
</script>
