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
          @submit.prevent="forgotPassword"
        >
          <user-form-email
            :email.sync="params.email"
          />
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
              パスワードリセットメールを送信
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
  data() {
    return {
      isValid: false,
      loading: false,
      params: { email: "" },
    };
  },
  methods: {
    async forgotPassword() {
      this.loading = true;
      if (this.isValid) {
        await this.$axios
          .$post("/api/v1/users/send_password_reset_email", this.params)
          .then((response) => this.handleSuccess(response))
          .catch((error) => this.handleError(error));
      }
      this.loading = false;
    },
    handleSuccess(response) {
      this.$store.dispatch("getToast", {
        msg: response.message,
        color: "success",
      });
    },
    handleError(error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        const msg = "メールアドレスが見つかりません";
        const color = "error";
        this.$store.dispatch("getToast", { msg, color });
      } else {
        const msg = "エラーが発生しました。もう一度お試しください。";
        const color = "error";
        this.$store.dispatch("getToast", { msg, color });
      }
    }
  },
};
</script>
