<template>
  <div
    class="mb-12"
  >
    <v-container>
      <v-list-item>
        <v-list-item-title
          class="font-weight-bold"
        >
          詳細
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
    </v-container>
    <v-container>
      <v-card>
        <v-container>
          <v-card-title class="font-weight-bold">
            {{ currentPost.title }}
            <v-card-subtitle>
              <nuxt-link :to="$my.userLinkToProfile(currentPost.user_id)" class="text-decoration-none teal--text text--darken-2">
                by {{ currentPost.user.name }}
              </nuxt-link>
            </v-card-subtitle>
            <v-btn text outlined to="/posts/list" class="font-weight-bold">一覧</v-btn>
            <v-list-item-action v-show="currentPost.user_id === $auth.user.id">
              <v-menu app offset-x offset-y max-width="200">
                <template #activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>mdi-dots-horizontal</v-icon>
                  </v-btn>
                </template>
                <v-list dense>
                  <v-list-item :to="$my.postLinkToEdit(currentPost.id)">
                    <v-list-item-title>編集する</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="deleteCurrentPost">
                    <v-list-item-title>削除する</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-list-item-action>
          </v-card-title>
          <v-divider />
          <v-container class="mt-6 mb-6">
            <v-col cols="12">
              <v-row>
                <v-col cols="12" sm="6"><v-img :src="currentPost.image_url || noImg" aspect-ratio="1"></v-img></v-col>
                <v-col cols="12" sm="6" align-self="center">
                  <v-card-text class="text-subtitle-1 pl-0">
                    {{ currentPost.body.length > 400 ? currentPost.body.substring(0, 400) + '...' : currentPost.body }}
                  </v-card-text>
                </v-col>
              </v-row>
            </v-col>
          </v-container>
          <v-divider />
          <v-container>
            <v-card-actions class="pa-1">
              <div v-for="actionType in ['favorite', 'unfavorite']" :key="actionType + 'Wrapper'">
                <v-btn
                  :key="actionType + 'Btn'"
                  :class="postButtonClass(actionType, currentPost.id)"
                  class="ml-0"
                  fab
                  dark
                  x-small
                  @click="handleFavorites(actionType, $store.state.post[actionType].some(post => post.id === currentPost.id) ? 'delete' : 'post')"
                >
                  <v-icon>
                    {{ actionType === 'favorite' ? 'mdi-thumb-up' : 'mdi-thumb-down' }}
                  </v-icon>
                </v-btn>
                <span :key="actionType + 'Count'" class="font-weight-bold ml-1" :class="{ 'mr-3': actionType === 'favorite' }">
                  {{
                    actionType === 'favorite' ? currentPost.favorites_count : currentPost.unfavorites_count
                  }}
                </span>
              </div>

              <v-btn
                class="ml-2"
                text
                x-small
                @click="cmt = !cmt"
              >
                <v-icon>
                  mdi-comment-outline
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-container>
        </v-container>
      </v-card>
    </v-container>
    <CommentSection
      :cmt="cmt"
      :comments="comments"
      :inputted="inputted"
      @addComment="addPostComment"
      @deleteComment="deletePostComment"
      @resetForm="formReset"
    >
    </CommentSection>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import noImg from '~/assets/images/logged-in/no.png'

export default {
  data () {
    return {
      noImg,
      isValid: false,
      cmt: false,
      cmtRules: [
        v => !!v || ''
      ],
      inputted: { comment: '' }
    }
  },
  computed: {
    currentPost() {
      return this.$store.state.post.current
    },
    comments() {
      return Array.from(this.$store.state.post.comment).sort((a, b) => {
        if (a.created_at > b.created_at) return -1;
        if (a.created_at < b.created_at) return 1;
        return 0;
      });
    },
    ...mapGetters(['postButtonClass']),
  },
  methods: {
    async deleteCurrentPost() {
      if (!confirm('本当につぶやきを削除しますか？')) {
        return;
      }

      try {
        await this.$axios.$delete(`/api/v1/posts/${this.currentPost.id}`);
        this.$store.dispatch('getToast', { msg: 'つぶやきを削除しました', color: 'success' });
        this.$router.go(-1);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        let errorMsg = "つぶやきを削除できませんでした";
        if (error.response && error.response.data && error.response.data.error) {
          errorMsg = error.response.data.error;
        }
        this.$store.dispatch('getToast', { msg: errorMsg, color: "error" });
      }
    },
    async addPostComment({ comment, isValid }) {
      if (!isValid) return;
      const data = {
        post_comment: {
          content: comment,
        }
      };
      this.formReset();
    
      try {
        await this.$axios.$post(`/api/v1/posts/${this.currentPost.id}/post_comments`, data);
        this.$store.dispatch('getToast', { msg: 'コメントしました', color: 'success' });
        this.refreshComments();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        let errorMsg = "コメントできませんでした";
        if (error.response && error.response.data && error.response.data.error) {
          errorMsg = error.response.data.error;
        }
        this.$store.dispatch('getToast', { msg: errorMsg, color: "error" });
      }
    },
    formReset() {
      this.sentIt = false
    },
    async deletePostComment(id) {
      try {
        await this.$axios.$delete(`/api/v1/posts/${this.currentPost.id}/post_comments/${id}`);
        this.$store.dispatch('getToast', { msg: 'コメントを削除しました', color: 'success' });
        this.refreshComments();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        let errorMsg = "コメントを削除できませんでした";
        if (error.response && error.response.data && error.response.data.error) {
          errorMsg = error.response.data.error;
        }
        this.$store.dispatch('getToast', { msg: errorMsg, color: "error" });
      }
    },
    async handleFavorites(type, method) {
      try {
        // ログインユーザーのpost_favoritesとpost_unfavoritesを取得し、Vuexストアに反映
        const favoriteResponses = this.$store.state.post.favorite;
        const unfavoriteResponses = this.$store.state.post.unfavorite;

        // APIリクエストを送信
        if (method === 'delete') {
          await this.$axios[method](`/api/v1/post_${type}s/${this.currentPost.id}/user`);
        } else {
          await this.$axios[method](`/api/v1/post_${type}s`, { [`post_${type}`]: { post_id: this.currentPost.id } });
        }

        // 更新後のログインユーザーのpost_favoritesとpost_unfavoritesを取得し、Vuexストアに反映
        const [updatedFavoriteResponses, updatedUnfavoriteResponses] = await Promise.all([
          this.$axios.$get('api/v1/post_favorites'),
          this.$axios.$get('api/v1/post_unfavorites')
        ]);

        // Vuexストア内のデータを直接更新
        if (method === 'post') {
          if (type === 'favorite') {
            if (unfavoriteResponses.some(unfavorite => unfavorite.id === this.currentPost.id)) {
              this.$store.commit('decrementCurrentPostUnfavoritesCount');
            }
            this.$store.commit('incrementCurrentPostFavoritesCount');
          } else {
            if (favoriteResponses.some(favorite => favorite.id === this.currentPost.id)) {
              this.$store.commit('decrementCurrentPostFavoritesCount');
            }
            this.$store.commit('incrementCurrentPostUnfavoritesCount');
          }
        } else if (method === 'delete') {
          if (type === 'favorite') {
            this.$store.commit('decrementCurrentPostFavoritesCount');
          } else {
            this.$store.commit('decrementCurrentPostUnfavoritesCount');
          }
        }

        this.$store.dispatch('getPostFavorite', updatedFavoriteResponses);
        this.$store.commit('setPostUnfavorite', updatedUnfavoriteResponses);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    async refreshComments() {
      const comments = await this.$axios.$get(`api/v1/posts/${this.currentPost.id}/post_comments`);
      this.$store.commit('setPostComment', comments);
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