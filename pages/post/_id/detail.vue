<template>
  <div
    id="posts"
  >
    <logged-in-app-post-eye-catch>
      <template
        v-slot
      >
        Many farmers post about agriculture here !
        Please look around and enjoy it !
      </template>
    </logged-in-app-post-eye-catch>

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
                        @click="editCurrentPost"
                        class="font-weight-bold"
                        color="deep-orange"
                        block
                        dark
                        outlined
                      >
                        編集する
                      </v-btn>
                      <v-btn
                        @click="deleteCurrentPost(currentPost.id)"
                        class="font-weight-bold"
                        color="deep-orange"
                        block
                        dark
                      >
                        削除する
                      </v-btn>
                    </v-card-actions>
                  </v-card-title>
                  <v-divider />
                  <v-container
                    class="mt-8"
                  >
                    <v-img
                      :src="currentPost.image_url ? currentPost.image_url : noImg"
                      max-height="360px"
                      max-width="360px"
                      aspect-ratio="1"
                    >
                    </v-img>
                  </v-container>

                  <v-container>
                    <v-card-text>
                      <h3
                        style="font-weight:normal;"
                      >
                        {{ currentPost.text }}
                      </h3>
                    </v-card-text>
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
  </div>
</template>

<script>
import noImg from '~/assets/images/logged-in/no.png'

export default {
  layout: 'logged-in',
  middleware: ['get-post-list'],
  data () {
    return {
      noImg
    }
  },
  methods: {
    async editCurrentPost() {
    },
    async deleteCurrentPost(id) {
      await this.$axios.$delete(`/api/v1/posts/${id}`)
      .then(response => {
        this.$router.back()
        const msg = '呟きを削除しました'
        const color = 'success'
        return this.$store.dispatch('getToast', { msg, color })
      })
      .catch(error => {
        console.log(error)
        const msg = '呟きの削除に失敗しました'
        return this.$store.dispatch('getToast', { msg })
      })
    }
  },
  computed: {
    currentPost () {
      const copyPost = this.$store.state.post.current
      return copyPost
    }
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