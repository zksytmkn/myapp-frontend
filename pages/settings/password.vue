<template>
  <v-container>
    <v-row>
      <setting-menu />
      <v-col
        cols="9"
      >
        <v-sheet
          rounded="lg"
        >
          <v-form
            ref="edit"
            v-model="isValid"
            @submit.prevent="editProfile($store.state.user.current.id)"
          >
            <v-list
              color="transparent"
            >
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
                      />
                    </v-col>
                    <v-col
                      cols="11"
                    >
                      <user-form-password
                        label="パスワード [8文字以上]"
                      />
                    </v-col>
                    <v-col
                      cols="11"
                    >
                      <user-form-password
                        label="パスワード(確認)"
                        :disabled="sentIt"
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
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'logged-in',
  data () {
    return {
      isValid: false,
      loading: false,
      params: { auth: { email: '', password: '' } }
    }
  },
  methods: {
    async editPassword(id) {
      this.loading = true
      if (this.isValid) {
        await this.$axios
      }
      this.loading = false
    },
    formReset() {
      this.sentIt = false
      this.$refs.edit.reset()
    }
  }
}
</script>