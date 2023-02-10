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
                  {{ SelectedUser.name }}さんのプロフィール
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
                              :src="SelectedUser.image_url ? SelectedUser.image_url : noPersonImg"
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
                            {{ SelectedUser.name }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ SelectedUser.prefecture }}
                          </v-list-item-subtitle>
                          <br/>
                          <v-list-item-text>
                            {{ SelectedUser.text }}
                            {{ SelectedUser.text }}
                            {{ SelectedUser.text }}
                            {{ SelectedUser.text }}
                            {{ SelectedUser.text }}
                            {{ SelectedUser.text }}
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
                        @click="$store.dispatch('updateProductSearchCondition', { name: '', seller: $store.state.user.selected.name, text: '', type: [], prefecture: [] })"
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
                            {{ SelectedUser.name }}さんの出品した農産物を見る
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item
                        to="/posts/search"
                        @click="$store.dispatch('updatePostSearchCondition', { name: '', poster: $store.state.user.selected.name, text: '' })"
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
                            {{ SelectedUser.name }}さんの投稿した農家の呟きを見る
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>

                      <V-list-item
                        to="/communities/search"
                        @click="$store.dispatch('updateCommunitySearchCondition', { name: '', maker: $store.state.user.selected.name, text: '' })"
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
                            {{ SelectedUser.name }}さんの作成したコミュニティを見る
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
  middleware: ['get-user-selected'],
  data () {
    return {
      noPersonImg
    }
  },
  computed: {
    SelectedUser() {
      const copySelectedUser = this.$store.state.user.selected
      return copySelectedUser
    }
  }
}
</script>