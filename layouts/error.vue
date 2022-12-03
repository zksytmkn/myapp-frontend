<template>
  <v-container
    fill-height
  >
    <v-row>
      <v-col
        cols="12"
      >
        <v-card-title
          class="justify-center"
        >
          {{ error.statusCode }}
        </v-card-title>
        <v-card-text
          class="text-center"
        >
          {{ errorMessage }}
        </v-card-text>
        <v-card-actions
          class="justify-center"
        >
          <v-icon>
            mdi-emoticon-sick-outline
          </v-icon>
        </v-card-actions>
        <v-card-actions
          class="justify-center"
        >
          <v-btn
            icon
            x-large
            color="appblue"
            @click="redirect"
          >
            <v-icon>
              mdi-home
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed: {
    // ログイン前後でリダイレクトパスを切り替える
    redirectPath () {
      const loggedInHomePath = this.$store.state.loggedIn.homePath
      const beforeLoginHomePath = { name: 'index' }
      return this.$auth.loggedIn()
        ? loggedInHomePath : beforeLoginHomePath
    },
    // axiosエラーの場合はstatusTextを参照する
    responsedMessage () {
      return (this.error.response && this.error.response.statusText)
        ? this.error.response.statusText : this.error.message
    },
    // i18nに翻訳パスが存在する場合は日本語翻訳メッセージを返す
    errorMessage () {
      const translationPath = `error.${this.responsedMessage}`
      return this.$te(translationPath)
        ? this.$t(translationPath) : this.responsedMessage
    }
  },
  async created () {
    // 認証エラーの場合はVuexを初期化する(セッションはサーバで削除済み)
    if (this.error.statusCode === 401) {
      await this.$auth.resetVuex()
    }
  },
  methods: {
    // リダイレクトパスが現在のルートと一致している場合はリロードを行う
    redirect () {
      this.redirectPath.name === this.$route.name
        ? this.$router.go() : this.$router.push(this.redirectPath)
    }
  }
}
</script>
