<template>
  <nuxt-child />
</template>

<script>
export default {
  layout: 'logged-in',
  middleware: ['get-user-list'],
  validate ({ route }) {
    return route.name !== 'mypage'
  }
}
</script>
