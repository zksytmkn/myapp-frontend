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
          招待されているコミュニティ
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
      <v-container
        v-show="!invitedCommunities.length"
      >
        <v-row>
          <v-col
            cols="12"
          >
            <p>
              招待されておりません。
            </p>
            <v-btn
              class="font-weight-bold"
              color="orange"
              outlined
              dark
              to="/communities/list"
            >
              コミュニティを見てみる
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
    <v-container>
    </v-container>
    <v-pagination
      class="my-6"
      v-model="page"
      :length="6"
      circle
    >
    </v-pagination>
  </div>
</template>

<script>
export default {
  layout: 'logged-in',
  middleware: ['get-community-list'],
  computed: {
    invitedCommunities () {
      const copyInvitedCommunities = Array.from(this.$store.state.community.list.filter((x) => x.invited === true))
      return copyInvitedCommunities.sort((a, b) => {
        if (a.updatedAt > b.updatedAt) { return -1 }
        if (a.updatedAt < b.updatedAt) { return 1 }
        return 0
      })
    }
  }
}
</script>

<style lang="scss">
#communities {
  .v-parallax__content {
    padding: 0;
  }
}
</style>