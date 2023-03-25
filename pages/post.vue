<template>
  <nuxt-child />
</template>

<script>
export default {
  layout: 'post',
  middleware: ['get-post-current', 'get-post-comment'],
  validate ({ store, route }) {
    return !!store.state.post.current && route.name !== 'post'
  }
}
</script>
