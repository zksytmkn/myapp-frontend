<template>
  <v-container>
    <nuxt-child />
  </v-container>
</template>

<script>
export default {
  layout: "logged-in",
  validate ({ route }) {
    return route.name !== 'account'
  }
}
</script>
