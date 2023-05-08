<template>
  <v-col
    cols="3"
  >
    <v-card
      flat
      rounded="lg"
    >
      <v-list>
        <v-list-item>
          <v-list-item-title>
            お知らせ
          </v-list-item-title>
        </v-list-item>

        <v-divider/>
        <v-list-item
          v-for="(info, i) in infoMenus"
          :key="`info-${i}`"
          :to="info.link"
        >
          <v-list-item-avatar
            left
          >
            <v-icon>
              {{ info.icon }}
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-title>
            {{ info.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-col>
</template>

<script>
export default {
  layout:"logged-in",
  data () {
    return {
      infoMenus: [
        { name: '注文（購入）', icon: 'mdi-file-outline', link: '/information/buyer' },
        { name: '注文（販売）', icon: 'mdi-file', link: '/information/seller' },
        { name: '注文（完了）', icon: 'mdi-file-check', link: '/information/close' }
      ]
    }
  }
}
</script>
