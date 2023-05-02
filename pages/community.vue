<template>
  <nuxt-child />
</template>

<script>
export default {
  layout: 'community',
  validate ({ store, route }) {
    return !!store.state.community.current && route.name !== 'community'
  }
}
</script>
