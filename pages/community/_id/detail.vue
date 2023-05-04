<template>
  <div
    class="mb-12"
  >
    <v-container>
      <v-list-item>
        <v-list-item-title
          class="font-weight-bold"
        >
          詳細
        </v-list-item-title>
      </v-list-item>
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
                    {{ currentCommunity.name.length > 13 ? currentCommunity.name.substring(0, 13) + '...' : currentCommunity.name }}
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
                        class="text-decoration-none teal--text text--darken-2"
                      >
                        by {{ currentCommunity.user.name }}
                      </nuxt-link>
                      <nuxt-link
                        v-show="invitingUser"
                        :to="$my.userLinkToProfile(invitingUser?.id)"
                        class="text-decoration-none orange--text text--darken-2"
                      >
                        （{{ invitingUser?.name }}さんに招待されました。）
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
                          #activator="{ on }"
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
                        <v-list dense>
                          <v-list-item :to="$my.communityLinkToEdit(currentCommunity.id)">
                            <v-list-item-title>
                              編集する
                            </v-list-item-title>
                          </v-list-item>
                          <v-list-item @click="deleteCurrentCommunity(currentCommunity.id)">
                            <v-list-item-title>
                              削除する
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-list-item-action>
                  </v-card-title>
                  <v-card-text>
                    {{ currentCommunity.description.length > 300 ? currentCommunity.description.substring(0, 300) + '...' : currentCommunity.description }}
                  </v-card-text>

                  <v-divider/>
                  <v-card-text>
                    <span class="font-weight-bold">
                      参加人数：{{ $store.state.community.current.participation.length }}人
                    </span>
                    <br/>
                    {{
                      $store.state.community.participation.some(community => community.id === currentCommunity.id)
                        ? '＊ご参加済みです。'
                        : '＊ご自由に参加していただけます。'
                    }}
                  </v-card-text>
                  <v-card-actions
                    style="width:30%;"
                  >
                    <logged-in-app-community-member />
                    <v-btn
                      class="font-weight-bold ml-2"
                      color="teal"
                      block
                      dark
                      @click="
                        $store.state.community.participation.some(community => community.id === currentCommunity.id)
                          ? withdrawCommunity(currentCommunity.id)
                          : participateInCommunity(currentCommunity.id)"
                    >
                      {{
                        $store.state.community.participation.some(community => community.id === currentCommunity.id)
                          ? 'コミュニティを退会する'
                          : 'コミュニティに参加する'
                      }}
                    </v-btn>
                  </v-card-actions>
                  <v-card-actions
                    v-show="$store.state.community.participation.some(community => community.id === currentCommunity.id)"
                    style="width:60%;"
                  >
                    <v-menu
                      app
                      offset-x
                      offset-y
                      max-width="200"
                    >
                      <template
                        #activator="{ on }"
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
                        <v-list-item
                          v-for="(user, i) in allUsers"
                          :key="`user-${i}`"
                          @click="inviteUser(user.id, currentCommunity.id)"
                        >
                          <v-list-item-title>
                            {{ user.name }}
                          </v-list-item-title>
                        </v-list-item>
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
        <v-col cols="12">
          <v-card flat rounded="lg">
            <v-list>
              <v-list-item>
                <v-list-item-title class="font-weight-bold">
                  コミュニティ
                </v-list-item-title>
              </v-list-item>
            </v-list>
            <v-divider/>
            <v-sheet
              ref="messageContainer"
              class="overflow-y-auto grey lighten-5 text-caption font-weight-medium pt-4"
              :style="{height: 'calc(100vh - 250px)', 'background-color': '#e0f2f1'}"
            >
              <v-row v-for="(message, i) in messages" :key="`message-${i}`">
                <v-col
                  cols="12"
                  :class="message.user.id === $auth.user.id ? 'd-flex justify-end' : 'd-flex'"
                >
                  <div v-if="message.user.id !== $auth.user.id" class="mb-1" style="font-size: 0.7rem; margin-left: 30px;">
                    <router-link
                      v-if="isUserInParticipation(message.user.id)"
                      v-slot="{ navigate }"
                      :to="$my.userLinkToProfile(message.user.id)"
                      custom
                    >
                      <strong @click="navigate">
                        {{ message.user.name }}
                      </strong>
                    </router-link>
                    <strong v-else>退会済みユーザー</strong>
                    <br>
                    {{ dateFormat(message.updated_at) }}
                  </div>
                  <v-list
                    :class="message.user.id === $auth.user.id ? 'ml-6 pa-2 teal lighten-2 text-white' : 'mr-6 pa-2 orange lighten-2'"
                    style="border-radius: 18px; margin-left: 12px; margin-right: 12px; display: inline-block;"
                    :style="{ maxWidth: '50%', width: 'auto' }"
                  >
                    <v-list-item-title
                      class="font-weight-bold"
                      :style="{ 'word-wrap': 'break-word', 'white-space': 'pre-wrap' }"
                    >{{ message.content }}</v-list-item-title>
                  </v-list>
                  <div v-if="message.user.id === $auth.user.id" class="mt-1" style="font-size: 0.7rem; margin-right: 30px;">
                    <strong>あなた</strong>
                    <br>
                    {{ dateFormat(message.updated_at) }}
                  </div>
                </v-col>
              </v-row>
            </v-sheet>
            <v-divider/>
            <v-sheet class="pa-4" height="110">
              <v-form ref="new" v-model="valid" @submit.prevent="addCommunityMessage">
                <v-text-field
                  v-model="inputted.msg"
                  :rules="msgRules"
                  label="メッセージを入力する"
                  counter="200"
                  dense
                  append-icon="mdi-send"
                  @click:append="addCommunityMessage"
                />
              </v-form>
              <v-btn text @click="formReset">
                キャンセル
              </v-btn>
            </v-sheet>
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
      valid: false,
      msgRules: [v => !!v || ''],
      inputted: { msg: '' }
    }
  },
  computed: {
    currentCommunity() {
      return this.$store.state.community.current.community
    },
    messages() {
      return Array.from(this.$store.state.community.message).sort((a, b) => a.created_at.localeCompare(b.created_at));
    },
    dateFormat() {
      return (date) => new Intl.DateTimeFormat('ja', { dateStyle: 'medium' }).format(new Date(date));
    },
    allUsers() {
      const { participation, invited } = this.$store.state.community.current;
      const excludedUser = participation.concat(invited);

      return this.$store.state.user.list.filter(user =>
        !excludedUser.some(excluded => excluded.id === user.id)
      );
    },
    invitingUser() {
      return this.$store.state.community.current.inviting
    },
    isUserInParticipation() {
      return (userId) =>
        this.$store.state.community.current.participation.some(
          (participant) => participant.id === userId
        );
    },
  },
  methods: {
    async processResponse(action, successMsg, errorMsg, successCallback) {
      try {
        await action();
        this.$store.dispatch('getToast', { msg: successMsg, color: 'success' });
        if (successCallback) {
          successCallback();
        }
      } catch (e) {
        this.$store.dispatch('getToast', { msg: errorMsg, color: 'error' });
      }
    },
    deleteCurrentCommunity(id) {
      this.processResponse(
        () => this.$axios.$delete(`/api/v1/communities/${id}`),
        'コミュニティを削除しました',
        'コミュニティを削除できませんでした',
        () => this.$router.go(-1)
      );
    },
    async addCommunityMessage() {
      if (!this.valid) return;
      this.formReset();

      await this.processResponse(
        () => this.$axios.$post(`/api/v1/communities/${this.currentCommunity.id}/community_messages`, {
          community_message: {
            content: this.inputted.msg
          }
        }),
        "メッセージを送信しました",
        "メッセージを送信できませんでした",
        async () => {
          await this.refreshMessages();
          await this.scrollBottom();
        }
      );
    },
    formReset() {
      this.sentIt = false
      this.$refs.new.reset()
    },
    async refreshMessages() {
      const messages = await this.$axios.$get(`/api/v1/communities/${this.currentCommunity.id}/community_messages`);
      this.$store.dispatch('getCommunityMessage', messages);
    },
    async participateInCommunity(communityId) {
      await this.processResponse(
        () => this.$axios.$post('/api/v1/participations', {
          user_id: this.$auth.user.id,
          community_id: communityId
        }),
        'コミュニティに参加しました',
        'コミュニティに参加できませんでした',
        async () => {
          const [participations, community] = await Promise.all([
            this.$axios.$get('/api/v1/participations'),
            this.$axios.$get(`/api/v1/communities/${communityId}`),
          ]);
          this.$store.dispatch('getParticipationCommunity', participations);
          this.$store.dispatch('getCurrentCommunity', community);
        }
      );
    },
    async withdrawCommunity(communityId) {
      await this.processResponse(
        () => this.$axios.$delete(`/api/v1/participations/${communityId}/user/${this.$auth.user.id}`),
        'コミュニティを退会しました',
        'コミュニティを退会できませんでした',
        async () => {
          const [participations, community] = await Promise.all([
            this.$axios.$get('/api/v1/participations'),
            this.$axios.$get(`/api/v1/communities/${communityId}`),
          ]);
          this.$store.dispatch('getParticipationCommunity', participations);
          this.$store.dispatch('getCurrentCommunity', community);
        }
      );
    },
    async inviteUser(userId, communityId) {
      await this.processResponse(
        () => this.$axios.$post('/api/v1/invitations', {
          inviting_id: this.$auth.user.id,
          invited_id: userId,
          community_id: communityId
        }),
        'コミュニティに招待しました',
        'コミュニティに招待できませんでした',
        async () => {
          const community = await this.$axios.$get(`/api/v1/communities/${communityId}`);
          this.$store.dispatch('getCurrentCommunity', community);
        }
      );
    },
    scrollBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messageContainer;
        if (container) {
          const scrollableElement = container.$el;
          scrollableElement.scrollTop = scrollableElement.scrollHeight;
        }
      });
    },
  }
}
</script>
