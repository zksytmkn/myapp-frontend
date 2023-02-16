<template>
  <div
    id="post"
  >
    <logged-in-app-post-eye-catch/>
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
                      by {{ currentPost.poster }}
                    </v-card-subtitle>
                    <v-btn
                      text
                      outlined
                      to="/posts/list"
                      class="font-weight-bold"
                    >
                      一覧
                    </v-btn>
                    <v-card-actions
                      v-if="currentPost.poster===$auth.user.name"
                      class="ml-2"
                    >
                      <v-btn
                        :to="$my.postLinkToEdit(currentPost.id)"
                        class="font-weight-bold"
                        color="teal"
                        block
                        dark
                        outlined
                      >
                        編集する
                      </v-btn>
                      <v-btn
                        @click="deleteCurrentPost(currentPost.id)"
                        class="font-weight-bold"
                        color="teal"
                        block
                        dark
                      >
                        削除する
                      </v-btn>
                    </v-card-actions>
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
                            <v-card-text>
                              <h3
                                style="font-weight:normal;"
                              >
                                {{ currentPost.text }}
                              </h3>
                            </v-card-text>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-container>

                  <v-divider />
                  <v-container>
                    <v-card-actions>
                      <v-btn
                        @click="$store.dispatch('updateCurrentPostLikeState', currentPost)"
                        :class="{ likeColor: currentPost.like}"
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
                        Good
                      </span>
                      <v-btn
                        @click="$store.dispatch('updateCurrentPostDislikeState', currentPost)"
                        :class="{ dislikeColor: currentPost.dislike }"
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
                        Bad
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
                <v-spacer />
                <v-card-subtitle>
                  {{ dateFormat(comment.updated_at) }} 
                </v-card-subtitle>
                <v-card-subtitle>
                  <logged-in-app-comment-detail/>
                </v-card-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-text>
                  {{ comment.postComment_content }}
                </v-list-item-text>
              </v-list-item>
              <v-divider/>
            </v-list>
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
                      >
                      </v-textarea>
                    </v-col>
                    <v-col
                      cols="11"
                    >
                      <v-row
                        justify="center"
                      >
                        <v-btn
                          text
                          outlined
                          class="font-weight-bold mt-3 mb-3"
                        >
                          コメントする
                        </v-btn>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-list-item> 
            </v-list>
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
      comment: false
    }
  },
  methods: {
    async deleteCurrentPost(id) {
      await this.$axios.$delete(`/api/v1/posts/${id}`)
      .then(response => {
        this.$router.back()
        const msg = '農家の呟きを削除しました'
        const color = 'success'
        return this.$store.dispatch('getToast', { msg, color })
      })
      .catch(error => {
        console.log(error)
        const msg = '農家の呟きの削除に失敗しました'
        return this.$store.dispatch('getToast', { msg })
      })
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
        if (a.updated_at > b.updated_at) { return -1 }
        if (a.updated_at < b.updated_at) { return 1 }
        return 0
      })
    },
    dateFormat() {
      return (date) => {
        const dateTimeFormat = new Intl.DateTimeFormat(
          'ja', { dateStyle: 'medium', timeStyle: 'short' }
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