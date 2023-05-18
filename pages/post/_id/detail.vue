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
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-container>
              <v-row>
                <v-col>
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
                  <v-container class="mt-9 mb-9">
                    <v-col cols="12">
                      <v-row>
                        <v-col cols="5"><v-img :src="currentPost.image_url || noImg" max-height="430px" max-width="430px" aspect-ratio="1"></v-img></v-col>
                        <v-col cols="7" align-self="center">
                          <v-card-text class="text-subtitle-1">
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
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-show="cmt">
      <v-row>
        <v-col cols="12">
          <v-card flat rounded="lg">
            <v-list>
              <v-list-item>
                <v-list-item-title class="font-weight-bold">コメント</v-list-item-title>
              </v-list-item>
            </v-list>
            <v-divider />
            <v-list v-for="(comment, i) in comments" :key="`comment-${i}`">
              <v-list-item>
                <v-list-item-avatar left>
                  <v-img :src="noImg"></v-img>
                </v-list-item-avatar>
                {{ comment.user.name }}
                <v-spacer />
                <v-list-item-action v-show="comment.user.id === $auth.user.id">
                  <v-menu app offset-x offset-y max-width="200">
                    <template #activator="{ on }">
                      <v-btn icon v-on="on">
                        <v-icon>mdi-dots-horizontal</v-icon>
                      </v-btn>
                    </template>
                    <v-list dense>
                      <v-list-item @click="deletePostComment(comment.id)">
                        <v-list-item-title>削除する</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-list-item-action>
                <v-card-subtitle>{{ dateFormat(comment.updated_at) }}</v-card-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-text>{{ comment.content }}</v-list-item-text>
              </v-list-item>
              <v-divider/>
            </v-list>
            <v-form ref="new" v-model="isValid">
              <v-list>
                <v-list-item>
                  <v-list-item-avatar left>
                    <v-img :src="$auth.user.image_url ? $auth.user.image_url : noImg"></v-img>
                  </v-list-item-avatar>
                  {{ $auth.user.name }}
                </v-list-item>
                <v-list-item>
                  <v-container>
                    <v-row justify="center">
                      <v-col cols="11">
                        <v-textarea
                          v-model="inputted.comment"
                          dense
                          outlined
                          rows="2"
                          placeholder="コメントを追加する"
                          hide-details="auto"
                          :rules="cmtRules"
                          :disabled="sentIt"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="11">
                        <v-row justify="center" align="center">
                          <v-btn
                            text
                            outlined
                            class="font-weight-bold mt-3 mb-3 mr-2"
                            :disabled="!isValid"
                            @click="addPostComment"
                          >
                            コメントする
                          </v-btn>
                          <v-btn text @click="formReset">
                            キャンセル
                          </v-btn>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-list-item>
              </v-list>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
    dateFormat() {
      return (date) => new Intl.DateTimeFormat('ja', { dateStyle: 'medium' }).format(new Date(date));
    },
    ...mapGetters(['postButtonClass']),
  },
  methods: {
    async deleteCurrentPost() {
      if (!confirm('本当にこのつぶやきを削除しますか？')) {
        return;
      }

      try {
        await this.$axios.$delete(`/api/v1/posts/${this.currentPost.id}`);
        this.$store.dispatch('getToast', { msg: 'つぶやきを削除しました', color: 'success' });
        this.$router.go(-1);
      } catch (error) {
        this.$store.dispatch('getToast', { msg: 'つぶやきを削除できませんでした', color: 'error' });
      }
    },
    async addPostComment() {
      if (!this.isValid) return;
      
      const data = {
        content: this.inputted.comment,
      };
      this.formReset();

      try {
        await this.$axios.$post(`/api/v1/posts/${this.currentPost.id}/post_comments`, data);
        this.$store.dispatch('getToast', { msg: 'コメントしました', color: 'success' });
        this.refreshComments();
      } catch (error) {
        this.$store.dispatch('getToast', { msg: 'コメントできませんでした', color: 'error' });
      }
    },
    formReset() {
      this.sentIt = false
      this.$refs.new.reset()
    },
    async deletePostComment(id) {
      try {
        await this.$axios.$delete(`/api/v1/posts/${this.currentPost.id}/post_comments/${id}`);
        this.$store.dispatch('getToast', { msg: 'コメントを削除しました', color: 'success' });
        this.refreshComments();
      } catch (error) {
        this.$store.dispatch('getToast', { msg: 'コメントを削除できませんでした', color: 'error' });
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
          await this.$axios[method](`/api/v1/post_${type}s`, { post_id: this.currentPost.id });
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