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
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  フォロワー
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider/>

            <v-list-item
              v-for="(followed, i) in followedUsers"
              :key="`followed-${i}`"
              :to="$my.userLinkToProfile(followed.id)"
            >
              <v-list-item-avatar
                left
              >
                <v-img
                  :src="followed.image_url ? followed.image_url : noImg"
                >
                </v-img>
              </v-list-item-avatar>
              <v-list-item-title>
                {{ followed.name }}
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
    layout: 'logged-in',
    middleware: ['get-user-list'],
    data () {
      return {
        noImg
      }
    },
    computed: {
      followedUsers() {
        const copyFollowedUsers = this.$store.state.user.list
        return copyFollowedUsers
      }
    }
  }
</script>