<template>
  <v-navigation-drawer
    v-model="setDrawer"
    app
    clipped
    :mobile-breakpoint="mobileBreakpoint"
  >
    <v-list>
      <template
        v-if="isMobileBreakpointLessThan"
      >
        <v-list-item
          @click="$emit('update:drawer', false)"
        >
          <v-list-item-content>
            <v-list-item-action-text>
              閉じる
            </v-list-item-action-text>  
          </v-list-item-content>
        </v-list-item>
        <v-divider/>
      </template>

      <v-list-group
        v-for="(nav, i) in navMenus"
        :key="`nav-${i}`"
        no-action
      >
        <template
          v-slot:activator
        >
          <v-list-item-avatar left>
            <v-icon
              :color="nav.color"
            >
              {{ nav.icon }}
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ nav.name }}
            </v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
          v-for="(list, i) in nav.lists"
          :key="`list-${i}`"
          :to="list.link"
        >
          <v-list-item-avatar
            left
          >
            <v-icon>
              {{ list.icon }}
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ list.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            その他
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider/>
      <v-list-item
        v-for="(other, i) in otherMenus"
        :key="`other-${i}`"
        :to="other.link"
      >
        <v-list-item-avatar left>
          <v-icon>
            {{ other.icon }}
          </v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ other.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    drawer: {
      type : Boolean,
      default: null
    }
  },
  data () {
    return {
      mobileBreakpoint: 960,
      navMenus: [
        { name: '農産物', icon: 'mdi-cart', color: '#CC0000',
          lists: [
            {
              name: '一覧',
              icon: 'mdi-text-box-multiple',
              link: '/products/list'
            },
            {
              name: '検索',
              icon: 'mdi-magnify',
              link: '/products/search'
            },
            {
              name: '出品',
              icon: 'mdi-pencil-plus',
              link: '/products/new'
            },
            {
              name: '購入済み',
              icon: 'mdi-cart-off',
              link: '/products/purchased'
            },
            {
              name: 'いいね',
              icon: 'mdi-thumb-up',
              link: '/products/like'
            },
            {
              name: 'おすすめ',
              icon: 'mdi-cards-heart',
              link: '/products/recommend'
            }
          ]
        },
        { name: '農家の呟き', icon: 'mdi-file-document', color: '#336791',
          lists: [
            {
              name: '一覧',
              icon: 'mdi-text-box-multiple',
              link: '/posts/list'
            },
            {
              name: '検索',
              icon: 'mdi-magnify',
              link: '/posts/search'
            },
            {
              name: '投稿',
              icon: 'mdi-pencil-plus',
              link: '/posts/new'
            },
            {
              name: 'いいね',
              icon: 'mdi-thumb-up',
              link: '/posts/like'
            },
            {
              name: 'おすすめ',
              icon: 'mdi-cards-heart',
              link: '/posts/recommend'
            }
          ]
        },
        { name: 'コミュニティ', icon: 'mdi-charity', color: '#00C48D',
          lists: [
            {
              name: '一覧',
              icon: 'mdi-text-box-multiple',
              link: '/communities/list'
            },
            {
              name: '検索',
              icon: 'mdi-magnify',
              link: '/communities/search'
            },
            {
              name: '作成',
              icon: 'mdi-pencil-plus',
              link: '/communities/new'
            },
            {
              name: '参加',
              icon: 'mdi-account',
              link: '/communities/participated'
            },
            {
              name: '招待',
              icon: 'mdi-cards-heart',
              link: '/communities/invited'
            }
          ]
        }
      ],
      otherMenus: [
        { name: 'お知らせ', icon: 'mdi-bell', link: '/settings/information' },
        { name: '設定', icon: 'mdi-cog', link: '/settings/profile' }
      ]
    }
  },
  computed: {
    setDrawer: {
      get () { return this.drawer },
      set (newVal) { return this.$emit( 'update:drawer', newVal) }
    },
    isMobileBreakpointLessThan () {
      const windowWidth = this.$vuetify.breakpoint.width
      return this.mobileBreakpoint > windowWidth
    }
  }
}
</script>