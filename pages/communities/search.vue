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
                  cols="9"
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
                  cols="9"
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
                  cols="9"
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

    <CommunityList
      title="検索結果"
      message="該当するコミュニティはありませんでした。"
      :communities="searchedCommunities"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      searched: { name: '', maker: '', description: '' },
      searchedCommunities: [],
    }
  },
  mounted() {
    this.searched = {...this.$store.state.community.searchCondition};
    this.calculateSearchedCommunities();
  },
  methods: {
    updateSearchCondition() {
      this.$store.commit('setCommunitySearchCondition', { ...this.searched });
      this.calculateSearchedCommunities();
    },
    calculateSearchedCommunities() {
      const { name, maker, description } = this.searched;
    
      let copySearchedCommunities = Array.from(this.$store.state.community.list)
    
      if (name && name.length) {
        copySearchedCommunities = copySearchedCommunities.filter((community) =>
          community.name.includes(name)
        );
      }
    
      if (maker && maker.length) {
        copySearchedCommunities = copySearchedCommunities.filter((community) =>
          community.user.name.includes(maker)
        );
      }
    
      if (description && description.length) {
        copySearchedCommunities = copySearchedCommunities.filter((community) =>
          community.description.includes(description)
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