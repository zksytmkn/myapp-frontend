<template>
  <v-container class="mt-12">
    <v-row>
      <setting-menu />
      <v-col cols="9">
        <v-card flat rounded="lg">
          <v-list>
            <v-list-item>
              <v-list-item-title>アカウント削除</v-list-item-title>
            </v-list-item>
            <v-divider />
            <v-list-item>
              <v-container>
                <v-row justify="center">
                  <v-col cols="11">
                    <v-list-item>
                      <v-container>
                        <v-list-item-title class="font-weight-bold">
                          退会前にご確認ください。
                        </v-list-item-title>
                        <v-list-item-text style="white-space: pre-line;">
                          ＊プロフィールやメールアドレスを変更したい場合は、下記のメニューから変更できます。 退会の手続きは必要ありません。引き続きEdibleをお楽しみください。
                        </v-list-item-text>
                      </v-container>
                    </v-list-item>
                  </v-col>
                  <v-col cols="11">
                    <v-list-item v-for="(set, i) in setMenus" :key="`set-${i}`" :to="set.link">
                      <v-list-item-avatar left>
                        <v-icon>{{ set.icon }}</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-title>{{ set.name }}</v-list-item-title>
                    </v-list-item>
                  </v-col>
                  <v-col cols="11">
                    <v-list-item-title>
                      <div class="red--text">
                        ＊Edibleを退会すると、これまでに登録したデータなどが失われ、元に戻すことはできません。
                      </div>
                    </v-list-item-title>
                  </v-col>
                  <v-col cols="11">
                    <v-row justify="center">
                      <v-col cols="auto">
                        <v-list-item>
                          <v-btn :loading="loading" color="red" class="font-weight-bold white--text mb-3" style="text-transform:none;" @click="deleteUser">
                            Edibleを退会する
                          </v-btn>
                        </v-list-item>
                      </v-col>
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
export default {
  layout: 'logged-in',
  data () {
    return {
      setMenus: [
        { name: 'プロフィール編集', icon: 'mdi-account-edit', link: '/settings/profile' },
        { name: 'パスワード変更', icon: 'mdi-lock', link: '/settings/password' },
        { name: 'メールアドレス変更', icon: 'mdi-email', link: '/settings/email' },
        { name: '住所編集', icon: 'mdi-map-marker', link: '/settings/address' }
      ]
    }
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
    deleteUser() {
      const userId = this.$auth.user.id;
      const action = () => this.$axios.$delete(`/api/v1/users/${userId}`);
      const successMsg = 'アカウントを削除しました';
      const errorMsg = 'アカウントを削除できませんでした';
      const successCallback = () => {
        this.$router.push('/logout');
      };
    
      this.processResponse(action, successMsg, errorMsg, successCallback);
    }
  }
}
</script>
