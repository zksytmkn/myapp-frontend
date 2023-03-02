<template>
  <v-menu
    app
    offset-x
    offset-y
    max-width="200"
  >
    <template
      v-slot:activator="{ on }"
    >
      <v-btn
        v-show="users.length"
        class ="font-weight-bold"
        color="teal"
        outlined
        block
        dark
        v-on="on"
      >
        参加メンバーを見る
      </v-btn>
    </template>
    <v-list
      dense
    >
      <template>
        <v-list-item
          v-for="(user, i) in users"
          :key="`user-${i}`"
          :to="$my.userLinkToProfile(user.id)"
        >
          <v-list-item-title>
            {{ user.name }}
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  computed: {
    users() {
      const copyUsers = this.$store.state.community.current.participation
      return copyUsers
    }
  }
}
</script>
