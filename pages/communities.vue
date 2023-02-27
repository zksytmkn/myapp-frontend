<template>
  <nuxt-child />
</template>

<script>
export default {
  middleware: ['get-participation-community', 'get-invitation-community'],
  layout: 'logged-in',
  validate ({ route }) {
    return route.name !== 'communities'
  }
}
</script>
