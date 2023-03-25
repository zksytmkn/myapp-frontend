<template>
  <nuxt-child />
</template>

<script>
export default {
  layout: 'post',
  validate ({ route }) {
    return route.name !== 'posts'
  }
}
</script>
