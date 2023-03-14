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
              to="/auth/forget-password"
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
      this.loading = true
      if (this.isValid) {
        await this.$axios.$post('/api/v1/auth_token', this.params)
          .then(response => this.authSuccessful(response))
          .catch(error => this.authFailure(error))
      }
      this.loading = false
    },
    authSuccessful (response) {
      this.$auth.login(response)
      this.$router.push(this.redirectPath)
      // 記憶ルートを初期値に戻す
      this.$store.dispatch('getRememberPath', this.loggedInHomePath)
    },
    authFailure ({ response }) {
      if (response && response.status === 404) {
        const msg = 'ユーザーが見つかりません'
        const color = 'error'
        return this.$store.dispatch('getToast', { msg, color })
      }
      return this.$my.apiErrorHandler(response)
    }
  },
  mounted: function() {
    console.log('aaa')
    console.log(document.referrer)
    if (document.referrer.match(/mail/)) {
      const msg = 'アカウントが有効化されました'
      const color = 'success'
      return this.$store.dispatch('getToast', { msg, color })
    }
  }
}
</script>