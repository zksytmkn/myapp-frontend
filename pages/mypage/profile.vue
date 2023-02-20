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
              <v-list-item-content>
                <v-list-item-title>
                  あなたのプロフィール
                </v-list-item-title>
              </v-list-item-content>
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
                    <v-container>
                      <v-row
                        align="center"
                      >
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
                          <v-list-item-title
                            class="font-weight-bold text-h6"
                          >
                            {{ currentUser.name.substring(0, 16)+'...' }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ currentUser.prefecture }}
                          </v-list-item-subtitle>
                          <br/>
                          <v-list-item-text>
                            {{ currentUser.text.substring(0, 120)+'...' }}
                          </v-list-item-text>
                        </v-col>
                      </v-row>
                    </v-container>
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
                        <v-list-item-content>
                          <v-list-item-title>
                            あなたの出品した農産物を見る
                          </v-list-item-title>
                        </v-list-item-content>
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
                        <v-list-item-content>
                          <v-list-item-title>
                            あなたの投稿した農家の呟きを見る
                          </v-list-item-title>
                        </v-list-item-content>
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
                        <v-list-item-content>
                          <v-list-item-title>
                            あなたの作成したコミュニティを見る
                          </v-list-item-title>
                        </v-list-item-content>
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