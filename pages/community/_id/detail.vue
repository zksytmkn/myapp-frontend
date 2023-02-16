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
                      参加人数：{{ users.length }}人
                    </span>
                    <br/>
                    ＊ご自由に参加していただけます。
                  </v-card-text>
                  <v-card-actions
                    v-if="currentCommunity.maker!==$auth.user.name"
                    style="width:30%;"
                  >
                    <logged-in-app-community-member />
                    <v-btn
                      @click="participated = !participated"
                      class="font-weight-bold ml-2"
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

    <v-container
      v-show="participated"
    >
      <v-row>
        <v-col
          cols="12"
        >
          <v-card
            flat
            rounded="lg"
          >
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-bold"
                  >
                    コミュニティ
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider/>
            <v-list
              v-for="(comment, i) in comments"
              :key="`comment-${i}`"
            >
              <v-list-item>
                <v-list-item-title>
                  <v-list-item-avatar
                    left
                  >
                    <v-img
                      :src="noImg"
                    >
                    </v-img>
                  </v-list-item-avatar>
                  {{ comment.user.name }}
                </v-list-item-title>
                <v-spacer />
                <v-card-subtitle>
                  {{ dateFormat(comment.updated_at) }} 
                </v-card-subtitle>
                <v-card-subtitle>
                  <logged-in-app-comment-detail/>
                </v-card-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-text>
                  {{ comment.productComment_content }}
                </v-list-item-text>
              </v-list-item>
              <v-divider/>
            </v-list>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <v-list-item-avatar
                    left
                  >
                    <v-img
                      :src="$auth.user.image_url ? $auth.user.image_url : noImg"
                    >
                    </v-img>
                  </v-list-item-avatar>
                    {{ $auth.user.name }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-container>
                  <v-row
                    justify="center"
                  >
                    <v-col
                      cols="11"
                    >
                      <v-textarea
                        dense
                        outlined
                        hide-details="auto"
                        rows="2"
                        placeholder="メッセージを追加する"
                      >
                      </v-textarea>
                    </v-col>
                    <v-col
                      cols="11"
                    >
                      <v-row
                        justify="center"
                      >
                        <v-btn
                          text
                          outlined
                          class="font-weight-bold mt-3 mb-3"
                        >
                          送信する
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
  </div>
</template>

<script>
import noImg from '~/assets/images/logged-in/no.png'

export default {
  layout: 'logged-in',
  middleware: ['get-user-list'],
  data () {
    return {
      noImg,
      participated: false
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
    },
    users() {
      const copyUsers = this.$store.state.user.list
      return copyUsers
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