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
                    v-model="searched.title"
                    class="mt-10"
                    label="タイトル"
                    outlined
                    dense
                  >
                  </v-text-field>
                </v-col>
                <v-col
                  cols="9"
                >
                  <v-text-field
                    v-model="searched.poster"
                    label="投稿者"
                    outlined
                    dense
                  >
                  </v-text-field>
                </v-col>
                <v-col
                  cols="9"
                >
                  <v-text-field
                    v-model="searched.body"
                    label="つぶやき"
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
                      つぶやきを検索する
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <PostTable
      title="検索結果"
      message="該当するつぶやきはありませんでした。"
      :posts="searchedPosts"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      searched: {title: '', poster: '', body: ''},
      searchedPosts: [],
    }
  },
  mounted() {
    this.searched = {...this.$store.state.post.searchCondition};
    this.calculateSearchedPosts();
  },
  methods: {
    updateSearchCondition() {
      this.$store.commit('setPostSearchCondition', { ...this.searched });
      this.calculateSearchedPosts();
    },
    calculateSearchedPosts() {
      const { title, poster, body } = this.searched;
    
      let copySearchedPosts = Array.from(this.$store.state.post.list)
    
      if (title && title.length) {
        const titleArray = Array.isArray(title) ? title : [title];
        copySearchedPosts = copySearchedPosts.filter((post) =>
          titleArray.some((str) => post.title.includes(str))
        );
      }
    
      if (poster && poster.length) {
        const posterArray = Array.isArray(poster) ? poster : [poster];
        copySearchedPosts = copySearchedPosts.filter((post) =>
          posterArray.some((str) => post.user.name.includes(str))
        );
      }
    
      if (body && body.length) {
        const bodyArray = Array.isArray(body) ? body : [body];
        copySearchedPosts = copySearchedPosts.filter((post) =>
          bodyArray.some((str) => post.body.includes(str))
        );
      }
    
      this.searchedPosts = copySearchedPosts.sort((a, b) => {
        if (a.created_at > b.created_at) return -1;
        if (a.created_at < b.created_at) return 1;
        return 0;
      });
    },
  }
}
</script>
