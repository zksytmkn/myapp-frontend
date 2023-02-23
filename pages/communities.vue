<template>
  <nuxt-child />
</template>

<script>
export default {
  middleware: ['get-user-community'],
  layout: 'logged-in'
}
</script>
