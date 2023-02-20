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
                    {{ currentCommunity.name.substring(0, 16)+'...' }}
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
                    by {{ currentCommunity.maker }}
                  </v-card-subtitle>
                  <v-card-subtitle>
                    {{ currentCommunity.text.substring(0, 300)+'...' }}
                  </v-card-subtitle>

                  <v-divider/>
                  <v-card-text>
                    <span
                      class="font-weight-bold"
                    >
                      参加人数：{{ users.length }}人
                    </span>
                    <br/>
                    <span
                      v-show="!participated"
                    >
                      ＊ご自由に参加していただけます。
                    </span>
                    <span
                      v-show="participated"
                    >
                      ＊ご参加済みです。
                    </span>
                  </v-card-text>
                  <v-card-actions
                    v-if="currentCommunity.maker!==$auth.user.name"
                    style="width:30%;"
                  >
                    <logged-in-app-community-member />
                    <v-btn
                      @click="participated = !participated"
                      v-show="!participated"
                      class="font-weight-bold ml-2"
                      color="teal"
                      block
                      dark
                    >
                      コミュニティに参加する
                    </v-btn>
                    <v-btn
                      @click="participated = !participated"
                      v-show="participated"
                      class="font-weight-bold ml-2"
                      color="teal"
                      block
                      dark
                    >
                      コミュニティを退会する
                    </v-btn>
                  </v-card-actions>
                  <v-card-actions
                    v-show="participated"
                    style="width:59.6%;"
                  >
                    <v-btn
                      v-show="participated"
                      class="font-weight-bold"
                      color="orange"
                      block
                      dark
                    >
                      コミュニティに招待する
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
              v-for="(message, i) in messages"
              :key="`message-${i}`"
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
                  {{ message.user.name }}
                </v-list-item-title>
                <v-list-item-action
                  v-if="message.user.id === $auth.user.id"
                >
                  <v-menu
                    app
                    offset-x
                    offset-y
                    max-width="200"
                  >
                    <template
                      v-slot:activator="{ on }"
                    >
                      <v-btn
                        icon
                        v-on="on"
                      >
                        <v-icon>
                          mdi-dots-horizontal
                        </v-icon>
                      </v-btn>
                    </template>
                    <v-list
                      dense
                    >
                      <template>
                        <v-list-item
                          @click="deleteCommunityMessage(message.id)"
                        >
                          <v-list-item-title>
                            削除する
                          </v-list-item-title>
                        </v-list-item>
                      </template>
                    </v-list>
                  </v-menu>
                </v-list-item-action>
                <v-spacer />
                <v-card-subtitle>
                  {{ dateFormat(message.updated_at) }} 
                </v-card-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-text>
                  {{ message.communityMessage_content }}
                </v-list-item-text>
              </v-list-item>
              <v-divider/>
            </v-list>
            <v-form
              ref="new"
              v-model="isValid"
            >
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
                          v-model="inputted.message"
                          :rules="messageRules"
                        >
                        </v-textarea>
                      </v-col>
                      <v-col
                        cols="11"
                      >
                        <v-row
                          justify="center"
                          align="center"
                        >
                          <v-btn
                            text
                            outlined
                            class="font-weight-bold mt-3 mb-3 mr-2"
                            @click="addCommunityMessage"
                            :disabled="!isValid"
                          >
                            送信する
                          </v-btn>
  
                          <v-btn
                            text
                            @click="formReset"
                          >
                            キャンセル
                          </v-btn>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-list-item> 
              </v-list>
            </v-form>
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
      isValid: false,
      participated: false,
      messageRules: [
        v => !!v || 'メッセージを追加してください'
      ],
      inputted: { message: '', communityId: this.$store.state.community.current.id, userId: this.$auth.user.id }
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
    },
    async addCommunityMessage() {
      if (this.isValid) {
        const formData = new FormData()
        formData.append('communityMessage_content', this.inputted.message)
        formData.append('community_id', this.inputted.communityId)
        formData.append('user_id', this.inputted.userId)
        await this.$axios.$post('api/v1/community_messages', formData)
        .then(response => {
          this.$router.go({path: this.$router.currentRoute.path, force: true})
          const msg = 'メッセージを送信しました'
          const color = 'success'
          return this.$store.dispatch('getToast', { msg, color })
        })
        .catch(error => {
          console.log(error)
          const msg = 'メッセージの送信に失敗しました'
          return this.$store.dispatch('getToast', { msg })
        })
      }
    },
    formReset() {
      this.sentIt = false
      this.$refs.new.reset()
    },
    async deleteCommunityMessage(id) {
      await this.$axios.$delete(`/api/v1/community_messages/${id}`)
      .then(response => {
        this.$router.go({path: this.$router.currentRoute.path, force: true})
        const msg = 'メッセージを削除しました'
        const color = 'success'
        return this.$store.dispatch('getToast', { msg, color })
      })
      .catch(error => {
        console.log(error)
        const msg = 'メッセージの削除に失敗しました'
        return this.$store.dispatch('getToast', { msg })
      })
    }
  },
  computed: {
    currentCommunity () {
      const copyCommunity = this.$store.state.community.current
      return copyCommunity
    },
    messages() {
      const copyMessages = Array.from(this.$store.state.community.message)
      return copyMessages.sort((a, b) => {
        if (a.updated_at < b.updated_at) { return -1 }
        if (a.updated_at > b.updated_at) { return 1 }
        return 0
      })
    },
    dateFormat() {
      return (date) => {
        const dateTimeFormat = new Intl.DateTimeFormat(
          'ja', { dateStyle: 'medium' }
        )
        return dateTimeFormat.format(new Date(date))
      }
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