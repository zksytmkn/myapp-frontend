<template>
  <div
    id="posts"
  >
    <logged-in-app-eye-catch>
      <template
        v-slot
      >
        Many farmers post about agriculture here !
        Please look around and enjoy it !
      </template>
    </logged-in-app-eye-catch>

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
                  </v-card-title>
                  <v-divider />
                  <v-container
                    class="mt-8"
                  >
                    <v-row>
                      <v-col
                        cols="4"
                      >
                        <v-img
                          :src="noImg"
                        >
                        </v-img>
                      </v-col>
                      <v-col
                        cols="4"
                      >
                        <v-img
                          :src="noImg"
                        >
                        </v-img>
                      </v-col>
                      <v-col
                        cols="4"
                      >
                        <v-img
                          :src="noImg"
                        >
                        </v-img>
                      </v-col>
                    </v-row>
                  </v-container>

                  <v-container>
                    <v-chip
                      class="ma-2 font-weight-bold"
                      outlined
                    >
                      <v-icon
                        v-if="currentPost.type === '野菜'"
                        left
                      >
                        mdi-peanut-outline
                      </v-icon>
                      <v-icon
                        v-if="currentPost.type === '果物'"
                        left
                      >
                        mdi-food-apple-outline
                      </v-icon>
                      {{ currentPost.type }}
                    </v-chip>

                    <v-chip
                      class="ma-2 font-weight-bold"
                      outlined
                    >
                      <v-icon
                        left
                      >
                        mdi-map-outline
                      </v-icon>
                      {{ currentPost.region }}
                    </v-chip>

                    <v-chip
                      class="ma-2 font-weight-bold"
                      outlined
                    >
                      <v-icon
                        left
                      >
                        mdi-map-marker-outline
                      </v-icon>
                      {{ currentPost.prefecture }}
                    </v-chip>

                    <v-chip
                      class="ma-2 font-weight-bold"
                      outlined
                    >
                      <v-icon
                        left
                      >
                        mdi-account-outline
                      </v-icon>
                      {{ currentPost.target }}
                    </v-chip>
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