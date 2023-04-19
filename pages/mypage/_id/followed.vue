<template>
  <v-container class="mt-12">
    <v-row>
      <mypage-menu />
      <v-col cols="9">
        <v-card flat rounded="lg">
          <v-list>
            <v-list-item>
              <v-list-item-title>
                {{
                  CurrentUser.id === $auth.user.id
                    ? "あなたのフォロワー"
                    : CurrentUser.name + "さんのフォロワー"
                }}
              </v-list-item-title>
            </v-list-item>

            <v-divider />

            <v-list-item v-show="!followedUsers.length">
              <v-list-item-title>フォローされておりません。</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-for="(followed, i) in followedUsers"
              :key="`followed-${i}`"
              :to="$my.userLinkToProfile(followed.id)"
            >
              <v-list-item-avatar left>
                <v-img
                  :src="followed.image_url ? followed.image_url : noImg"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-title>{{ followed.name }}</v-list-item-title>
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
  data() {
    return { noImg };
  },
  computed: {
    CurrentUser() {
      return this.$store.state.user.current;
    },
    followedUsers() {
      return this.$store.state.user.relationship.followed;
    },
  },
};
</script>
