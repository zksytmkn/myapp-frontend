<template>
  <div>
    <v-container>
      <v-list-item>
        <v-list-item-title
          class="font-weight-bold"
        >
          参加しているコミュニティ（{{ participatedCommunities.length }}件）
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
    </v-container>

    <v-container>
      <v-list-item
        v-show="!participatedCommunities.length"
      >
        <v-list-item-title>
          参加しておりません。
        </v-list-item-title>
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
    </v-container>
    <v-container
      v-show="participatedCommunities.length"
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
                v-for="(community, i) in participatedCommunities.slice(pageSize*(page-1),pageSize*(page))"
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
                        <v-card-title class="pb-1 d-block text-truncate text-none font-weight-bold">
                          {{ community.name.length > 13 ? community.name.substring(0, 13) + '...' : community.name }}
                        </v-card-title>
                        <v-card-text class="caption text-none grey--text text--darken-1">
                          {{ community.description.length > 23 ? community.description.substring(0, 23) + '...' : community.description }}
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

    <v-pagination
      v-show="participatedCommunities.length"
      v-model="page"
      class="my-6"
      :length="Math.ceil(participatedCommunities.length/pageSize)"
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
    participatedCommunities() {
      const copyParticipatedCommunities = [...this.$store.state.community.participation];
      return copyParticipatedCommunities
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(this.pageSize * (this.page - 1), this.pageSize * this.page);
    },
  }
}
</script>