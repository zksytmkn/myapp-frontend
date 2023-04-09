<template>
  <div
    id="posts"
  >
    <v-container>
      <v-row>
        <v-col>
          <v-list
            color="transparent"
          >
            <v-list-item>
              <v-list-item-title
                class="font-weight-bold"
              >
                全てのつぶやき（{{ posts.length }}件）
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
          <v-data-table
            :headers="tableHeaders"
            :items="posts.slice(pageSize*(page-1),pageSize*(page))"
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
      v-show="posts.length"
      v-model="page"
      class="my-6"
      :length="Math.ceil(posts.length/pageSize)"
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
      ]
    }
  },
  computed: {
    posts () {
      const copyPosts = Array.from(this.$store.state.post.list)
      return copyPosts.sort((a, b) => {
        if (a.created_at > b.created_at) { return -1 }
        if (a.created_at < b.created_at) { return 1 }
        return 0
      })
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
  }
}
</script>

<style lang="scss">
#posts {
  .v-parallax__content {
    padding: 0;
  }
.likeColor {
  background: #CC0000 !important;
}
.dislikeColor {
  background: #336791 !important;
}
}
</style>