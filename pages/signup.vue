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
          @submit.prevent="signup"
        >
          <user-form-name
            :name.sync="params.user.name"
          />
          <user-form-email
            :email.sync="params.user.email"
            placeholder
          />
          <user-form-password
            :password.sync="params.user.password"
            set-validation
          />
          <v-btn
            type="submit"
            :disabled="!isValid || loading"
            :loading="loading"
            block
            color="appblue"
            class="white--text"
            @click="signup"
          >
            登録する
          </v-btn>
          <v-btn
            block
            class="mt-6 font-weight-bold white--text"
            color="orange"
            @click="guestLogin"
          >
            ゲストログインする
          </v-btn>
          <v-container
            class="text-center grey--text"
          >
            <small>
              ＊こちらは上記を入力せずにご利用いただけます。
            </small>
          </v-container>
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
      params: { user: { name: '', email: '', password: '' } },
      redirectPath: $store.state.loggedIn.rememberPath
    }
  },
  methods: {
    async signup() {
      this.loading = true;
      if (this.isValid) {
        const data = {
          name: this.params.user.name,
          email: this.params.user.email,
          password: this.params.user.password
        };
        await this.$axios
          .$post("api/v1/users", data)
          .then(response => {
            // eslint-disable-next-line no-console
            console.log(response);
            const msg = "メールアドレスに確認メールを送信しました";
            const color = "success";
            return this.$store.dispatch("getToast", { msg, color });
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.log(error);
            const msg = "ユーザー登録ができませんでした";
            const color = "error";
            return this.$store.dispatch("getToast", { msg, color });
          });
      }
      this.loading = false;
    },
    formReset() {
      this.$refs.form.reset()
      for (const key in this.params.user) {
        this.params.user[key] = ''
      }
    },
    async guestLogin() {
      await this.$axios.$post('/api/v1/guest_sessions')
        .then(response => {
          this.$axios.$post('/api/v1/auth_token', response)
            .then(response => this.authSuccessful(response))
            .catch(error => this.authFailure(error))
        })
    },
    authSuccessful (response) {
      this.$auth.login(response)
      this.$router.push(this.redirectPath)
      const msg = 'ゲストログインしました'
      const color = 'success'
      return this.$store.dispatch('getToast', { msg, color })
    },
    authFailure ({ response }) {
      if (response) {
        const msg = 'ゲストログインできませんでした'
        const color = 'error'
        return this.$store.dispatch('getToast', { msg, color })
      }
    }
  }
}
</script>