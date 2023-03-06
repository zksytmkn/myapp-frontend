<template>
  <div
    id="posts"
  >
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
                  いいね（{{ likePosts.length }}件）
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider/>
          <v-list
            v-show="!likePosts.length"
            color="transparent"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  いいねしておりません。
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
                  to="/posts/list"
                >
                  農家の呟きを見る
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
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
                <span
                  v-show="item.name.length>13"
                >
                  {{ item.name.substring(0, 13)+'...' }}
                </span>
                <span
                  v-show="item.name.length<=13"
                >
                  {{ item.name }}
                </span>
              </nuxt-link>
            </template>
            <template
              v-slot:[`item.text`]="{ item }"
            >
              <span
                v-show="item.text.length>37"
              >
                {{ item.text.substring(0, 37)+'...' }}
              </span>
              <span
                v-show="item.text.length<=37"
              >
                {{ item.text }}
              </span>
            </template>
            <template
              v-slot:[`item.like`] = "{ item }"
            >
              <v-card-actions
                class="pl-0"
              >
                <v-btn
                  v-show="!$store.state.post.favorite.some(favorite => favorite.id === item.id)"
                  @click="addPostFavorite(item.id)"
                  :class="{ likeColor: $store.state.post.favorite.some(favorite => favorite.id === item.id) }"
                  class="ml-0"
                  style="background:grey"
                  fab
                  dark
                  x-small
                >
                  <v-icon>
                    mdi-thumb-up
                  </v-icon>
                </v-btn>
                <v-btn
                  v-show="$store.state.post.favorite.some(favorite => favorite.id === item.id)"
                  @click="deletePostFavorite(item.id)"
                  :class="{ likeColor: $store.state.post.favorite.some(favorite => favorite.id === item.id) }"
                  class="ml-0"
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
                  {{ $store.state.post.favorite.filter(favorite => favorite.id === item.id).length }}
                </span>
                <v-btn
                  v-show="!$store.state.post.unfavorite.some(unfavorite => unfavorite.id === item.id)"
                  @click="addPostUnfavorite(item.id)"
                  :class="{ dislikeColor: $store.state.post.unfavorite.some(unfavorite => unfavorite.id === item.id) }"
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
                <v-btn
                  v-show="$store.state.post.unfavorite.some(unfavorite => unfavorite.id === item.id)"
                  @click="deletePostUnfavorite(item.id)"
                  :class="{ dislikeColor: $store.state.post.unfavorite.some(unfavorite => unfavorite.id === item.id) }"
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
                  {{ $store.state.post.unfavorite.filter(unfavorite => unfavorite.id === item.id).length }}
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
          width: 170,
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
  methods: {
    addPostFavorite(id) {
      const asyncFunc = async() => {
        const formData = new FormData()
        formData.append('post_id', id)
        formData.append('user_id', this.$auth.user.id)
        await this.$axios.$post('/api/v1/post_favorites', formData)
        .then(response => console.log(response))
        .catch(error => console.log(error))
        await Promise.all([
          this.$axios.$get(`api/v1/post_favorites/${this.$auth.user.id}`),
          this.$axios.$get(`api/v1/post_unfavorites/${this.$auth.user.id}`)
        ])
        .then(response => {
          this.$store.dispatch('getPostFavorite', response[0])
          this.$store.dispatch('getPostUnfavorite', response[1])
        })
      }
      asyncFunc().finally(response => console.log(response))
    },
    deletePostFavorite(id) {
      const asyncFunc = async() => {
        const formData = new FormData()
        formData.append('post_id', id)
        formData.append('user_id', this.$auth.user.id)
        await this.$axios.$delete('/api/v1/post_favorites', {data: formData})
        .then(response => console.log(response))
        .catch(error => console.log(error))
        await this.$axios.$get(`api/v1/post_favorites/${this.$auth.user.id}`)
        .then(favorite => this.$store.dispatch('getPostFavorite', favorite))
      }
      asyncFunc().finally(response => console.log(response))
    },
    addPostUnfavorite(id) {
      const asyncFunc = async() => {
        const formData = new FormData()
        formData.append('post_id', id)
        formData.append('user_id', this.$auth.user.id)
        await this.$axios.$post('/api/v1/post_unfavorites', formData)
        .then(response => console.log(response))
        .catch(error => console.log(error))
        await Promise.all([
          this.$axios.$get(`api/v1/post_favorites/${this.$auth.user.id}`),
          this.$axios.$get(`api/v1/post_unfavorites/${this.$auth.user.id}`)
        ])
        .then(response => {
          this.$store.dispatch('getPostFavorite', response[0])
          this.$store.dispatch('getPostUnfavorite', response[1])
        })
      }
      asyncFunc().finally(response => console.log(response))
    },
    deletePostUnfavorite(id) {
      const asyncFunc = async() => {
        const formData = new FormData()
        formData.append('post_id', id)
        formData.append('user_id', this.$auth.user.id)
        await this.$axios.$delete('/api/v1/post_unfavorites', {data: formData})
        .then(response => console.log(response))
        .catch(error => console.log(error))
        await this.$axios.$get(`api/v1/post_unfavorites/${this.$auth.user.id}`)
        .then(unfavorite => this.$store.dispatch('getPostUnfavorite', unfavorite))
      }
      asyncFunc().finally(response => console.log(response))
    }
  },
  computed: {
    likePosts () {
      const copyLikePosts = Array.from(this.$store.state.post.favorite)
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