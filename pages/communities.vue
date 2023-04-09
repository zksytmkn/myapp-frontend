<template>
  <nuxt-child />
</template>

<script>
export default {
  layout: 'community',
  middleware: ['get-participation-community', 'get-invitation-community'],
  validate ({ route }) {
    return route.name !== 'communities'
  }
}
</script>
