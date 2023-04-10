<template>
  <nuxt-child />
</template>

<script>
export default {
  layout: 'community',
  middleware: ['get-community-current', 'get-community-message', 'get-community-invitation', 'get-community-participation'],
  validate ({ store, route }) {
    return !!store.state.community.current && route.name !== 'community'
  }
}
</script>
