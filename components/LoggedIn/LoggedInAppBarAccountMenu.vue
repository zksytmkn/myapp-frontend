<template>
  <v-menu
    app
    offset-x
    offset-y
    max-width="200"
  >
    <template
      #activator="{ on }"
    >
      <v-btn
        icon
        v-on="on"
      >
        <v-icon>
          mdi-account-circle
        </v-icon>
      </v-btn>
    </template>
    <v-list
      dense
    >
      <v-subheader>
        ログイン中のユーザー
      </v-subheader>

      <v-list-item>
        <v-list-item-subtitle>
          {{ $auth.user.name }}
        </v-list-item-subtitle>
      </v-list-item>

      <v-divider/>

      <v-subheader>
        アカウント
      </v-subheader>

      <v-list-item
        :to="$my.userLinkToProfile($auth.user.id)"
      >
        <v-list-item-icon
          class="mr-2"
        >
          <v-icon
            size="22"
          >
            mdi-home
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          プロフィール
        </v-list-item-title>
      </v-list-item>
      <v-list-item
        to="/settings/profile"
      >
        <v-list-item-icon
          class="mr-2"
        >
          <v-icon
            size="22"
          >
            mdi-account-cog
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          プロフィール編集
        </v-list-item-title>
      </v-list-item>
      <v-list-item
        @click="logout"
      >
        <v-list-item-icon
          class="mr-2"
        >
          <v-icon
            size="22"
          >
            mdi-logout-variant
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          ログアウト
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  methods: {
    async logout() {
      try {
        await this.$auth.logout()
        // ログアウト成功のトーストメッセージを表示
        this.$store.dispatch('getToast', {
          msg: 'ログアウトしました',
          color: 'success',
        })
        this.$router.push('/')
      } catch (error) {
        // ログアウト失敗のトーストメッセージを表示
        this.$store.dispatch('getToast', {
          msg: 'ログアウトできませんでした',
          color: 'error',
        })
      }
    },
  },
}
</script>
