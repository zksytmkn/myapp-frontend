<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-list-item>
            <v-list-item-title
              class="font-weight-bold"
            >
              全てのつぶやき（{{ posts.length }}件）
            </v-list-item-title>
          </v-list-item>
          <v-divider/>
        </v-col>
      </v-row>
    </v-container>

    <v-container
      v-if="posts.length !== 0"
    >
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
      return [...this.$store.state.post.list].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    },
  },
  methods: {
    async handleFavorites(id, type, method) {
      try {
        if (method === 'delete') {
          await this.$axios[method](`/api/v1/post_${type}s/${id}/user/${this.$auth.user.id}`);
        } else {
          const formData = new FormData()
          formData.append('post_id', id)
          formData.append('user_id', this.$auth.user.id)
          await this.$axios[method](`/api/v1/post_${type}s`, formData)
        }
  
        await this.updateFavoritesAndUnfavorites();
      } catch (error) {
      }
    },
    async updateFavoritesAndUnfavorites() {
      const [userFavorites, allFavorites, userUnfavorites, allUnfavorites] = await Promise.all([
        this.$axios.$get(`api/v1/post_favorites/${this.$auth.user.id}`),
        this.$axios.$get('api/v1/post_favorites'),
        this.$axios.$get(`api/v1/post_unfavorites/${this.$auth.user.id}`),
        this.$axios.$get('api/v1/post_unfavorites')
      ]);

      this.$store.dispatch('getPostFavorite', userFavorites);
      this.$store.dispatch('getPostFavorites', allFavorites);
      this.$store.dispatch('getPostUnfavorite', userUnfavorites);
      this.$store.dispatch('getPostUnfavorites', allUnfavorites);
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