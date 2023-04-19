<template>
  <v-col
    cols="3"
  >
    <v-sheet
      rounded="lg"
    >
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              マイページ
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider/>
        <v-list-item
          :to="CurrentUser ? $my.userLinkToProfile(CurrentUser.id) : $my.userLinkToProfile($auth.user.id)"
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
          :to="CurrentUser ? $my.userLinkToFollowing(CurrentUser.id) : $my.userLinkToFollowing($auth.user.id)"
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
          :to="CurrentUser ? $my.userLinkToFollowed(CurrentUser.id) : $my.userLinkToFollowed($auth.user.id)"
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
          v-show="!CurrentUser || CurrentUser.id === $auth.user.id"
          to="/mypage/PersonalInfo"
        >
          <v-list-item-avatar
            left
          >
            <v-icon>
              mdi-credit-card-marker-outline
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-title>
            個人情報
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-col>
</template>

<script>
export default {
  layout: 'mypage',
  middleware: ['get-user-current'],
  computed: {
    CurrentUser() {
      const copyCurrentUser = this.$store.state.user.current
      return copyCurrentUser
    }
  }
}
</script>
