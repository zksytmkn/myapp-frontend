<template>
  <div>
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
                  招待されているコミュニティ（{{ invitedCommunities.length }}件）
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider/>
          <v-list
            v-show="!invitedCommunities.length"
            color="transparent"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  招待されておりません。
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-action>
                <v-btn
                  class="font-weight-bold"
                  color="orange"
                  outlined
                  dark
                  to="/communities/list"
                >
                  コミュニティを見る
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-container
            v-show="invitedCommunities.length"
          >
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
                      v-for="(community, i) in invitedCommunities.slice(pageSize*(page-1),pageSize*(page))"
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
                                <span
                                  v-show="community.name.length>13"
                                >
                                  {{ community.name.substring(0, 13)+'...' }}
                                </span>
                                <span
                                  v-show="community.name.length<=13"
                                >
                                  {{ community.name }}
                                </span>
                              </v-card-title>
                              <v-card-text
                                class="caption grey--text text--darken-1"
                              >
                                <span
                                  v-show="community.description.length>23"
                                >
                                  {{ community.description.substring(0, 23)+'...'}}
                                </span>
                                <span
                                  v-show="community.description.length<=23"
                                >
                                  {{ community.description }}
                                </span>
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
      v-show="invitedCommunities.length"
      v-model="page"
      class="my-6"
      :length="Math.ceil(invitedCommunities.length/pageSize)"
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
    invitedCommunities () {
      const copyInvitedCommunities = Array.from(this.$store.state.community.invitation)
      return copyInvitedCommunities.sort((a, b) => {
        if (a.created_at > b.created_at) { return -1 }
        if (a.created_at < b.created_at) { return 1 }
        return 0
      }).slice(this.pageSize*(this.page-1),this.pageSize*(this.page))
    }
  }
}
</script>