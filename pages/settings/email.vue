<template>
  <v-container
    class="mt-12"
  >
    <v-row>
      <setting-menu />
      <v-col
        cols="9"
      >
        <v-card
          flat
          rounded="lg"
        >
          <v-form
            ref="edit"
            v-model="isValid"
            @submit.prevent="editEmail"
          >
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  メールアドレス変更
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
                      class="mt-6"
                    >
                      <user-form-email
                        label="メールアドレス"
                        :email.sync="inputted.email"
                      />
                      <user-form-password
                        label="現在のパスワード"
                        :password.sync="inputted.password"
                      />
                    </v-col>
                    <v-col
                      cols="11"
                    >
                      <v-row
                        justify="center"
                      >
                        <v-btn
                          type="submit"
                          :disabled="!isValid || loading"
                          :loading="loading"
                          color="appblue"
                          class="white--text mt-3 mb-3 mr-2"
                        >
                          変更する
                        </v-btn>

                        <v-btn
                          text
                          class="mt-3"
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
</template>

<script>
export default {
  data () {
    return {
      isValid: false,
      loading: false,
      inputted: { email: '', password: '' }
    }
  },
  methods: {
    async editEmail() {
      this.loading = true;

      if (this.isValid) {
        try {
          const data = {
            email: this.inputted.email,
            current_password: this.inputted.password
          };

          await this.$axios.$post('/api/v1/users/send_email_reset_confirmation', data);

          this.$store.dispatch('getToast', { msg: 'メールアドレスに確認メールを送信しました', color: 'success' });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
          let errorMsg = 'メールアドレスを変更できませんでした';
          if (error.response && error.response.data && error.response.data.error) {
            errorMsg = error.response.data.error;
          }
          this.$store.dispatch('getToast', { msg: errorMsg, color: "error" });
        }
      }
    },
    formReset() {
      this.sentIt = false;
      this.$refs.edit.reset();
    }
  }
}
</script>
