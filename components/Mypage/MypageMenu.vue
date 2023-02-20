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
          <v-list-item-content>
            <v-list-item-title>
              マイページ
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider/>

        <v-list-item
          v-for="(mypage, i) in mypageMenus"
          :key="`mypage-${i}`"
          :to="mypage.link"
        >
          <v-list-item-avatar
            left
          >
            <v-icon>
              {{ mypage.icon }}
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-title>
            {{ mypage.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-col>
</template>

<script>
export default {
  data () {
    return {
      mypageMenus: [
        { name: 'プロフィール', icon: 'mdi-account', link: '/mypage/profile' },
        { name: 'フォロー', icon: 'mdi-account-arrow-right', link: '/mypage/following' },
        { name: 'フォロワー', icon: 'mdi-account-arrow-left', link: '/mypage/followed' },
        { name: '住所＆お支払い', icon: 'mdi-credit-card-marker-outline', link: '/mypage/address_payment' }
      ]
    }
  }
}
</script>