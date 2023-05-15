<template>
  <div>
    <v-container>
      <v-list-item>
        <v-list-item-title
          class="font-weight-bold"
        >
          検索
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
    </v-container>
    
    <v-container>
      <v-row
        justify="center"
      >
        <v-col
          cols="12"
        >
          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-title
                  class="font-weight-bold"
                >
                  検索条件
                </v-list-item-title>
              </v-list-item>
            </v-list>
            <v-divider/>
              
            <v-container>
              <v-row
                justify="center"
              >
                <v-col
                  cols="12"
                  sm="6"
                  md="9"
                >
                  <v-text-field
                    v-model="searched.name"
                    class="mt-10"
                    label="名前"
                    outlined
                    dense
                  >
                  </v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  sm="6"
                  md="9"
                >
                  <v-text-field
                    v-model="searched.maker"
                    label="作成者"
                    outlined
                    dense
                  >
                  </v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  sm="6"
                  md="9"
                >
                  <v-text-field
                    v-model="searched.description"
                    label="紹介文"
                    outlined
                    dense
                  >
                  </v-text-field>
                </v-col>
    
                <v-col
                  cols="12"
                >
                  <v-row
                    justify="center"
                  >
                    <v-btn
                      class="font-weight-bold mt-3 mb-9"
                      color="teal"
                      dark
                      @click="updateSearchCondition"
                    >
                      コミュニティを検索する
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
          <v-list-item>
            <v-list-item-title
              class="font-weight-bold"
            >
              検索結果（{{ searchedCommunities.length }}件）
            </v-list-item-title>
          </v-list-item>
          <v-divider/>
          <v-list-item
            v-show="!searchedCommunities.length"
          >
            <v-list-item-title>
              該当するコミュニティはありませんでした。
            </v-list-item-title>
          </v-list-item>
        </v-col>
      </v-row>
    </v-container>
    <v-container
      v-show="searchedCommunities.length"
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
                v-for="(community, i) in searchedCommunities.slice(pageSize*(page-1),pageSize*(page))"
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
      v-show="searchedCommunities.length"
      v-model="page"
      class="my-6"
      :length="Math.ceil(searchedCommunities.length/pageSize)"
      circle
    >
    </v-pagination>
  </div>
</template>

<script>
export default {
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
      },
      searched: { name: '', maker: '', description: '' },
      searchedCommunities: [],
    }
  },
  mounted() {
    this.searched.name = this.$store.state.community.searchCondition.name
    this.searched.maker = this.$store.state.community.searchCondition.maker
    this.searched.description = this.$store.state.community.searchCondition.description

    this.calculateSearchedCommunities();
  },
  methods: {
    updateSearchCondition() {
      this.$store.dispatch('updateCommunitySearchCondition', { 
        name: this.searched.name, 
        maker: this.searched.maker, 
        description: this.searched.description 
      })

      this.calculateSearchedCommunities();
    },
    calculateSearchedCommunities() {
      const { name, maker, description } = this.searched;
    
      let copySearchedCommunities = Array.from(this.$store.state.community.list)
    
      if (name && name.length) {
        copySearchedCommunities = copySearchedCommunities.filter((x) =>
          x.name.includes(name)
        );
      }
    
      if (maker && maker.length) {
        copySearchedCommunities = copySearchedCommunities.filter((x) =>
          x.user && x.user.name.includes(maker)
        );
      }
    
      if (description && description.length) {
        copySearchedCommunities = copySearchedCommunities.filter((x) =>
          x.description.includes(description)
        );
      }
    
      this.searchedCommunities = copySearchedCommunities.sort((a, b) => {
        if (a.created_at > b.created_at) return -1;
        if (a.created_at < b.created_at) return 1;
        return 0;
      });
    },
  }
}
</script>