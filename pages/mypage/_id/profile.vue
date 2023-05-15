<template>
  <v-container
    class="my-12"
  >
    <v-row>
      <mypage-menu/>
      <v-col
        cols="9"
      >
        <v-card
          flat
          rounded="lg"
        >
          <v-list>
            <v-list-item>
              <v-list-item-title>
                {{ CurrentUser.id === $auth.user.id ? 'あなたのプロフィール' : CurrentUser.name + 'さんのプロフィール' }}
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
                    class="mt-9"
                  >
                    <v-container>
                      <v-row
                        align="center"
                      >
                        <v-col
                          cols="5"
                        >
                          <v-avatar
                            height="260px"
                            width="260px"
                          >
                            <v-img
                              :src="CurrentUser.image_url ? CurrentUser.image_url : noPersonImg"
                            >
                            </v-img>
                          </v-avatar>
                        </v-col>
                        <v-col
                          cols="7"
                        >
                          <v-list-item-title>
                            {{ CurrentUser.name }}
                          </v-list-item-title>
                          <v-list-item-title :class="{ 'text--secondary': !CurrentUser.prefecture }">
                            {{ CurrentUser.prefecture || '都道府県：未登録' }}
                          </v-list-item-title>
                          <br/>
                          <v-list-item-text :class="{ 'text--secondary': !CurrentUser.profile_text }">
                            {{
                              CurrentUser.profile_text
                                ? (CurrentUser.profile_text.length > 120
                                    ? CurrentUser.profile_text.substring(0, 120) + '...'
                                    : CurrentUser.profile_text)
                                : 'プロフィール文：未登録'
                            }}
                          </v-list-item-text>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-col>
                  <v-col
                    cols="11"
                  >
                    <v-list>
                      <v-list-item
                        to="/products/search"
                        @click="updateProductSearchCondition"
                      >
                        <v-list-item-avatar
                          left
                        >
                          <v-icon>
                            mdi-food-apple
                          </v-icon>
                        </v-list-item-avatar>
                        <v-list-item-title>
                          {{
                            CurrentUser.id === $auth.user.id
                              ? 'あなたの出品した農産物を見る'
                              : CurrentUser.name + 'さんの出品した農産物を見る'
                          }}
                        </v-list-item-title>
                      </v-list-item>

                      <v-list-item
                        to="/posts/search"
                        @click="updatePostSearchCondition"
                      >
                        <v-list-item-avatar
                          left
                        >
                          <v-icon>
                            mdi-file-document
                          </v-icon>
                        </v-list-item-avatar>
                        <v-list-item-title>
                          {{
                            CurrentUser.id === $auth.user.id
                              ? 'あなたの投稿したつぶやきを見る'
                              : CurrentUser.name + 'さんの投稿したつぶやきを見る'
                          }}
                        </v-list-item-title>
                      </v-list-item>

                      <V-list-item
                        to="/communities/search"
                        @click="updateCommunitySearchCondition"
                      >
                        <v-list-item-avatar
                          left
                        >
                          <v-icon>
                            mdi-charity
                          </v-icon>
                        </v-list-item-avatar>
                        <v-list-item-title>
                          {{
                            CurrentUser.id === $auth.user.id
                              ? 'あなたの作成したコミュニティを見る'
                              : CurrentUser.name + 'さんの作成したコミュニティを見る'
                          }}
                        </v-list-item-title>
                      </V-list-item>
                    </v-list>
                  </v-col>
                  <v-col
                    v-show="CurrentUser.id!==$auth.user.id"
                    cols="11"
                  >
                    <v-row
                      justify="center"
                    >
                      <v-btn
                        v-show="!$store.state.user.relationship.followed.some(user => user.id === $auth.user.id)"
                        color="teal"
                        class="white--text mt-6 mb-9 mr-2 font-weight-bold"
                        @click="addRelationship(CurrentUser.id)"
                      >
                        {{ CurrentUser.name }}さんをフォローする
                      </v-btn>
                      <v-btn
                        v-show="$store.state.user.relationship.followed.some(user => user.id === $auth.user.id)"
                        color="teal"
                        class="white--text mt-6 mb-9 mr-2 font-weight-bold"
                        @click="deleteRelationship(CurrentUser.id)"
                      >
                      {{ CurrentUser.name }}さんをフォロー解除する
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
</template>

<script>
import noPersonImg from '~/assets/images/logged-in/noPerson.png'

export default {
  layout: 'mypage',
  middleware: ['get-user-current', 'get-user-relationship'],
  data() {
    return {
      noPersonImg
    }
  },
  computed: {
    CurrentUser() {
      return this.$store.state.user.current
    }
  },
  methods: {
    showNotification(msg, color) {
      this.$store.dispatch('getToast', { msg, color });
    },
    async addRelationship(id) {
      const data = {
        followed_id: id
      };

      try {
        await this.$axios.$post('/api/v1/relationships', data);
        this.showNotification('フォローしました', 'success');

        const relationship = await this.$axios.$get(`/api/v1/relationships/${id}/user_follow_relationships`);
        this.$store.dispatch('getUserRelationship', relationship);
      } catch (error) {
        this.showNotification('フォローできませんでした', 'error');
      }
    },
    async deleteRelationship(id) {
      const data = {
        followed_id: id
      };

      try {
        await this.$axios.$delete('/api/v1/relationships', { data });
        this.showNotification('フォローを解除しました', 'success');

        const relationship = await this.$axios.$get(`/api/v1/relationships/${id}/user_follow_relationships`);
        this.$store.dispatch('getUserRelationship', relationship);
      } catch (error) {
        this.showNotification('フォローを解除できませんでした', 'error');
      }
    },
    updateProductSearchCondition() {
      this.$store.dispatch('updateProductSearchCondition', {
        seller: this.$store.state.user.current.name
      });
    },
    updatePostSearchCondition() {
      this.$store.dispatch('updatePostSearchCondition', {
        poster: this.$store.state.user.current.name
      });
    },
    updateCommunitySearchCondition() {
      this.$store.dispatch('updateCommunitySearchCondition', {
        maker: this.$store.state.user.current.name
      });
    }
  }
}
</script>