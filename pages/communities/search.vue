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
                  検索
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider/>
        </v-col>
      </v-row>
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
                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-bold"
                  >
                    検索条件
                  </v-list-item-title>
                </v-list-item-content>
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
                    class="mt-10"
                    label="名前"
                    v-model="searched.name"
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
                    label="作成者"
                    v-model="searched.maker"
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
                    label="紹介文"
                    v-model="searched.text"
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
                      @click="$store.dispatch('updateCommunitySearchCondition', { name: searched.name, maker: searched.maker, text: searched.text })"
                      class="font-weight-bold mt-3 mb-9"
                      color="teal"
                      dark
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
          <v-list
            color="transparent"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  class="font-weight-bold"
                >
                  検索結果（{{ searchedCommunities.length }}件）
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider/>
          <v-list
            v-show="!searchedCommunities.length"
            color="transparent"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  該当するコミュニティはありませんでした。
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
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
                      v-for="(community, i) in searchedCommunities.slice(this.pageSize*(this.page-1),this.pageSize*(this.page))"
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
      v-show="searchedCommunities.length"
      :length="Math.ceil(this.searchedCommunities.length/this.pageSize)"
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
      },
      searched: { name: '', maker: '', text: '' }
    }
  },
  computed: {
    searchedCommunities () {
      const searchCondition = this.$store.state.community.searchCondition

      const copySearchedCommunities = Array.from(this.$store.state.community.list).
      filter((x) => x.name.includes(searchCondition.name) && x.user.name.includes(searchCondition.maker))

      return copySearchedCommunities.sort((a, b) => {
        if (a.updated_at > b.updated_at) { return -1 }
        if (a.updated_at < b.updated_at) { return 1 }
        return 0
      })
    }
  },
  mounted() {
    this.searched.name = this.$store.state.community.searchCondition.name
    this.searched.maker = this.$store.state.community.searchCondition.maker
    this.searched.text = this.$store.state.community.searchCondition.text
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