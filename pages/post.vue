<template>
  <v-container>
    {{ $store.state.post.current }}
    <nuxt-child />
  </v-container>
</template>

<script>
export default {
  layout: 'post',
  validate ({ store, route }) {
    return !!store.state.post.current && route.name !== 'post'
  }
}
</script>
