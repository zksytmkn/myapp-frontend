<template>
  <div
    id="posts"
  >
    <logged-in-app-post-eye-catch>
      <template
        v-slot
      >
        Many farmers post about agriculture here !
        Please look around and enjoy it !
      </template>
    </logged-in-app-post-eye-catch>

    <v-container>
      <v-list-item>
        <v-list-item-title
          class="font-weight-bold"
        >
          いいね
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
      <v-container
        v-show="!likePosts.length"
      >
        <v-row>
          <v-col
            cols="12"
          >
            <p>
              いいねしておりません。
            </p>
            <v-btn
              class="font-weight-bold"
              color="orange"
              outlined
              dark
              to="/posts/list"
            >
              呟きを見てみる
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
    <v-container>
      <v-row
        justify="center"
      >
        <v-col
          cols="12"
        >
          <v-data-table
            v-show="likePosts.length"
            :items="likePosts.slice(this.pageSize*(this.page-1),this.pageSize*(this.page))"
            :headers="tableHeaders"
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
                {{ item.name }}
              </nuxt-link>
            </template>
            <template
              v-slot:[`item.text`]="{ item }"
            >
              {{ item.text }}
            </template>
            <template
              v-slot:[`item.like`] = "{ item }"
            >
              <v-card-actions
                class="pl-0"
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
              </v-card-actions>
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
      v-show="likePosts.length"
      :length="Math.ceil(this.likePosts.length/this.pageSize)"
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
      ]
    }
  },
  computed: {
    likePosts () {
      const copyLikePosts = Array.from(this.$store.state.post.list.filter((x) => x.like === true))
      return copyLikePosts.sort((a, b) => {
        if (a.updated_at > b.updated_at) { return -1 }
        if (a.updated_at < b.updated_at) { return 1 }
        return 0
      })
    }
  }
}
</script>

<style lang="scss">
#posts {
  .v-parallax__content {
    padding: 0;
  }
}
</style>