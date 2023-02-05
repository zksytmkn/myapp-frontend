<template>
  <div
    id="communities"
  >
    <logged-in-app-community-eye-catch>
      <template
        v-slot
      >
        Different kinds of communities are here !
        Please look around and enjoy it !
      </template>
    </logged-in-app-community-eye-catch>
    <v-container>
      <v-list-item>
        <v-list-item-title
          class="font-weight-bold"
        >
          参加しているコミュニティ
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
      <v-container
        v-show="!participatedCommunities.length"
      >
        <v-row>
          <v-col
            cols="12"
          >
            <p>
              参加しておりません。
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
    <v-pagination
      class="my-6"
      v-model="page"
      v-show="participatedCommunities.length"
      :length="7"
      circle
    >
    </v-pagination>
  </div>
</template>

<script>
export default {
  layout: 'logged-in',
  middleware: ['get-community-list'],
  data () {
    return {
      page: 1,
      pageSize: 9
    }
  },
  computed: {
    participatedCommunities () {
      const copyParticipatedCommunities = Array.from(this.$store.state.community.list.filter((x) => x.participated === true))
      return copyParticipatedCommunities.sort((a, b) => {
        if (a.updated_at > b.updated_at) { return -1 }
        if (a.updated_at < b.updated_at) { return 1 }
        return 0
      }).slice(this.pageSize*(this.page-1),this.pageSize*(this.page))
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