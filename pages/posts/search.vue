<template>
  <div>
    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
          <v-list-item>
            <v-list-item-title
              class="font-weight-bold"
            >
              検索
            </v-list-item-title>
          </v-list-item>
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
                    v-model="searched.title"
                    class="mt-10"
                    label="タイトル"
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
                    v-model="searched.poster"
                    label="投稿者"
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

    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
          <v-list-item>
            <v-list-item-title
              class="font-weight-bold"
            >
              検索結果（{{ searchedPosts.length }}件）
            </v-list-item-title>
          </v-list-item>
          <v-divider/>
          <v-list-item
            v-show="!searchedPosts.length"
          >
            <v-list-item-title>
              該当するつぶやきはありませんでした。
            </v-list-item-title>
          </v-list-item>
        </v-col>
      </v-row>
    </v-container>
    <v-container
      v-if="searchedPosts.length !== 0"
    >
      <v-row
        justify="center"
      >
        <v-col
          cols="12"
        >
          <v-data-table
            :headers="tableHeaders"
            :items="searchedPosts.slice(pageSize*(page-1),pageSize*(page))"
            item-key="id"
            hide-default-footer
          >
            <template
              #[`item.title`]="{ item }"
            >
              <nuxt-link
                :to="$my.postLinkToDetail(item.id)"
                class="text-decoration-none teal--text"
              >
                {{ item.title.length > 13 ? item.title.substring(0, 13) + '...' : item.title }}
              </nuxt-link>
            </template>
            <template #[`item.body`]="{ item }">
              {{ item.body.length > 37 ? item.body.substring(0, 37) + '...' : item.body }}
            </template>
            <template
              #[`item.like`] = "{ item }"
            >
              <div style="display: flex;">
                <div v-for="actionType in ['favorite', 'unfavorite']" :key="actionType + 'Wrapper'">
                  <v-btn
                    :key="actionType + 'Btn'"
                    :class="buttonClass(actionType, item.id)"
                    class="ml-0"
                    fab
                    dark
                    x-small
                    @click="handleFavorites(item.id, actionType, $store.state.post[actionType].some(x => x.id === item.id) ? 'delete' : 'post')"
                  >
                    <v-icon>
                      {{ actionType === 'favorite' ? 'mdi-thumb-up' : 'mdi-thumb-down' }}
                    </v-icon>
                  </v-btn>
                  <span :key="actionType + 'Count'" class="font-weight-bold ml-1" :class="{ 'mr-3': actionType === 'favorite' }">
                    {{
                      $store.state.post[actionType + 's'].filter(
                        x => x.post_id === item.id
                      ).length
                    }}
                  </span>
                </div>
              </div>
            </template>
            <template
              #[`item.updatedAt`]="{ item }"
            >
              {{ $my.dataFormat(item.updated_at) }}
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
    <v-pagination
      v-show="searchedPosts.length"
      v-model="page"
      class="my-6"
      :length="Math.ceil(searchedPosts.length/pageSize)"
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
      pageSize: 10,
      tableHeaders: [
        {
          text: 'タイトル',
          value: 'title'
        },
        {
          text: 'つぶやき',
          value: 'body'
        },
        {
          text: 'いいね履歴',
          width: 170,
          value: 'like'
        },
        {
          text: '更新日',
          width: 150,
          value: 'updatedAt'
        }
      ],
      searched: {title: '', poster: '', body: ''},
      searchedPosts: [],
    }
  },
  mounted() {
    this.searched.title = this.$store.state.post.searchCondition.title
    this.searched.poster = this.$store.state.post.searchCondition.poster
    this.searched.body = this.$store.state.post.searchCondition.body

    this.calculateSearchedPosts();
  },
  methods: {
    handleFavorites(id, type, method) {
      this.$store.dispatch('handlePostFavorites', { id, type, method });
    },
    buttonClass(actionType, id) {
      if (actionType === 'favorite' && this.$store.state.post.favorite.some(item => item.id === id)) {
        return 'likeColor';
      } else if (actionType === 'unfavorite' && this.$store.state.post.unfavorite.some(item => item.id === id)) {
        return 'dislikeColor';
      } else {
        return 'grey';
      }
    },
    updateSearchCondition() {
      this.$store.dispatch('updatePostSearchCondition', {
        title: this.searched.title,
        poster: this.searched.poster,
        body: this.searched.body,
      });

      this.calculateSearchedPosts();
    },
    calculateSearchedPosts() {
      const { title, poster, body } = this.searched;
    
      let copySearchedPosts = Array.from(this.$store.state.post.list)
    
      if (title && title.length) {
        const titleArray = Array.isArray(title) ? title : [title];
        copySearchedPosts = copySearchedPosts.filter((x) =>
          titleArray.some((str) => x.title.includes(str))
        );
      }
    
      if (poster && poster.length) {
        const posterArray = Array.isArray(poster) ? poster : [poster];
        copySearchedPosts = copySearchedPosts.filter((x) =>
          posterArray.some((str) => x.user.name.includes(str))
        );
      }
    
      if (body && body.length) {
        const bodyArray = Array.isArray(body) ? body : [body];
        copySearchedPosts = copySearchedPosts.filter((x) =>
          bodyArray.some((str) => x.body.includes(str))
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

<style lang="scss">
.likeColor {
  background: #CC0000 !important;
}
.dislikeColor {
  background: #336791 !important;
}
</style>