<template>
  <v-container class="mt-12">
    <v-row>
      <mypage-menu />
      <v-col cols="9">
        <v-card flat rounded="lg">
          <v-list>
            <v-list-item>
              <v-list-item-title>あなたの個人情報</v-list-item-title>
            </v-list-item>

            <v-divider />

            <v-list-item>
              <v-container>
                <v-row>
                  <v-col cols="11">
                    <v-list>
                      <v-list-item>
                        <v-list-item-subtitle>
                          ＊このページは他ユーザーには表示されません
                        </v-list-item-subtitle>
                      </v-list-item>
                    </v-list>
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>
                          メールアドレス：<br /><br />
                          {{ $auth.user.email }}
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                    <v-list class="mt-3">
                      <v-list-item>
                        <v-list-item-title>
                          <template v-if="$auth.user.zipcode && $auth.user.street && $auth.user.building">
                            住所：<br /><br />
                            {{ $auth.user.zipcode }}<br /><br />
                            {{ $auth.user.street }}
                            {{ $auth.user.building }}
                          </template>
                          <template v-else>
                            <span class="text--secondary">住所：未登録</span>
                          </template>
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                    <v-list class="mt-3">
                      <v-list-item>
                        <v-list-item-title>
                          お支払い：<br /><br />
                          クレジットカード<br /><br />
                          ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
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
export default {
  layout: 'logged-in'
}
</script>