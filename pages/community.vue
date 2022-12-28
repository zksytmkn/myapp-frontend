<template>
  <v-container>
    {{ $store.state.community.current }}
    <nuxt-child />
  </v-container>
</template>

<script>
export default {
  layout: 'community',
  validate ({ store, route }) {
    return !!store.state.community.current && route.name !== 'community'
  }
}
</script>
