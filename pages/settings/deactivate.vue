<template>
  <v-container>
    <v-row>
      <setting-menu />
      <v-col
        cols="9"
      >
        <v-sheet
          rounded="lg"
        >
          <v-list
            color="transparent"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  アカウント削除
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider/>
            <v-list-item>
              <v-list-item-content>
                <v-row justify="center">
                  <v-col
                    cols="12"
                  >
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          <div class="font-weight-bold">
                            退会前にご確認ください。
                          </div>
                          <br>
                          <div style="white-space:pre-line;">
                            ※メールアドレスや、プロフィールを変更したい場合は、下記のメニューから変更できます。
                            退会の手続きは必要ありません。引き続きEdibleをお楽しみください。
                          </div>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-list-item
                      v-for="(set, i) in setMenus"
                      :key="`set-${i}`"
                      :to="set.link"
                    >
                      <v-list-item-avatar
                        left
                      >
                        <v-icon>
                          {{ set.icon }}
                        </v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ set.name }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          <div class="red--text">
                            ※Edibleを退会すると、これまでに登録したデータなどが失われ、元に戻すことはできません。
                          </div>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-btn
                    type="submit"
                    :loading="loading"
                    color="red"
                    class="white--text"
                  >
                    退会する
                  </v-btn>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'logged-in',
  data () {
    return {
      setMenus: [
        { name: 'プロフィール編集', icon: 'mdi-account-edit', link: '/settings/profile' },
        { name: 'パスワード変更', icon: 'mdi-lock', link: '/settings/password' },
        { name: 'メールアドレス変更', icon: 'mdi-email', link: '/settings/email' }
      ]
    }
  }
}
</script>
