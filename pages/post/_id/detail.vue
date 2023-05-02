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
                    <v-list-item-action v-if="currentPost.user_id === $auth.user.id">
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
                          <v-list-item @click="deleteCurrentPost(currentPost.id)">
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
                      <div v-for="actionType in ['favorites', 'unfavorites']" :key="actionType + 'Wrapper'">
                        <div>
                          <v-btn
                            v-if="isNotRegistered(actionType)"
                            :key="actionType + 'Btn'"
                            :class="buttonClass(actionType)"
                            class="ml-0"
                            fab
                            dark
                            x-small
                            @click="() => handleFavorites(currentPost.id, actionType, 'post')"
                          >
                            <v-icon>
                              {{ actionType === 'favorites' ? 'mdi-thumb-up' : 'mdi-thumb-down' }}
                            </v-icon>
                          </v-btn>
                          <v-btn
                            v-else
                            :key="actionType + 'BtnElse'"
                            :class="buttonClass(actionType)"
                            class="ml-0"
                            fab
                            dark
                            x-small
                            @click="() => handleFavorites(currentPost.id, actionType, 'delete')"
                          >
                            <v-icon>
                              {{ actionType === 'favorites' ? 'mdi-thumb-up' : 'mdi-thumb-down' }}
                            </v-icon>
                          </v-btn>
                          <span :key="actionType + 'Count'" class="font-weight-bold ml-1 mr-3">
                            {{ $store.state.post[actionType].filter(item => item.post_id === currentPost.id).length }}
                          </span>
                        </div>
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
                <v-list-item-action v-if="comment.user.id === $auth.user.id">
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
            <v-form ref="new" v-model="Valid">
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
                            :disabled="!Valid"
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
import noImg from '~/assets/images/logged-in/no.png'

export default {
  layout: 'logged-in',
  data () {
    return {
      noImg,
      valid: false,
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
      return Array.from(this.$store.state.post.comment).sort((a, b) => a.created_at.localeCompare(b.created_at));
    },
    dateFormat() {
      return (date) => new Intl.DateTimeFormat('ja', { dateStyle: 'medium' }).format(new Date(date));
    },
    isNotRegistered() {
      return (actionType) => {
        return actionType === 'favorites'
          ? !this.$store.state.post.favorite.some(favorite => favorite.id === this.currentPost.id)
          : !this.$store.state.post.unfavorite.some(unfavorite => unfavorite.id === this.currentPost.id);
      };
    },
    buttonClass() {
      return (actionType) => {
        if (actionType === 'favorites' && this.$store.state.post.favorite.some(item => item.id === this.currentPost.id)) {
          return 'likeColor';
        } else if (actionType === 'unfavorites' && this.$store.state.post.unfavorite.some(item => item.id === this.currentPost.id)) {
          return 'dislikeColor';
        } else {
        return 'grey';
        }
      };
    },
  },
  methods: {
    async processResponse(action, successMsg, errorMsg, successCallback) {
      try {
        await action();
        this.$store.dispatch('getToast', { msg: successMsg, color: 'success' });
        if (successCallback) {
          successCallback();
        }
      } catch (e) {
        this.$store.dispatch('getToast', { msg: errorMsg, color: 'error' });
      }
    },
    deleteCurrentPost(id) {
      this.processResponse(
        () => this.$axios.$delete(`/api/v1/posts/${id}`),
        'つぶやきを削除しました',
        'つぶやきを削除できませんでした',
        () => this.$router.go(-1)
      );
    },
    async addPostComment() {
      if (!this.Valid) return
      const formData = new FormData()
      formData.append('content', this.inputted.comment)
      formData.append('post_id', this.currentPost.id)
      formData.append('user_id', this.$auth.user.id)
      this.formReset()

      await this.processResponse(
        () => this.$axios.$post(`/api/v1/posts/${this.currentPost.id}/post_comments`, formData),
        'コメントしました',
        'コメントできませんでした',
        () => this.refreshComments()
      )
    },
    formReset() {
      this.sentIt = false
      this.$refs.new.reset()
    },
    deletePostComment(commentId) {
      this.processResponse(
        () => this.$axios.$delete(`/api/v1/posts/${this.currentPost.id}/post_comments/${commentId}`),
        'コメントを削除しました',
        'コメントを削除できませんでした',
        () => this.refreshComments()
      )
    },
    handleFavorite(id, type, method) {
      this.handleFavorites(id, type, method)
    },
    async handleFavorites(id, type, method) {
      try {
        if (method === 'delete') {
          await this.$axios[method](`/api/v1/post_${type}/${id}/user/${this.$auth.user.id}`);
        } else {
          const formData = new FormData()
          formData.append('post_id', id)
          formData.append('user_id', this.$auth.user.id)
          await this.$axios[method](`/api/v1/post_${type}`, formData)
        }

        const [userFavorites, allFavorites, userUnfavorites, allUnfavorites] = await Promise.all([
          this.$axios.$get(`api/v1/post_favorites/${this.$auth.user.id}`),
          this.$axios.$get('api/v1/post_favorites'),
          this.$axios.$get(`api/v1/post_unfavorites/${this.$auth.user.id}`),
          this.$axios.$get('api/v1/post_unfavorites')
        ])

        this.$store.dispatch('getPostFavorite', userFavorites)
        this.$store.dispatch('getPostFavorites', allFavorites)
        this.$store.dispatch('getPostUnfavorite', userUnfavorites)
        this.$store.dispatch('getPostUnfavorites', allUnfavorites)
      } catch (error) {}
    },
    async refreshComments() {
      const comments = await this.$axios.$get(`api/v1/posts/${this.currentPost.id}/post_comments`);
      this.$store.dispatch('getPostComment', comments);
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