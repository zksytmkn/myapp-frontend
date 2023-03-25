<template>
  <v-container
    class="mt-3"
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
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  v-show="CurrentUser.id===this.$auth.user.id"
                >
                  あなたのフォロー
                </v-list-item-title>
                <v-list-item-title
                  v-show="CurrentUser.id!==this.$auth.user.id"
                >
                  {{ CurrentUser.name }}さんのフォロー
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider/>

            <v-list-item
              v-show="!followingUsers.length"
            >
              <v-list-item-content>
                <v-list-item-title>
                  フォローしておりません。
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              v-for="(following, i) in followingUsers"
              :key="`following-${i}`"
              :to="$my.userLinkToProfile(following.id)"
            >
              <v-list-item-avatar
                left
              >
                <v-img
                  :src="following.image_url ? following.image_url : noImg"
                >
                </v-img>
              </v-list-item-avatar>
              <v-list-item-title>
                {{ following.name }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import noImg from '~/assets/images/logged-in/no.png'

export default {
  layout: 'mypage',
  middleware: ['get-user-current', 'get-user-relationship'],
  data () {
    return {
      noImg
    }
  },
  computed: {
    CurrentUser() {
      const copyCurrentUser = this.$store.state.user.current
      return copyCurrentUser
    },
    followingUsers() {
      const copyFollowingUsers = this.$store.state.user.relationship.following
      return copyFollowingUsers
    }
  }
}
</script>