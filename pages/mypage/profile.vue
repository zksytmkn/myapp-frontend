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
                    class="mt-9 mb-9"
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
                          </v-card-text>
                        </v-list>
                      </v-col>
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
  layout: 'logged-in',
  data () {
    return {
      noPersonImg,
      inputted: { name: '', prefecture: '', city: '', text: '', image: null }
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