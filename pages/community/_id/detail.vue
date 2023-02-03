<template>
  <div
    id="detail"
  >
    <logged-in-app-eye-catch>
      <template
        v-slot
      >
        Many farmers post about agriculture here !
        Please look around and enjoy it !
      </template>
    </logged-in-app-eye-catch>

    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
          <v-card>
            <v-container>
              <v-row>
                <v-col
                  cols="4"
                >
                  <v-img
                    :src="currentCommunity.image_url ? currentCommunity.image_url : noImg"
                    max-height="360px"
                    max-width="360px"
                    aspect-ratio="1"
                  >
                  </v-img>
                  <v-card-title
                    class="font-weight-bold pa-1"
                    style="max-width:360px;"
                  >
                    {{ currentCommunity.name }}
                    <v-card-subtitle>
                      by {{ currentCommunity.maker }}
                    </v-card-subtitle>
                    <v-spacer />
                    <v-btn
                      text
                      outlined
                      to="/communities/list"
                      class="font-weight-bold"
                    >
                      一覧
                    </v-btn>
                  </v-card-title>
                </v-col>

                <v-col
                  cols="8"
                >
                  <v-card-subtitle>
                    {{ currentCommunity.text }}
                  </v-card-subtitle>

                  <v-divider/>
                  <v-card-text>
                    <span
                      class="font-weight-bold"
                    >
                      参加人数：{{ currentCommunity.member }}人
                    </span>
                    <br/>
                    ＊ご自由に参加していただけます。
                  </v-card-text>
                  <v-card-actions
                    style="width:30%;"
                  >
                    <v-btn
                      class="font-weight-bold"
                      color="teal"
                      outlined
                    >
                      メンバーを見てみる
                    </v-btn>
                    <v-btn
                      class="font-weight-bold"
                      color="teal"
                      block
                      dark
                    >
                      コミュニティに参加する
                    </v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import noImg from '~/assets/images/logged-in/no.png'

export default {
  layout: 'logged-in',
  middleware: ['get-community-list'],
  data () {
    return {
      noImg
    }
  },
  computed: {
    currentCommunity () {
      const copyCommunity = this.$store.state.community.current
      return copyCommunity
    }
  }
}
</script>

<style lang="scss">
#detail {
  .v-parallax__content {
    padding: 0;
  }
}
</style>