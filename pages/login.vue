<template>
  <v-container
    fluid
    fill-height
    style="background-color:white;"
  >
    <user-form-card>
      <template
        #user-form-card-content
      >
        <v-form
          ref="form"
          v-model="isValid"
          @submit.prevent="login"
        >
          <user-form-email
            :email.sync="params.auth.email"
          />
          <user-form-password
            :password.sync="params.auth.password"
          />
          <v-card-actions>
            <nuxt-link
              to="/auth/reset_password"
              class="body-2 text-decoration-none"
            >
              パスワードを忘れた？
            </nuxt-link>
          </v-card-actions>
          <v-card-text
            class="px-0"
          >
            <v-btn
              type="submit"
              :disabled="!isValid || loading"
              :loading="loading"
              block
              color="appblue"
              class="white--text"
            >
              ログインする
            </v-btn>
          </v-card-text>
        </v-form>
      </template>
    </user-form-card>
  </v-container>
</template>

<script>
export default {
  layout: 'before-login',
  data ( { $store } ) {
    return {
      isValid: false,
      loading: false,
      params: { auth: { email: '', password: '' } },
      redirectPath: $store.state.loggedIn.rememberPath,
      loggedInHomePath: $store.state.loggedIn.homePath,
    }
  },
  methods: {
    async login () {
      this.loading = true;
      if (this.isValid) {
        try {
          const response = await this.$axios.$post('/api/v1/auth_token', this.params);
          this.authSuccessful(response);
        } catch (error) {
          this.authFailure(error);
        } finally {
          this.loading = false;
        }
      }
    },
    authSuccessful (response) {
      this.$auth.login(response)
      this.$store.commit('setLoginType', 'user');
      this.$router.push(this.redirectPath)
      // 記憶ルートを初期値に戻す
      this.$store.dispatch('getRememberPath', this.loggedInHomePath)
    },
    authFailure (error) {
      let msg = 'ログインできませんでした';
      const color = 'error';
    
      if (error.response && error.response.status === 404) {
        msg = 'ユーザーが見つかりません';
      }
    
      this.$store.dispatch('getToast', { msg, color });
    }
  }
}
</script>