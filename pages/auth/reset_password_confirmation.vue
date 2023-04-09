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
        @submit.prevent="resetPassword"
      >
        <input v-model="params.token" type="hidden" />
        <user-form-password
          :password.sync="params.password"
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
              新しいパスワードを設定する
            </v-btn>
          </v-card-text>
        </v-form>
      </template>
    </user-form-card>
  </v-container>
</template>

<script>
import { isPasswordValid } from "@/utils/passwordValidator.js"
import UserFormPassword from "@/components/User/UserFormPassword.vue"

export default {
  components: {
    UserFormPassword,
  },
  layout: 'before-login',
  data() {
    return {
      isValid: false,
      loading: false,
      params: { token: "", password: "" },
    };
  },
  created() {
    if (this.$route.query.token) {
      this.params.token = this.$route.query.token;
    }
  },
  methods: {
    async resetPassword() {
      if (!isPasswordValid(this.params.password)) {
        const msg = "パスワードが弱すぎます。もう一度お試しください。";
        const color = "error";
        this.$store.dispatch("getToast", { msg, color });
        return;
      }
      this.loading = true;
      if (this.isValid) {
        await this.$axios
          .$put("/api/v1/users/reset_password", this.params)
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
      this.$router.push("/login");
    },
    handleError(error) {
      if (error.response && error.response.status === 422) {
        const msg = "リンクが無効か、期限切れです";
        const color = "error";
        this.$store.dispatch("getToast", { msg, color });
      } else {
        const msg = "エラーが発生しました。もう一度お試しください。";
        const color = "error";
        this.$store.dispatch("getToast", { msg, color });
      }
    },
  },
};
</script>
