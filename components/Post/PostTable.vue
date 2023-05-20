<template>
  <div>
    <v-container>
      <v-list-item>
        <v-list-item-title
          class="font-weight-bold"
        >
          {{ title }}（{{ posts.length }}件）
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
      <v-list-item
        v-show="!posts.length && !otherPosts"
      >
        <v-list-item-title>
          {{ message }}
        </v-list-item-title>
      </v-list-item>
      <v-list v-show="!posts.length && otherPosts" color="transparent">
        <v-list-item>
          <v-list-item-title>
            {{ message }}
          </v-list-item-title>
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
              つぶやきを見る
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-container>
    <v-container v-show="posts.length">
      <v-row justify="center">
        <v-col cols="12">
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
                    :class="postButtonClass(actionType, item.id)"
                    class="ml-0"
                    fab
                    dark
                    x-small
                    @click="handleFavorites(item.id, actionType, $store.state.post[actionType].some(post => post.id === item.id) ? 'delete' : 'post')"
                  >
                    <v-icon>
                      {{ actionType === 'favorite' ? 'mdi-thumb-up' : 'mdi-thumb-down' }}
                    </v-icon>
                  </v-btn>
                  <span :key="actionType + 'Count'" class="font-weight-bold ml-1" :class="{ 'mr-3': actionType === 'favorite' }">
                    {{
                      actionType === 'favorite' ? item.favorites_count : item.unfavorites_count
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
import { mapGetters } from 'vuex'

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    posts: {
      type: Array,
      default: () => [],
    },
    otherPosts: {
      type: Boolean,
      default: false,
    }
  },
  data() {
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
      ]
    };
  },
  computed: {
    ...mapGetters(['postButtonClass']),
  },
  methods: {
    async handleFavorites(id, type, method) {
      try {
        // ログインユーザーのpost_favoritesとpost_unfavoritesを取得し、Vuexストアに反映
        const favoriteResponses = this.$store.state.post.favorite;
        const unfavoriteResponses = this.$store.state.post.unfavorite;

        // APIリクエストを送信
        if (method === 'delete') {
          await this.$axios[method](`/api/v1/post_${type}s/${id}/user`);
        } else {
          await this.$axios[method](`/api/v1/post_${type}s`, { [`post_${type}`]: { post_id: id } });
        }

        // 更新後のログインユーザーのpost_favoritesとpost_unfavoritesを取得し、Vuexストアに反映
        const [updatedFavoriteResponses, updatedUnfavoriteResponses] = await Promise.all([
          this.$axios.$get('api/v1/post_favorites'),
          this.$axios.$get('api/v1/post_unfavorites')
        ]);

        // Vuexストア内のデータを直接更新
        if (method === 'post') {
          if (type === 'favorite') {
            if (unfavoriteResponses.some(unfavorite => unfavorite.id === id)) {
              this.$store.commit('decrementPostUnfavoritesCount', id);
            }
            this.$store.commit('incrementPostFavoritesCount', id);
          } else {
            if (favoriteResponses.some(favorite => favorite.id === id)) {
              this.$store.commit('decrementPostFavoritesCount', id);
            }
            this.$store.commit('incrementPostUnfavoritesCount', id);
          }
        } else if (method === 'delete') {
          if (type === 'favorite') {
            this.$store.commit('decrementPostFavoritesCount', id);
          } else {
            this.$store.commit('decrementPostUnfavoritesCount', id);
          }
        }

        this.$store.dispatch('getPostFavorite', updatedFavoriteResponses);
        this.$store.commit('setPostUnfavorite', updatedUnfavoriteResponses);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
  },
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