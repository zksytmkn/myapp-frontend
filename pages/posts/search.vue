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
                    label="つぶやき"
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
                {{ $store.state.post.favorites.filter(favorites => favorites.post_id === item.id).length }}
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
                {{ $store.state.post.unfavorites.filter(unfavorites => unfavorites.post_id === item.id).length }}
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
          text: 'つぶやき',
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
      ],
      searched: {name: '', poster: '', text: ''}
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
  },
  computed: {
    searchedPosts () {
      const searchCondition = this.$store.state.post.searchCondition

      const copySearchedPosts = Array.from(this.$store.state.post.list).
      filter((x) => x.name.includes(searchCondition.name) && x.user.name.includes(searchCondition.poster))

      return copySearchedPosts.sort((a, b) => {
        if (a.created_at > b.created_at) { return -1 }
        if (a.created_at < b.created_at) { return 1 }
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