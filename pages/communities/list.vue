<template>
  <div
    id="communities"
  >
    <logged-in-app-community-eye-catch/>
    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
          <v-list
            color="transparent"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  class="font-weight-bold"
                >
                  全てのコミュニティ（{{ communities.length }}件）
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider/>
          <v-container>
            <v-row
              justify="center"
              align="center"
            >
              <v-col
                cols="12"
              >
                <v-container>
                  <v-row
                    align="center"
                  >
                    <v-col
                      v-for="(community, i) in communities.slice(this.pageSize*(this.page-1),this.pageSize*(this.page))"
                      :key="`card-community-${i}`"
                      cols="12"
                      :sm="card.sm"
                      :md="card.md"
                    >
                      <v-card
                        block
                        :height="card.height"
                        :elevation="card.elevation"
                        :to="$my.communityLinkToDetail(community.id)"
                        class="v-btn text-capitalize align-center"
                      >
                        <v-container>
                          <v-col
                            cols="12"
                          >
                            <v-row>
                              <v-card-title
                                class="pb-1 d-block text-truncate font-weight-bold"
                              >
                                {{ community.name.substring(0, 13)+'...' }}
                              </v-card-title>
                              <v-card-text
                                class="caption grey--text text--darken-1"
                              >
                                {{ community.text.substring(0, 23)+'...'}}
                              </v-card-text>
                            </v-row>
                          </v-col>
                        </v-container>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>

    <v-pagination
      class="my-6"
      v-model="page"
      v-show="communities.length"
      :length="Math.ceil(this.communities.length/this.pageSize)"
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
      pageSize: 9,
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
    communities () {
      const copyCommunities = Array.from(this.$store.state.community.list)
      return copyCommunities.sort((a, b) => {
        if (a.updated_at > b.updated_at) { return -1 }
        if (a.updated_at < b.updated_at) { return 1 }
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