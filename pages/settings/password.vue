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
            @submit.prevent="editPassword"
          >
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  パスワード変更
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
                      <user-form-password
                        label="現在のパスワード"
                        :password.sync="inputted.current_password"
                      />
                    </v-col>
                    <v-col
                      cols="11"
                    >
                      <user-form-password
                        label="新しいパスワード [8文字以上]"
                        :password.sync="inputted.password"
                      />
                    </v-col>
                    <v-col
                      cols="11"
                    >
                      <user-form-password
                        label="新しいパスワード(確認)"
                        :password.sync="inputted.password_confirmation"
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
      inputted: { current_password: '', password: '', password_confirmation: '' }
    }
  },
  methods: {
    async editPassword() {
      this.loading = true;
    
      if (!this.isValid) {
        this.loading = false;
        return;
      }
    
      if (this.inputted.password !== this.inputted.password_confirmation) {
        const msg = '新しいパスワードと確認用パスワードが一致しません';
        const color = 'error';
        this.$store.dispatch('getToast', { msg, color });
        this.loading = false;
        return;
      }
    
      try {
        const data = {
          password: this.inputted.password,
          current_password: this.inputted.current_password
        };
    
        await this.$axios.$patch("/api/v1/users/update_password", data)
    
        const msg = 'パスワードを変更しました';
        const color = 'success';
        this.$store.dispatch('getToast', { msg, color });
    
        const response = await this.$axios.$post('/api/v1/auth_token/refresh');
        this.$auth.login(response);
      } catch (error) {
        const msg = error.response.data.message || '現在のパスワードが間違っております';
        const color = 'error';
        this.$store.dispatch('getToast', { msg, color });
      } finally {
        this.loading = false;
      }
    },
    formReset() {
      this.sentIt = false;
      this.$refs.edit.reset();
    }
  }
}
</script>
