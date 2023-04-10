<template>
  <div>
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
                      @click="$store.dispatch('updatePostSearchCondition', { title: searched.title, poster: searched.poster, body: searched.body })"
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
                  該当するつぶやきはありませんでした。
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
            :items="searchedPosts.slice(pageSize*(page-1),pageSize*(page))"
            item-key="id"
            hide-default-footer
          >
            <template
              #[`item.title`]="{ item }"
            >
              <nuxt-link
                :to="$my.postLinkToDetail(item.id)"
                class="text-decoration-none"
              >
                <span
                  v-show="item.title.length>13"
                >
                  {{ item.title.substring(0, 13)+'...' }}
                </span>
                <span
                  v-show="item.title.length<=13"
                >
                  {{ item.title }}
                </span>
              </nuxt-link>
            </template>
            <template
              #[`item.text`]="{ item }"
            >
              <span
                v-show="item.body.length>37"
              >
                {{ item.body.substring(0, 37)+'...' }}
              </span>
              <span
                v-show="item.body.length<=37"
              >
                {{ item.body }}
              </span>
            </template>
            <template
              #[`item.like`] = "{ item }"
            >
              <v-btn
                v-show="!$store.state.post.favorite.some(favorite => favorite.id === item.id)"
                :class="{ likeColor: $store.state.post.favorite.some(favorite => favorite.id === item.id) }"
                class="ml-0"
                style="background:grey"
                fab
                dark
                x-small
                @click="addPostFavorite(item.id)"
              >
                <v-icon>
                  mdi-thumb-up
                </v-icon>
              </v-btn>
              <v-btn
                v-show="$store.state.post.favorite.some(favorite => favorite.id === item.id)"
                :class="{ likeColor: $store.state.post.favorite.some(favorite => favorite.id === item.id) }"
                class="ml-0"
                style="background:grey"
                fab
                dark
                x-small
                @click="deletePostFavorite(item.id)"
              >
                <v-icon>
                  mdi-thumb-up
                </v-icon>
              </v-btn>
              <span
                class="font-weight-bold ml-1"
              >
                {{ $store.state.post.favorites.filter(favorites => favorites.post_id === item.id).length }}
              </span>
              <v-btn
                v-show="!$store.state.post.unfavorite.some(unfavorite => unfavorite.id === item.id)"
                :class="{ dislikeColor: $store.state.post.unfavorite.some(unfavorite => unfavorite.id === item.id) }"
                class="ml-2"
                style="background:grey"
                fab
                dark
                x-small
                @click="addPostUnfavorite(item.id)"
              >
                <v-icon>
                  mdi-thumb-down
                </v-icon>
              </v-btn>
              <v-btn
                v-show="$store.state.post.unfavorite.some(unfavorite => unfavorite.id === item.id)"
                :class="{ dislikeColor: $store.state.post.unfavorite.some(unfavorite => unfavorite.id === item.id) }"
                class="ml-2"
                style="background:grey"
                fab
                dark
                x-small
                @click="deletePostUnfavorite(item.id)"
              >
                <v-icon>
                  mdi-thumb-down
                </v-icon>
              </v-btn>
              <span
                class="font-weight-bold ml-1"
              >
                {{ $store.state.post.unfavorites.filter(unfavorites => unfavorites.post_id === item.id).length }}
              </span>
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
      searched: {title: '', poster: '', body: ''}
    }
  },
  computed: {
    searchedPosts () {
      const searchCondition = this.$store.state.post.searchCondition

      const copySearchedPosts = Array.from(this.$store.state.post.list).
      filter((x) => x.title.includes(searchCondition.title) && x.user.name.includes(searchCondition.poster))

      return copySearchedPosts.sort((a, b) => {
        if (a.created_at > b.created_at) { return -1 }
        if (a.created_at < b.created_at) { return 1 }
        return 0
      })
    }
  },
  mounted() {
    this.searched.title = this.$store.state.post.searchCondition.title
    this.searched.poster = this.$store.state.post.searchCondition.poster
    this.searched.body = this.$store.state.post.searchCondition.body
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
          this.$axios.$get('api/v1/post_favorites'),
          this.$axios.$get(`api/v1/post_unfavorites/${this.$auth.user.id}`),
          this.$axios.$get('api/v1/post_unfavorites')
        ])
        .then(response => {
          this.$store.dispatch('getPostFavorite', response[0])
          this.$store.dispatch('getPostFavorites', response[1])
          this.$store.dispatch('getPostUnfavorite', response[2])
          this.$store.dispatch('getPostUnfavorites', response[3])
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
        await Promise.all([
          this.$axios.$get(`api/v1/post_favorites/${this.$auth.user.id}`),
          this.$axios.$get('api/v1/post_favorites')
        ])
        .then(response => {
          this.$store.dispatch('getPostFavorite', response[0])
          this.$store.dispatch('getPostFavorites', response[1])
        })
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
          this.$axios.$get('api/v1/post_favorites'),
          this.$axios.$get(`api/v1/post_unfavorites/${this.$auth.user.id}`),
          this.$axios.$get('api/v1/post_unfavorites'),
        ])
        .then(response => {
          this.$store.dispatch('getPostFavorite', response[0])
          this.$store.dispatch('getPostFavorites', response[1])
          this.$store.dispatch('getPostUnfavorite', response[2])
          this.$store.dispatch('getPostUnfavorites', response[3])
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
        await Promise.all([
          this.$axios.$get(`api/v1/post_unfavorites/${this.$auth.user.id}`),
          this.$axios.$get('api/v1/post_unfavorites'),
        ])
        .then(response => {
          this.$store.dispatch('getPostUnfavorite', response[0])
          this.$store.dispatch('getPostUnfavorites', response[1])
        })
      }
      asyncFunc().finally(response => console.log(response))
    }
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