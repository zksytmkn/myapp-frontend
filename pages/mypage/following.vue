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
                フォロー
              </v-list-item-title>
            </v-list-item>

            <v-divider/>

            <v-list-item
              v-for="(following, i) in followingUsers"
              :key="`following-${i}`"
              to="aaa"
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
    layout: 'logged-in',
    middleware: ['get-user-list'],
    data () {
      return {
        noImg
      }
    },
    computed: {
      followingUsers() {
        const copyFollowingUsers = this.$store.state.user.list
        return copyFollowingUsers
      }
    }
  }
</script>