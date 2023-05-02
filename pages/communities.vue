<template>
  <nuxt-child />
</template>

<script>
export default {
  layout: 'community',
  validate ({ route }) {
    return route.name !== 'communities'
  }
}
</script>
