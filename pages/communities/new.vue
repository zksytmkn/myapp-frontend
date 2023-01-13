<template>
  <div
    id="communities"
  >
    <logged-in-app-eye-catch>
      <template
        v-slot
      >
        Different kinds of communities are here !
        Please look around and enjoy it !
      </template>
    </logged-in-app-eye-catch>

    <v-container>
      <v-list-item>
        <v-list-item-title
          class="font-weight-bold"
        >
          作成
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
    </v-container>
    <v-container>
    </v-container>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
#communities {
  .v-parallax__content {
    padding: 0;
  }
}
</style>