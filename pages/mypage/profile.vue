<template>
  <v-col
    cols="3"
  >
    <v-sheet
      rounded="lg"
    >
      <v-list
        color="transparent"
      >
        <v-list-item>
          <v-list-item-title>
            マイページ
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
          <v-list-item-content>
            <v-list-item-title>
              {{ set.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-col>
</template>

<script>
export default {
  layout: 'logged-in',
  data () {
    return {
      setMenus: [
        { name: 'プロフィール', icon: 'mdi-account', link: '/mypage/profile' },
        { name: 'フォロー', icon: 'mdi-account-arrow-right', link: '/mypage/following' },
        { name: 'フォロワー', icon: 'mdi-account-arrow-left', link: '/mypage/followed' },
      ]
    }
  }
}
</script>