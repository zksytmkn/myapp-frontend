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
          全てのコミュニティ
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
    </v-container>
    <v-container>
      <v-row
        justify="center"
        align="center"
      >
        <v-col
          cols="12"
        >
          <v-row
            align="center"
          >
            <v-col
              cols="12"
              :sm="card.sm"
              :md="card.md"
            >
              <v-btn
                block
                :height="card.height"
                :elevation="card.elevation"
                to="/communities/new"
              >
                <div
                  class="text-center"
                >
                  <v-icon
                    size="24"
                    class="my-2"
                  >
                    mdi-plus
                  </v-icon>
                  <div
                    class="caption"
                  >
                    コミュニティを作成する
                  </div>
                </div>
              </v-btn>
            </v-col>

            <v-col
              v-for="(community, i) in recentCommunities"
              :key="`card-community-${i}`"
              cols="12"
              :sm="card.sm"
              :md="card.md"
            >
              <v-card
                block
                :height="card.height"
                :elevation="card.elevation"
                :to="$my.communityLinkTo(community.id)"
                class="v-btn text-capitalize align-center"
              >
                <v-container>
                  <v-card-title
                    class="pb-1 d-block text-truncate font-weight-bold"
                  >
                    {{ community.name }}
                  </v-card-title>
                  <v-card-text
                    class="caption grey--text text--darken-1"
                  >
                    {{ community.text.substring(0, 30)+'...'}}
                  </v-card-text>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-pagination
      class="my-10"
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
  data () {
    return {
      page: 1,
      container: {
        sm: 10,
        md: 8
      },
      card: {
        sm: 6,
        md: 4,
        height: 110,
        elevation: 4
      }
    }
  },
  computed: {
    recentCommunities () {
      const copyCommunities = Array.from(this.$store.state.community.list)
      return copyCommunities.sort((a, b) => {
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