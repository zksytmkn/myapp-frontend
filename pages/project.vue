<template>
  <v-container>
    <nuxt-child />
  </v-container>
</template>

<script>
export default {
  layout: "project",
  validate ({ route }) {
    return route.name !== 'project'
  }
}
</script>
