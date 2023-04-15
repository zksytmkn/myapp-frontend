<template>
  <div>
    <v-container>
      <v-list-item>
        <v-list-item-title class="font-weight-bold">
          全てのコミュニティ（{{ communities.length }}件）
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
    </v-container>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12">
          <v-row align="center">
            <v-col
              v-for="(community, i) in communities.slice(pageSize * (page - 1), pageSize * page)"
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
                  <v-row>
                    <v-card-title class="pb-1 d-block text-truncate text-none font-weight-bold">
                      {{ community.name.length > 13 ? community.name.substring(0, 13) + '...' : community.name }}
                    </v-card-title>
                    <v-card-text class="caption text-none grey--text text--darken-1">
                      {{ community.description.length > 23 ? community.description.substring(0, 23) + '...' : community.description }}
                    </v-card-text>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-pagination
      v-show="communities.length"
      v-model="page"
      class="my-6"
      :length="Math.ceil(communities.length / pageSize)"
      circle
    ></v-pagination>
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
      return [...this.$store.state.community.list].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
  }
}
</script>