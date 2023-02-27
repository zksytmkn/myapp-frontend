<template>
  <nuxt-child />
</template>

<script>
export default {
  layout: 'mypage',
  validate ({ route }) {
    return route.name !== 'mypage'
  }
}
</script>
