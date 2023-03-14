<template>
  <div
    id="post"
    class="mb-10"
  >
    <v-container>
      <v-list
        color="transparent"
      >
        <v-list-item>
          <v-list-item-title
            class="font-weight-bold"
          >
            詳細
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider/>
    </v-container>
    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
          <v-card>
            <v-container>
              <v-row>
                <v-col>
                  <v-card-title
                    class="font-weight-bold"
                  >
                    {{ currentPost.name }}
                    <v-card-subtitle>
                      <nuxt-link
                      :to="$my.userLinkToProfile(currentPost.user_id)"
                      class="text-decoration-none grey--text text--darken-2"
                      >
                        by {{ currentPost.user.name }}
                      </nuxt-link>
                    </v-card-subtitle>
                    <v-btn
                      text
                      outlined
                      to="/posts/list"
                      class="font-weight-bold"
                    >
                      一覧
                    </v-btn>
                    <v-list-item-action
                      v-if="currentPost.user_id === $auth.user.id"
                    >
                      <v-menu
                        app
                        offset-x
                        offset-y
                        max-width="200"
                      >
                        <template
                          v-slot:activator="{ on }"
                        >
                          <v-btn
                            icon
                            v-on="on"
                          >
                            <v-icon>
                              mdi-dots-horizontal
                            </v-icon>
                          </v-btn>
                        </template>
                        <v-list
                          dense
                        >
                          <template>
                            <v-list-item
                              :to="$my.postLinkToEdit(currentPost.id)"
                            >
                              <v-list-item-title>
                                編集する
                              </v-list-item-title>
                            </v-list-item>
                            <v-list-item
                              @click="deleteCurrentPost(currentPost.id)"
                            >
                              <v-list-item-title>
                                削除する
                              </v-list-item-title>
                            </v-list-item>
                          </template>
                        </v-list>
                      </v-menu>
                    </v-list-item-action>
                  </v-card-title>
                  <v-divider />
                  <v-container
                    class="mt-9 mb-9"
                  >
                    <v-col
                      cols="12"
                    >
                      <v-row>
                        <v-col
                          cols="5"
                        >
                          <v-row>
                            <v-img
                              :src="currentPost.image_url ? currentPost.image_url : noImg"
                              max-height="430px"
                              max-width="430px"
                              aspect-ratio="1"
                            >
                            </v-img>
                          </v-row>
                        </v-col>
                        <v-col
                          cols="7"
                        >
                          <v-row>
                            <v-col
                              cols="11"
                            >
                              <v-card-text
                                class="text--h3"
                              >
                                <span
                                  v-show="currentPost.text.length>600"
                                >
                                  {{ currentPost.text.substring(0, 600)+'...' }}
                                </span>
                                <span
                                  v-show="currentPost.text.length<=600"
                                >
                                  {{ currentPost.text }}
                                </span>
                              </v-card-text>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-container>

                  <v-divider />
                  <v-container>
                    <v-card-actions>
                      <v-btn
                        v-show="!$store.state.post.favorite.some(favorite => favorite.id === currentPost.id)"
                        @click="addPostFavorite(currentPost.id)"
                        :class="{ likeColor: this.$store.state.post.favorite.some(favorite => favorite.id === currentPost.id) }"
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
                        v-show="$store.state.post.favorite.some(favorite => favorite.id === currentPost.id)"
                        @click="deletePostFavorite(currentPost.id)"
                        :class="{ likeColor: this.$store.state.post.favorite.some(favorite => favorite.id === currentPost.id) }"
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
                        {{ $store.state.post.favorite.filter(favorite => favorite.id === currentPost.id).length }}
                      </span>
                      <v-btn
                        v-show="!$store.state.post.unfavorite.some(unfavorite => unfavorite.id === currentPost.id)"
                        @click="addPostUnfavorite(currentPost.id)"
                        :class="{ dislikeColor: this.$store.state.post.unfavorite.some(unfavorite => unfavorite.id === currentPost.id) }"
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
                        v-show="$store.state.post.unfavorite.some(unfavorite => unfavorite.id === currentPost.id)"
                        @click="deletePostUnfavorite(currentPost.id)"
                        :class="{ dislikeColor: this.$store.state.post.unfavorite.some(unfavorite => unfavorite.id === currentPost.id) }"
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
                        {{ $store.state.post.unfavorite.filter(unfavorite => unfavorite.id === currentPost.id).length }}
                      </span>
                      <v-btn
                        @click="comment = !comment"
                        class="ml-2"
                        text
                        x-small
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

    <v-container
      v-show="comment"
    >
      <v-row>
        <v-col
          cols="12"
        >
          <v-card
            flat
            rounded="lg"
          >
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-bold"
                  >
                    コメント
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider/>
            <v-list
              v-for="(comment, i) in comments"
              :key="`comment-${i}`"
            >
              <v-list-item>
                <v-list-item-title>
                  <v-list-item-avatar
                    left
                  >
                    <v-img
                      :src="noImg"
                    >
                    </v-img>
                  </v-list-item-avatar>
                  {{ comment.user.name }}
                </v-list-item-title>
                <v-list-item-action
                  v-if="comment.user.id === $auth.user.id"
                >
                  <v-menu
                    app
                    offset-x
                    offset-y
                    max-width="200"
                  >
                    <template
                      v-slot:activator="{ on }"
                    >
                      <v-btn
                        icon
                        v-on="on"
                      >
                        <v-icon>
                          mdi-dots-horizontal
                        </v-icon>
                      </v-btn>
                    </template>
                    <v-list
                      dense
                    >
                      <template>
                        <v-list-item
                          @click="deletePostComment(comment.id, currentPost.id)"
                        >
                          <v-list-item-title>
                            削除する
                          </v-list-item-title>
                        </v-list-item>
                      </template>
                    </v-list>
                  </v-menu>
                </v-list-item-action>
                <v-spacer />
                <v-card-subtitle>
                  {{ dateFormat(comment.updated_at) }} 
                </v-card-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-text>
                  {{ comment.postComment_content }}
                </v-list-item-text>
              </v-list-item>
              <v-divider/>
            </v-list>
            <v-form
              ref="new"
              v-model="isValid"
            >
              <v-list>
                <v-list-item>
                  <v-list-item-title>
                    <v-list-item-avatar
                      left
                    >
                      <v-img
                        :src="$auth.user.image_url ? $auth.user.image_url : noImg"
                      >
                      </v-img>
                    </v-list-item-avatar>
                      {{ $auth.user.name }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-container>
                    <v-row
                      justify="center"
                    >
                      <v-col
                        cols="11"
                      >
                        <v-textarea
                          dense
                          outlined
                          hide-details="auto"
                          rows="2"
                          placeholder="コメントを追加する"
                          v-model="inputted.comment"
                          :rules="commentRules"
                          :disabled="sentIt"
                        >
                        </v-textarea>
                      </v-col>
                      <v-col
                        cols="11"
                      >
                        <v-row
                          justify="center"
                          align="center"
                        >
                          <v-btn
                            text
                            outlined
                            class="font-weight-bold mt-3 mb-3 mr-2"
                            @click="addPostComment(currentPost.id)"
                            :disabled="!isValid"
                          >
                            コメントする
                          </v-btn>

                          <v-btn
                            text
                            @click="formReset"
                          >
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
      isValid: false,
      comment: false,
      commentRules: [
        v => !!v || ''
      ],
      inputted: { comment: '', postId: this.$store.state.post.current.id, userId: this.$auth.user.id }
    }
  },
  methods: {
    async deleteCurrentPost(id) {
      await this.$axios.$delete(`/api/v1/posts/${id}`)
      .then(response => {
        this.$router.back()
        const msg = 'つぶやきを削除しました'
        const color = 'success'
        return this.$store.dispatch('getToast', { msg, color })
      })
      .catch(error => {
        console.log(error)
        const msg = 'つぶやきを削除できませんでした'
        const color = 'error'
        return this.$store.dispatch('getToast', { msg, color })
      })
    },
    addPostComment(id) {
      if (this.isValid) {
        const asyncFunc = async() => {
          const formData = new FormData()
          formData.append('postComment_content', this.inputted.comment)
          formData.append('post_id', this.inputted.postId)
          formData.append('user_id', this.inputted.userId)
          this.formReset()
          await this.$axios.$post('/api/v1/post_comments', formData)
          .then(response => {
            const msg = 'コメントしました'
            const color = 'success'
            return this.$store.dispatch('getToast', { msg, color })
          })
          .catch(error => {
            console.log(error)
            const msg = 'コメントできませんでした'
            const color = 'error'
            return this.$store.dispatch('getToast', { msg, color })
          })
          await this.$axios.$get(`api/v1/post_comments/${id}`)
          .then(comments => this.$store.dispatch('getPostComment', comments))
        }
        asyncFunc().finally(response => console.log(response))
      }
    },
    formReset() {
      this.sentIt = false
      this.$refs.new.reset()
    },
    deletePostComment(commentId, postId) {
      const asyncFunc = async() => {
        await this.$axios.$delete(`/api/v1/post_comments/${commentId}`)
        .then(response => {
          const msg = 'コメントを削除しました'
          const color = 'success'
          return this.$store.dispatch('getToast', { msg, color })
        })
        .catch(error => {
          console.log(error)
          const msg = 'コメントを削除できませんでした'
          const color = 'error'
          return this.$store.dispatch('getToast', { msg, color })
        })
        await this.$axios.$get(`api/v1/post_comments/${postId}`)
        .then(comments => this.$store.dispatch('getPostComment', comments))
      }
      asyncFunc().finally(response => console.log(response))
    },
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
    currentPost() {
      const copyPost = this.$store.state.post.current
      return copyPost
    },
    comments() {
      const copyComments = Array.from(this.$store.state.post.comment)
      return copyComments.sort((a, b) => {
        if (a.updated_at < b.updated_at) { return -1 }
        if (a.updated_at > b.updated_at) { return 1 }
        return 0
      })
    },
    dateFormat() {
      return (date) => {
        const dateTimeFormat = new Intl.DateTimeFormat(
          'ja', { dateStyle: 'medium' }
        )
        return dateTimeFormat.format(new Date(date))
      }
    }
  }
}
</script>

<style lang="scss">
#post {
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