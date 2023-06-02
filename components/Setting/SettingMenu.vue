<template>
  <v-col
    md="3"
    sm="12"
  >
    <v-card
      flat
      rounded="lg"
    >
      <v-list>
        <v-list-item>
          <v-list-item-title>
            設定
          </v-list-item-title>
        </v-list-item>

        <v-divider/>
        <v-list-item
          v-for="(set, i) in setMenus"
          :key="`set-${i}`"
          :to="set.link"
        >
          <v-list-item-avatar
            left
          >
            <v-icon>
              {{ set.icon }}
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-title>
            {{ set.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-col>
</template>

<script>
export default {
  data () {
    return {
      setMenus: [
        { name: 'プロフィール編集', icon: 'mdi-account-edit', link: '/settings/profile' },
        { name: 'パスワード変更', icon: 'mdi-lock', link: '/settings/password' },
        { name: 'メールアドレス変更', icon: 'mdi-email', link: '/settings/email' },
        { name: '住所編集', icon:'mdi-map-marker', link: '/settings/address' },
        { name: '退会する', icon: 'mdi-account-remove', link: '/settings/deactivate' }
      ]
    }
  }
}
</script>
