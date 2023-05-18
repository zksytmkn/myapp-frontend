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
                      v-show="currentCommunity.user_id === $auth.user.id"
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
                          <v-list-item @click="deleteCurrentCommunity">
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
                      isCurrentUserParticipatingIn
                        ? '＊ご参加済みです。'
                        : '＊ご自由に参加していただけます。'
                    }}
                  </v-card-text>
                  <v-card-actions
                    style="width:30%;"
                  >
                    <community-member />
                    <v-btn
                      class="font-weight-bold ml-2"
                      color="teal"
                      block
                      dark
                      @click="
                        isCurrentUserParticipatingIn
                          ? withdrawCommunity()
                          : participateInCommunity()"
                    >
                      {{
                        isCurrentUserParticipatingIn
                          ? 'コミュニティを退会する'
                          : 'コミュニティに参加する'
                      }}
                    </v-btn>
                  </v-card-actions>
                  <v-card-actions
                    v-show="isCurrentUserParticipatingIn"
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
                          @click="inviteUser(user.id)"
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
      v-show="isCurrentUserParticipatingIn"
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
            <MessageBoard
              :messages="messages"
              :inputted="inputted"
              @submitMessage="addCommunityMessage"
              @resetForm="formReset"
            >
              <template #messageLink="{ message }">
                <router-link
                  v-if="isUserParticipatingIn(message.user.id)"
                  v-slot="{ navigate }"
                  :to="$my.userLinkToProfile(message.user.id)"
                  custom
                >
                  <strong @click="navigate">
                    {{ message.user.name }}
                  </strong>
                </router-link>
                <strong v-else>退会済みユーザー</strong>
              </template>
            </MessageBoard>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import noImg from '~/assets/images/logged-in/no.png'

export default {
  middleware: 'get-user-list',
  data () {
    return {
      noImg,
      inputted: { msg: '' },
    }
  },
  computed: {
    currentCommunity() {
      return this.$store.state.community.current.community
    },
    messages() {
      return Array.from(this.$store.state.community.message).sort((a, b) => {
        if (a.created_at < b.created_at) return -1;
        if (a.created_at > b.created_at) return 1;
        return 0;
      });
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
    isCurrentUserParticipatingIn() {
      return this.$store.state.community.participation.some(community => community.id === this.currentCommunity.id);
    },
  },
  methods: {
    isUserParticipatingIn(userId) {
      return this.$store.state.community.current.participation.some(
        (participant) => participant.id === userId
      );
    },
    async deleteCurrentCommunity() {
      try {
        if (!confirm('本当にこのコミュニティを削除しますか？')) {
          return;
        }

        await this.$axios.$delete(`/api/v1/communities/${this.currentCommunity.id}`);
        this.$store.dispatch('getToast', { msg: 'コミュニティを削除しました', color: 'success' });
        
        this.$router.go(-1);
      } catch (error) {
        this.$store.dispatch('getToast', { msg: 'コミュニティを削除できませんでした', color: 'error' });
      }
    },
    async addCommunityMessage(message) {
      if (this.isValid) return;
      const data = {
        community_message: {
          content: message,
        },
      };
      this.formReset();
    
      try {
        await this.$axios.$post(`/api/v1/communities/${this.currentCommunity.id}/community_messages`, data);
    
        this.$store.dispatch('getToast', { msg: 'メッセージを送信しました', color: 'success' });
        await this.refreshMessages();
        await this.scrollBottom();
        this.formReset();
      } catch (error) {
        this.$store.dispatch('getToast', { msg: 'メッセージを送信できませんでした', color: 'error' });
      }
    },
    formReset() {
      this.sentIt = false;
    },
    async refreshMessages() {
      const messages = await this.$axios.$get(`/api/v1/communities/${this.currentCommunity.id}/community_messages`);
      this.$store.commit('setCommunityMessage', messages);
    },
    async participateInCommunity() {
      try {
        await this.$axios.$post('/api/v1/participations', { community_id: this.currentCommunity.id });
        this.$store.dispatch('getToast', { msg: 'コミュニティに参加しました', color: 'success' });

        const [participations, community] = await Promise.all([
          this.$axios.$get('/api/v1/participations'),
          this.$axios.$get(`/api/v1/communities/${this.currentCommunity.id}`),
        ]);
        this.$store.commit('setParticipationCommunity', participations);
        this.$store.commit('setCurrentCommunity', community);
      } catch (error) {
        this.$store.dispatch('getToast', { msg: 'コミュニティに参加できませんでした', color: 'error' });
      }
    },
    async withdrawCommunity() {
      try {
        if (!confirm('本当にこのコミュニティを退会しますか？')) {
          return;
        }

        await this.$axios.$delete(`/api/v1/participations/${this.currentCommunity.id}`);
        this.$store.dispatch('getToast', { msg: 'コミュニティを退会しました', color: 'success' });

        const [participations, community] = await Promise.all([
          this.$axios.$get('/api/v1/participations'),
          this.$axios.$get(`/api/v1/communities/${this.currentCommunity.id}`),
        ]);
        this.$store.commit('setParticipationCommunity', participations);
        this.$store.commit('setCurrentCommunity', community);
      } catch (error) {
        this.$store.dispatch('getToast', { msg: 'コミュニティを退会できませんでした', color: 'error' });
      }
    },
    async inviteUser(userId) {
      try {
        if (!confirm('本当にこのコミュニティに招待しますか？')) {
          return;
        }

        await this.$axios.$post('/api/v1/invitations', {
          invitation: {
            invited_id: userId,
            community_id: this.currentCommunity.id
          }
        });
        this.$store.dispatch('getToast', { msg: 'コミュニティに招待しました', color: 'success' });

        const community = await this.$axios.$get(`/api/v1/communities/${this.currentCommunity.id}`);
        this.$store.commit('setCurrentCommunity', community);
      } catch (error) {
        this.$store.dispatch('getToast', { msg: 'コミュニティに招待できませんでした', color: 'error' });
      }
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
