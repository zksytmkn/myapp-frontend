<template>
  <v-container
    class="mt-3"
  >
    <v-row>
      <mypage-menu/>
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
                  v-show="CurrentUser.id===$auth.user.id"
                >
                  あなたのフォロー
                </v-list-item-title>
                <v-list-item-title
                  v-show="CurrentUser.id!==$auth.user.id"
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