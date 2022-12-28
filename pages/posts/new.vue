<template>
  <div
    id="posts"
  >
    <logged-in-app-eye-catch>
      <template
        v-slot
      >
        Many farmers post about agriculture here !
        Please look around and enjoy it !
      </template>
    </logged-in-app-eye-catch>
    <v-container>
    </v-container>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
#posts {
  .v-parallax__content {
    padding: 0;
  }
}
</style>