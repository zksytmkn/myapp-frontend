<template>
  <nuxt-child />
</template>

<script>
export default {
  layout: 'community',
  middleware: ['get-community-current', 'get-community-message', 'get-participation-community', 'get-invitation-community'],
  validate ({ store, route }) {
    return !!store.state.community.current && route.name !== 'community'
  }
}
</script>
