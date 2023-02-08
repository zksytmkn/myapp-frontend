<template>
  <v-container>
    <v-row>
      <mypage-menu />
      <v-col
        cols="9"
      >
        <v-card
          flat
          rounded="lg"
        >
          <v-list
            color="transparent"
          >
            <v-list-item>
              <v-list-item-title>
                プロフィール
              </v-list-item-title>
            </v-list-item>

            <v-divider/>

            <v-list-item>
              <v-container>
                <v-row
                  justify="center"
                >
                  <v-col
                    cols="11"
                    class="mt-9"
                  >
                    <v-row>
                      <v-col
                        cols="5"
                      >
                        <v-avatar
                          height=260px
                          width=260px
                        >
                          <v-img
                            :src="currentUser.image_url ? currentUser.image_url : noPersonImg"
                          >
                          </v-img>
                        </v-avatar>
                      </v-col>
                      <v-col
                        cols="7"
                      >
                        <v-list>
                          <v-card-title>
                            {{ currentUser.name }}
                          </v-card-title>
                          <v-card-subtitle>
                            {{ currentUser.prefecture }}
                          </v-card-subtitle>
                        </v-list>
                        <v-list>
                          <v-card-text>
                            {{ currentUser.text }}
                            {{ currentUser.text }}
                            {{ currentUser.text }}
                            {{ currentUser.text }}
                            {{ currentUser.text }}
                            {{ currentUser.text }}
                          </v-card-text>
                        </v-list>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col
                    cols="11"
                  >
                    <v-list>
                      <v-list-item
                        to="/products/search"
                        @click="$store.dispatch('updateProductSearchCondition', { name: '', seller: $auth.user.name, text: '', type: [], prefecture: [] })"
                      >
                        <v-list-item-avatar
                          left
                        >
                          <v-icon>
                            mdi-food-apple
                          </v-icon>
                        </v-list-item-avatar>
                        <v-list-item-title>
                          あなたの出品した農産物を見てみる
                        </v-list-item-title>
                      </v-list-item>

                      <v-list-item
                        to="/posts/search"
                        @click="$store.dispatch('updatePostSearchCondition', { name: '', poster: $auth.user.name, text: '' })"
                      >
                        <v-list-item-avatar
                          left
                        >
                          <v-icon>
                            mdi-file-document
                          </v-icon>
                        </v-list-item-avatar>
                        <v-list-item-title>
                          あなたの投稿した農家の呟きを見てみる
                        </v-list-item-title>
                      </v-list-item>

                      <V-list-item
                        to="/communities/search"
                        @click="$store.dispatch('updateCommunitySearchCondition', { name: '', maker: $auth.user.name, text: '' })"
                      >
                        <v-list-item-avatar
                          left
                        >
                          <v-icon>
                            mdi-charity
                          </v-icon>
                        </v-list-item-avatar>
                        <v-list-item-title>
                          あなたの作成したコミュニティを見てみる
                        </v-list-item-title>
                      </V-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </v-container>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import noPersonImg from '~/assets/images/logged-in/noPerson.png'

export default {
  layout: 'logged-in',
  data () {
    return {
      noPersonImg
    }
  },
  computed: {
    currentUser() {
      const copyCurrentUser = this.$store.state.user.current
      return copyCurrentUser
    }
  }
}
</script>