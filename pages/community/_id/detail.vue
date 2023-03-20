<template>
  <div
    id="community"
    class="mb-10"
  >
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
                    <span
                      v-show="currentCommunity.name.length>16"
                    >
                      {{ currentCommunity.name.substring(0, 16)+'...' }}
                    </span>
                    <span
                      v-show="currentCommunity.name.length<=16"
                    >
                      {{ currentCommunity.name }}
                    </span>
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
                      class="text-subtitle-2"
                    >
                      <nuxt-link
                        :to="$my.userLinkToProfile(currentCommunity.user_id)"
                        class="text-decoration-none grey--text text--darken-2"
                      >
                        by {{ currentCommunity.user.name }}
                      </nuxt-link>
                    </span>
                    <v-spacer/>
                    <v-list-item-action
                      v-if="currentCommunity.user_id === $auth.user.id"
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
                    <span
                      v-show="currentCommunity.text.length>300"
                    >
                      {{ currentCommunity.text.substring(0, 300)+'...' }}
                    </span>
                    <span
                      v-show="currentCommunity.text.length<=300"
                    >
                      {{ currentCommunity.text }}
                    </span>
                  </v-card-text>

                  <v-divider/>
                  <v-card-text>
                    <span
                      class="font-weight-bold"
                    >
                      参加人数：{{ this.$store.state.community.current.participation.length }}人
                    </span>
                    <br/>
                    <span
                      v-show="!this.$store.state.community.participation.some(community => community.id === currentCommunity.id)"
                    >
                      ＊ご自由に参加していただけます。
                    </span>
                    <span
                      v-show="this.$store.state.community.participation.some(community => community.id === currentCommunity.id)"
                    >
                      ＊ご参加済みです。
                    </span>
                  </v-card-text>
                  <v-card-actions
                    style="width:30%;"
                  >
                    <logged-in-app-community-member />
                    <v-btn
                      @click="participateInCommunity(currentCommunity.id, $auth.user.id)"
                      v-show="!this.$store.state.community.participation.some(community => community.id === currentCommunity.id)"
                      class="font-weight-bold ml-2"
                      color="teal"
                      block
                      dark
                    >
                      コミュニティに参加する
                    </v-btn>
                    <v-btn
                      @click="withdrawCommunity(currentCommunity.id, $auth.user.id)"
                      v-show="this.$store.state.community.participation.some(community => community.id === currentCommunity.id)"
                      class="font-weight-bold ml-2"
                      color="teal"
                      block
                      dark
                    >
                      コミュニティを退会する
                    </v-btn>
                  </v-card-actions>
                  <v-card-actions
                    v-show="this.$store.state.community.participation.some(community => community.id === currentCommunity.id)"
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
                            @click="inviteUser(user.id, currentCommunity.id)"
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
      v-show="$store.state.community.participation.some(community => community.id === currentCommunity.id)"
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
                          @click="deleteCommunityMessage(message.id, currentCommunity.id)"
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
                          :disabled="sentIt"
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
                            @click="addCommunityMessage(currentCommunity.id)"
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
        v => !!v || ''
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
        const msg = 'コミュニティを削除できませんでした'
        const color = 'error'
        return this.$store.dispatch('getToast', { msg, color })
      })
    },
    addCommunityMessage(id) {
      if (this.isValid) {
        const asyncFunc = async() => {
          const formData = new FormData()
          formData.append('communityMessage_content', this.inputted.message)
          formData.append('community_id', this.inputted.communityId)
          formData.append('user_id', this.inputted.userId)
          this.formReset()
          await this.$axios.$post('api/v1/community_messages', formData)
          .then(response => {
            const msg = 'メッセージを送信しました'
            const color = 'success'
            return this.$store.dispatch('getToast', { msg, color })
          })
          .catch(error => {
            console.log(error)
            const msg = 'メッセージを送信できませんでした'
            const color = 'error'
            return this.$store.dispatch('getToast', { msg, color })
          })
          await this.$axios.$get(`api/v1/community_messages/${id}`)
          .then(messages => this.$store.dispatch('getCommunityMessage', messages))
        }
        asyncFunc().finally(response => console.log(response))
      }
    },
    formReset() {
      this.sentIt = false
      this.$refs.new.reset()
    },
    deleteCommunityMessage(messageId, communityId) {
      const asyncFunc = async() => {
        await this.$axios.$delete(`/api/v1/community_messages/${messageId}`)
        .then(response => {
          const msg = 'メッセージを削除しました'
          const color = 'success'
          return this.$store.dispatch('getToast', { msg, color })
        })
        .catch(error => {
          console.log(error)
          const msg = 'メッセージを削除できませんでした'
          const color = 'error'
          return this.$store.dispatch('getToast', { msg, color })
        })
        await this.$axios.$get(`api/v1/community_messages/${communityId}`)
        .then(messages => this.$store.dispatch('getCommunityMessage', messages))
      }
      asyncFunc().finally(response => console.log(response))
    },
    participateInCommunity(communityId, userId) {
      const asyncFunc = async() => {
        const formData = new FormData()
        formData.append('user_id', this.$auth.user.id)
        formData.append('community_id', communityId)
        await this.$axios.$post('/api/v1/participations', formData)
        .then(response => {
          const msg = 'コミュニティに参加しました'
          const color = 'success'
          return this.$store.dispatch('getToast', { msg, color })
        })
        .catch(error => {
          console.log(error)
          const msg = 'コミュニティに参加できませんでした'
          const color = 'error'
          return this.$store.dispatch('getToast', { msg, color })
        })
        await Promise.all([
          this.$axios.$get(`/api/v1/participations/${userId}`),
          this.$axios.$get(`/api/v1/communities/${communityId}`),
        ])
        .then(response => {
          this.$store.dispatch('getParticipationCommunity', response[0])
          this.$store.dispatch('getCurrentCommunity', response[1])
        })
      }
      asyncFunc().finally(response => console.log(response))
    },
    withdrawCommunity(communityId, userId) {
      const asyncFunc = async() => {
        const formData = new FormData()
        formData.append('user_id', this.$auth.user.id)
        formData.append('community_id', communityId)
        await this.$axios.$delete(`/api/v1/participations`, {data: formData})
        .then(response => {
          const msg = 'コミュニティを退会しました'
          const color = 'success'
          return this.$store.dispatch('getToast', { msg, color })
        })
        .catch(error => {
          console.log(error)
          const msg = 'コミュニティを退会できませんでした'
          const color = 'error'
          return this.$store.dispatch('getToast', { msg, color })
        })
        await Promise.all([
          this.$axios.$get(`/api/v1/participations/${userId}`),
          this.$axios.$get(`/api/v1/communities/${communityId}`),
        ])
        .then(response => {
          this.$store.dispatch('getParticipationCommunity', response[0])
          this.$store.dispatch('getCurrentCommunity', response[1])
        })
      }
      asyncFunc().finally(response => console.log(response))
    },
    inviteUser(userId, communityId) {
      const asyncFunc = async() => {
        const formData = new FormData()
        formData.append('user_id', userId)
        formData.append('community_id', communityId)
        await this.$axios.$post('/api/v1/invitations', formData)
        .then(response => {
          const msg = 'コミュニティに招待しました'
          const color = 'success'
          return this.$store.dispatch('getToast', { msg, color })
        })
        .catch(error => {
          console.log(error)
          const msg = 'コミュニティに招待できませんでした'
          const color = 'error'
          return this.$store.dispatch('getToast', { msg, color })
        })
        await Promise.all([
          this.$axios.$get(`/api/v1/communities/${communityId}`),
        ])
        .then(response => {
          this.$store.dispatch('getCurrentCommunity', response[0])
        })
      }
      asyncFunc().finally(response => console.log(response))
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
        if (a.created_at < b.created_at) { return -1 }
        if (a.created_at > b.created_at) { return 1 }
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
      const participatedUser = this.$store.state.community.current.participation
      const invitedUser = this.$store.state.community.current.invitation
      const excludedUser = participatedUser.concat(invitedUser)
      const copyAllUsers = Array.from(this.$store.state.user.list.filter(function(user, index, array) {
        return !excludedUser.some(function(excluded) {
          return excluded.id === user.id
        })
      }))
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