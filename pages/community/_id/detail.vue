<template>
  <div
    id="community"
  >
    <logged-in-app-community-eye-catch/>
    <v-container>
      <v-list
        color="transparent"
      >
        <v-list-item>
          <v-list-item-title
            class="font-weight-bold"
          >
            詳細
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider/>
    </v-container>
    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
          <v-card>
            <v-container>
              <v-row>
                <v-col
                  cols="5"
                >
                  <v-img
                    :src="currentCommunity.image_url ? currentCommunity.image_url : noImg"
                    max-height="430px"
                    max-width="430px"
                    aspect-ratio="1"
                  >
                  </v-img>
                  <v-card-title
                    class="font-weight-bold pa-1"
                    style="max-width:430px;"
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
                  cols="7"
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
                    v-if="currentCommunity.maker!==$auth.user.name"
                    style="width:30%;"
                  >
                    <v-btn
                      class="font-weight-bold"
                      color="teal"
                      outlined
                    >
                      メンバーを見る
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
                  <v-card-actions
                    v-if="currentCommunity.maker===$auth.user.name"
                    style="width:30%;"
                  >
                    <v-btn
                      :to="$my.communityLinkToEdit(currentCommunity.id)"
                      class="font-weight-bold"
                      color="teal"
                      block
                      dark
                      outlined
                    >
                      編集する
                    </v-btn>
                    <v-btn
                      @click="deleteCurrentCommunity(currentCommunity.id)"
                      class="font-weight-bold"
                      color="teal"
                      block
                      dark
                    >
                      削除する
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
  methods: {
    async deleteCurrentCommunity(id) {
      await this.$axios.$delete(`/api/v1/communities/${id}`)
      .then(response => {
        this.$router.back()
        const msg = 'コミュニティを削除しました'
        const color = 'success'
        return this.$store.dispatch('getToast', { msg, color })
      })
      .catch(error => {
        console.log(error)
        const msg = 'コミュニティの削除に失敗しました'
        return this.$store.dispatch('getToast', { msg })
      })
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
#community {
  .v-parallax__content {
    padding: 0;
  }
}
</style>