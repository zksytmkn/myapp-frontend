<template>
  <div
    id="communities"
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
  layout: 'logged-in',
  middleware: ['get-community-list']
}
</script>

<style lang="scss">
#communities {
  .v-parallax__content {
    padding: 0;
  }
}
</style>