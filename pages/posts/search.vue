<template>
  <div
    id="posts"
  >
    <logged-in-app-post-eye-catch/>
    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
          <v-list
            color="transparent"
          >
            <v-list-item>
              <v-list-item-title
                class="font-weight-bold"
              >
                検索
              </v-list-item-title>
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
                    label="タイトル"
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
                    label="投稿者"
                    v-model="searched.poster"
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
                    label="呟き"
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
                      @click="$store.dispatch('updatePostSearchCondition', { name: searched.name, poster: searched.poster, text: searched.text })"
                      class="font-weight-bold mt-3 mb-9"
                      color="teal"
                      dark
                    >
                      農家の呟きを検索する
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
                  検索結果（{{ searchedPosts.length }}件）
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider/>
          <v-list
            v-show="!searchedPosts.length"
            color="transparent"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  該当する農家の呟きはありませんでした。
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
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
            :items="searchedPosts.slice(this.pageSize*(this.page-1),this.pageSize*(this.page))"
            item-key="id"
            hide-default-footer
          >
            <template
              v-slot:[`item.title`]="{ item }"
            >
              <nuxt-link
                :to="$my.postLinkToDetail(item.id)"
                class="text-decoration-none"
              >
                {{ item.name.substring(0, 13)+'...' }}
              </nuxt-link>
            </template>
            <template
              v-slot:[`item.text`]="{ item }"
            >
              {{ item.text.substring(0, 37)+'...' }}
            </template>
            <template
              v-slot:[`item.like`] = "{ item }"
            >
              <v-btn
                @click="$store.dispatch('updatePostLikeState', item)"
                :class="{ likeColor: item.like}"
                style="background:grey"
                fab
                dark
                x-small
              >
                <v-icon>
                  mdi-thumb-up
                </v-icon>
              </v-btn>
              <span
                class="font-weight-bold ml-1"
              >
                Good
              </span>
              <v-btn
                @click="$store.dispatch('updatePostDislikeState', item)"
                :class="{ dislikeColor: item.dislike }"
                class="ml-2"
                style="background:grey"
                fab
                dark
                x-small
              >
                <v-icon>
                  mdi-thumb-down
                </v-icon>
              </v-btn>
              <span
                class="font-weight-bold ml-1"
              >
                Bad
              </span>
            </template>
            <template
              v-slot:[`item.updatedAt`]="{ item }"
            >
              {{ $my.dataFormat(item.updated_at) }}
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
    <v-pagination
      class="my-6"
      v-model="page"
      v-show="searchedPosts.length"
      :length="Math.ceil(this.searchedPosts.length/this.pageSize)"
      circle
    >
    </v-pagination>
  </div>
</template>

<script>
export default {
  layout: 'logged-in',
  middleware: ['get-post-list'],
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
          text: '呟き',
          value: 'text'
        },
        {
          text: 'いいね履歴',
          width: 200,
          value: 'like'
        },
        {
          text: '更新日',
          width: 150,
          value: 'updatedAt'
        }
      ],
      searched: {name: '', poster: '', text: ''}
    }
  },
  computed: {
    searchedPosts () {
      const searchCondition = this.$store.state.post.searchCondition

      const copySearchedPosts = Array.from(this.$store.state.post.list).
      filter((x) => x.name.includes(searchCondition.name) && x.user.name.includes(searchCondition.poster))

      return copySearchedPosts.sort((a, b) => {
        if (a.updated_at > b.updated_at) { return -1 }
        if (a.updated_at < b.updated_at) { return 1 }
        return 0
      })
    }
  },
  mounted() {
    this.searched.name = this.$store.state.post.searchCondition.name
    this.searched.poster = this.$store.state.post.searchCondition.poster
    this.searched.text = this.$store.state.post.searchCondition.text
  }
}
</script>

<style lang="scss">
#posts {
  .v-parallax__content {
    padding: 0;
  }
}
.likeColor {
  background: #CC0000 !important;
}
.dislikeColor {
  background: #336791 !important;
}
</style>