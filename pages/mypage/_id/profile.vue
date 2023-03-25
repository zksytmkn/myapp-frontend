<template>
  <v-container
    class="mt-3 mb-3"
  >
    <v-row>
      <v-col
        cols="3"
      >
        <v-sheet
          rounded="lg"
        >
          <v-list
            color="transparent"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  マイページ
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider/>
            <v-list-item
              :to="$my.userLinkToProfile(CurrentUser.id)"
            >
              <v-list-item-avatar
                left
              >
                <v-icon>
                  mdi-account
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-title>
                プロフィール
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              :to="$my.userLinkToFollowing(CurrentUser.id)"
            >
              <v-list-item-avatar
                left
              >
                <v-icon>
                  mdi-account-arrow-right
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-title>
                フォロー
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              :to="$my.userLinkToFollowed(CurrentUser.id)"
            >
              <v-list-item-avatar
                left
              >
                <v-icon>
                  mdi-account-arrow-left
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-title>
                フォロワー
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              v-show="CurrentUser.id===this.$auth.user.id"
              to="/mypage/address_payment"
            >
              <v-list-item-avatar
                left
              >
                <v-icon>
                  mdi-credit-card-marker-outline
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-title>
                住所＆お支払い
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>
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
                <v-list-item-title
                  v-show="CurrentUser.id===this.$auth.user.id"
                >
                  あなたのプロフィール
                </v-list-item-title>
                <v-list-item-title
                  v-show="CurrentUser.id!==this.$auth.user.id"
                >
                  {{ CurrentUser.name }}さんのプロフィール
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
                              :src="CurrentUser.image_url ? CurrentUser.image_url : noPersonImg"
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
                            <span
                              v-show="CurrentUser.name.length>16"
                            >
                              {{ CurrentUser.name.substring(0, 16)+'...' }}
                            </span>
                            <span
                              v-show="CurrentUser.name.length<=16"
                            >
                              {{ CurrentUser.name }}
                            </span>
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ CurrentUser.prefecture }}
                          </v-list-item-subtitle>
                          <br/>
                          <v-list-item-text>
                            <span
                              v-show="CurrentUser.text.length>120"
                            >
                              {{ CurrentUser.text.substring(0, 120)+'...' }}
                            </span>
                            <span
                              v-show="CurrentUser.text.length<=120"
                            >
                              {{ CurrentUser.text }}
                            </span>
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
                        @click="$store.dispatch('updateProductSearchCondition', { name: '', seller: $store.state.user.current.name, text: '', type: [], prefecture: [] })"
                      >
                        <v-list-item-avatar
                          left
                        >
                          <v-icon>
                            mdi-food-apple
                          </v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title
                            v-show="CurrentUser.id===this.$auth.user.id"
                          >
                            あなたの出品した農産物を見る
                          </v-list-item-title>
                          <v-list-item-title
                            v-show="CurrentUser.id!==this.$auth.user.id"
                          >
                            {{ CurrentUser.name }}さんの出品した農産物を見る
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item
                        to="/posts/search"
                        @click="$store.dispatch('updatePostSearchCondition', { name: '', poster: $store.state.user.current.name, text: '' })"
                      >
                        <v-list-item-avatar
                          left
                        >
                          <v-icon>
                            mdi-file-document
                          </v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title
                            v-show="CurrentUser.id===this.$auth.user.id"
                          >
                            あなたのを投稿したつぶやきを見る
                          </v-list-item-title>
                          <v-list-item-title
                            v-show="CurrentUser.id!==this.$auth.user.id"
                          >
                            {{ CurrentUser.name }}さんの投稿したつぶやきを見る
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>

                      <V-list-item
                        to="/communities/search"
                        @click="$store.dispatch('updateCommunitySearchCondition', { name: '', maker: $store.state.user.current.name, text: '' })"
                      >
                        <v-list-item-avatar
                          left
                        >
                          <v-icon>
                            mdi-charity
                          </v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title
                            v-show="CurrentUser.id===this.$auth.user.id"
                          >
                            あなたの作成したコミュニティを見る
                          </v-list-item-title>
                          <v-list-item-title
                            v-show="CurrentUser.id!==this.$auth.user.id"
                          >
                            {{ CurrentUser.name }}さんの作成したコミュニティを見る
                          </v-list-item-title>
                        </v-list-item-content>
                      </V-list-item>
                    </v-list>
                  </v-col>
                  <v-col
                    cols="11"
                    v-show="CurrentUser.id!==this.$auth.user.id"
                  >
                    <v-row
                      justify="center"
                    >
                      <v-btn
                        color="teal"
                        class="white--text mt-6 mb-9 mr-2 font-weight-bold"
                        @click="addRelationship(CurrentUser.id)"
                        v-show="!this.$store.state.user.relationship.followed.some(user => user.id === this.$auth.user.id)"
                      >
                        {{ CurrentUser.name }}さんをフォローする
                      </v-btn>
                      <v-btn
                        color="teal"
                        class="white--text mt-6 mb-9 mr-2 font-weight-bold"
                        @click="deleteRelationship(CurrentUser.id)"
                        v-show="this.$store.state.user.relationship.followed.some(user => user.id === this.$auth.user.id)"
                      >
                      {{ CurrentUser.name }}さんをフォロー解除する
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
</template>

<script>
import noPersonImg from '~/assets/images/logged-in/noPerson.png'

export default {
  layout: 'mypage',
  middleware: ['get-user-current', 'get-user-relationship'],
  data () {
    return {
      noPersonImg
    }
  },
  computed: {
    CurrentUser() {
      const copyCurrentUser = this.$store.state.user.current
      return copyCurrentUser
    }
  },
  methods: {
    addRelationship(id) {
      const asyncFunc = async() => {
        const formData = new FormData()
        formData.append('following_id', this.$auth.user.id)
        formData.append('followed_id', id)
        await this.$axios.$post(`/api/v1/relationships`, formData)
        .then(response => {
          const msg = 'フォローしました'
          const color = 'success'
          return this.$store.dispatch('getToast', { msg, color })
        })
        .catch(error => {
          console.log(error)
          const msg = 'フォローできませんでした'
          const color = 'error'
          return this.$store.dispatch('getToast', { msg, color })
        })
        await this.$axios.$get(`/api/v1/relationships/${id}`)
        .then(relationship => this.$store.dispatch('getUserRelationship', relationship))
      }
      asyncFunc().finally(response => console.log(response))
    },
    deleteRelationship(id) {
      const asyncFunc = async() => {
        const formData = new FormData()
        formData.append('following_id', this.$auth.user.id)
        formData.append('followed_id', id)
        await this.$axios.$delete('/api/v1/relationships', {date:formData})
        .then(response => {
          const msg = 'フォローを解除しました'
          const color = 'success'
          return this.$store.dispatch('getToast', { msg, color })
        })
        .catch(error => {
          console.log(error)
          const msg = 'フォローを解除できませんでした'
          const color = 'error'
          return this.$store.dispatch('getToast', { msg, color })
        })
        await this.$axios.$get(`/api/v1/relationships/${id}`)
        .then(relationship => this.$store.dispatch('getUserRelationship', relationship))
      }
      asyncFunc().finally(response => console.log(response))
    }
  }
}
</script>