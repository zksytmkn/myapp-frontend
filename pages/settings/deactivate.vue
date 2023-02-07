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
              <v-list-item-title>
                アカウント削除
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
                  >
                    <v-list-item>
                      <v-container>
                        <v-list-item-title
                          class="font-weight-bold"
                        >
                            退会前にご確認ください。
                        </v-list-item-title>
                        <v-list-item-text
                          style="white-space:pre-line;"
                        >
                            ※メールアドレスや、プロフィールを変更したい場合は、下記のメニューから変更できます。
                            退会の手続きは必要ありません。引き続きEdibleをお楽しみください。
                        </v-list-item-text>
                      </v-container>
                    </v-list-item>
                  </v-col>
                  <v-col
                    cols="11"
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
                    cols="11"
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
                  <v-col
                    cols="11"
                  >
                    <v-row
                      justify="center"
                    >
                      <v-btn
                        type="submit"
                        :loading="loading"
                        color="red"
                        class="font-weight-bold white--text mb-3"
                        style="text-transform:none;"
                      >
                        Edibleを退会する
                      </v-btn>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
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
