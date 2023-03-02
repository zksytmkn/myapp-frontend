<template>
  <nuxt-child />
</template>

<script>
export default {
  layout: 'posts',
  validate ({ route }) {
    return route.name !== 'posts'
  }
}
</script>
