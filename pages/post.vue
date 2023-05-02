<template>
  <nuxt-child />
</template>

<script>
export default {
  layout: 'post',
  validate ({ store, route }) {
    return !!store.state.post.current && route.name !== 'post'
  }
}
</script>
