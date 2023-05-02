<template>
  <v-container
    fluid
    fill-height
    style="background-color:white;"
  >
    <v-row>
      <v-col
        cols="12"
      >
        <v-card
          flat
        >
          <v-card-title
            class="justify-center display-1"
          >
            お問い合わせ
          </v-card-title>
          <v-row
            justify="center"
          >
            <v-col
              cols="12"
              sm="10"
              md="8"
              class="mb-10"
            >
              <v-form
                ref="contact"
                v-model="isValid"
              >
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        :disabled="sentIt"
                        label="名前(必須)"
                        outlined
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        :disabled="sentIt"
                        label="メールアドレス(必須)"
                        outlined
                        validate-on-blur
                      />
                    </v-col>
                  </v-row>

                  <v-textarea
                    v-model="content"
                    :rules="contentRules"
                    :disabled="sentIt"
                    label="お問い合わせの内容をお聞かせください(必須)"
                    rows="5"
                    outlined
                    auto-grow
                  />
        
                  <v-btn
                    :disabled="!isValid || loading || sentIt"
                    :loading="loading"
                    color="primary"
                    class="mr-2"
                    @click="onSend"
                  >
                    送信する
                  </v-btn>
        
                  <v-btn
                    text
                    @click="formReset"
                  >
                    キャンセル
                  </v-btn>
                </v-container>
              </v-form>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'before-login',
  data () {
    return {
      isValid: false,
      name: '',
      nameRules: [
        v => !!v || '名前を入力してください'
      ],
      email: '',
      emailRules: [
        v => !!v || 'メールアドレスを入力してください',
        v => /.+@.+\..+/.test(v) || 'メールアドレスが正しくありません'
      ],
      content: '',
      contentRules: [
        v => !!v || 'お問い合わせ内容を入力してください'
      ],
      loading: false,
      sentIt: false
    }
  },
  methods: {
    onSend () {
      this.loading = true
      this.$axios.post('/api/v1/contacts', {
        name: this.name,
        email: this.email,
        content: this.content
      }).then(() => {
        this.loading = false
        this.sentIt = true
        const msg = 'お問い合わせ内容が送信されました。メールアドレスへ担当者よりご連絡いたします。'
        const color = 'success'
        this.$store.dispatch('getToast', { msg, color })
      }).catch((error) => {
        this.loading = false
        const msg = `お問い合わせの送信中にエラーが発生しました: ${error.message}`
        const color = 'error'
        this.$store.dispatch('getToast', { msg, color })
      })
    },
    formReset () {
      this.sentIt = false
      this.$refs.contact.reset()
    }
  }
}
</script>
