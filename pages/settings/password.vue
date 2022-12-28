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
          <v-list
            color="transparent"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  パスワード変更
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider/>
            <v-list-item>
              <v-list-item-content>
                <v-row
                  justify="center"
                >
                  <v-col
                    cols="12"
                  >
                    <user-form-password
                      label="現在のパスワード"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <user-form-password
                      label="パスワード [8文字以上]"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <user-form-password
                      label="パスワード(確認)"
                    />
                  </v-col>
                  <v-btn
                    type="submit"
                    :disabled="!isValid || loading"
                    :loading="loading"
                    color="appblue"
                    class="white--text"
                  >
                    変更
                  </v-btn>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'logged-in',
  data ( { $store } ) {
    return {
      params: { auth: { email: '', password: '' } }
    }
  }
}
</script>