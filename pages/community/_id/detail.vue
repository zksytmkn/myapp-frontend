<template>
  <div
    id="community"
    class="mb-10"
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
                  <v-card-title>
                    <span
                      class="text-subtitle-1"
                    >
                      by {{ currentCommunity.maker }}
                    </span>
                    <v-spacer/>
                    <v-list-item-action
                      v-if="currentCommunity.maker === $auth.user.name"
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
                            :to="$my.communityLinkToEdit(currentCommunity.id)"
                            >
                              <v-list-item-title>
                                編集する
                              </v-list-item-title>
                            </v-list-item>
                            <v-list-item
                              @click="deleteCurrentCommunity(currentCommunity.id)"
                            >
                              <v-list-item-title>
                                削除する
                              </v-list-item-title>
                            </v-list-item>
                          </template>
                        </v-list>
                      </v-menu>
                    </v-list-item-action>
                  </v-card-title>
                  <v-card-text>
                    {{ currentCommunity.text.substring(0, 300)+'...' }}
                  </v-card-text>

                  <v-divider/>
                  <v-card-text>
                    <span
                      class="font-weight-bold"
                    >
                      参加人数：{{ this.$store.state.community.current.user.length }}人
                    </span>
                    <br/>
                    <span
                      v-show="!this.$store.state.user.community.participation.some(community => community.id === currentCommunity.id)"
                    >
                      ＊ご自由に参加していただけます。
                    </span>
                    <span
                      v-show="this.$store.state.user.community.participation.some(community => community.id === currentCommunity.id)"
                    >
                      ＊ご参加済みです。
                    </span>
                  </v-card-text>
                  <v-card-actions
                    style="width:30%;"
                  >
                    <logged-in-app-community-member />
                    <v-btn
                      @click="participateInCommunity(currentCommunity.id)"
                      v-show="!this.$store.state.user.community.participation.some(community => community.id === currentCommunity.id)"
                      class="font-weight-bold ml-2"
                      color="teal"
                      block
                      dark
                    >
                      コミュニティに参加する
                    </v-btn>
                    <v-btn
                      @click="withdrawCommunity(currentCommunity.id)"
                      v-show="this.$store.state.user.community.participation.some(community => community.id === currentCommunity.id)"
                      class="font-weight-bold ml-2"
                      color="teal"
                      block
                      dark
                    >
                      コミュニティを退会する
                    </v-btn>
                  </v-card-actions>
                  <v-card-actions
                    v-show="this.$store.state.user.community.participation.some(community => community.id === currentCommunity.id)"
                    style="width:59.6%;"
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
                          class ="font-weight-bold"
                          color="orange"
                          block
                          dark
                          v-on="on"
                        >
                          コミュニティに招待する
                        </v-btn>
                      </template>
                      <v-list
                        dense
                      >
                        <template>
                          <v-list-item
                            v-for="(user, i) in allUsers"
                            :key="`user-${i}`"
                            @click="inviteUser(user.id)"
                          >
                            <v-list-item-title>
                              {{ user.name }}
                            </v-list-item-title>
                          </v-list-item>
                        </template>
                      </v-list>
                    </v-menu>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container
      v-show="this.$store.state.user.community.participation.some(community => community.id === currentCommunity.id)"
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
      messageRules: [
        v => !!v || 'メッセージを追加してください'
      ],
      inputted: { message: '', communityId: this.$store.state.community.current.community.id, userId: this.$auth.user.id }
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
    },
    async participateInCommunity(id) {
      const formData = new FormData()
      formData.append('user_id', this.$auth.user.id)
      formData.append('community_id', id)
      await this.$axios.$post('/api/v1/participations', formData)
      .then(response => {
        this.$router.go({path: this.$router.currentRoute.path, force: true})
        const msg = 'コミュニティに参加しました'
        const color = 'success'
        return this.$store.dispatch('getToast', { msg, color })
      })
      .catch(error => {
        console.log(error)
        const msg = 'コミュニティに参加できませんでした'
        return this.$store.dispatch('getToast', { msg })
      })
    },
    async withdrawCommunity(id) {
      const formData = new FormData()
      formData.append('user_id', this.$auth.user.id)
      formData.append('community_id', id)
      await this.$axios.$delete(`/api/v1/participations/0`, formData)
      .then(response => {
        this.$router.go({path: this.$router.currentRoute.path, force: true})
        const msg = 'コミュニティを退会しました'
        const color = 'success'
        return this.$store.dispatch('getToast', { msg, color })
      })
      .catch(error => {
        console.log(error)
        const msg = 'コミュニティを退会できませんでした'
        return this.$store.dispatch('getToast', { msg })
      })
    },
    async inviteUser(id) {
      const formData = new FormData()
      formData.append('user_id', this.$auth.user.id)
      formData.append('community_id', id)
      await this.$axios.$post('/api/v1/invitations', formData)
      .then(response => {
        this.$router.go({path: this.$router.currentRoute.path, force: true})
        const msg = 'コミュニティに招待しました'
        const color = 'success'
        return this.$store.dispatch('getToast', { msg, color })
      })
      .catch(error => {
        console.log(error)
        const msg = 'コミュニティに招待できませんでした'
        return this.$store.dispatch('getToast', { msg })
      })
    }
  },
  computed: {
    currentCommunity() {
      const copyCommunity = this.$store.state.community.current.community
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
    allUsers() {
      const copyAllUsers = Array.from(this.$store.state.user.list.filter(user => this.$store.state.community.current.user.some(v => v.id !== user.id)))
      return copyAllUsers
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