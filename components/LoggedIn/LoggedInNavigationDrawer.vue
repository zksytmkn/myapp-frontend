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
          <v-list-item-action>
            <v-list-item-action-text>
              閉じる
            </v-list-item-action-text>  
          </v-list-item-action>
        </v-list-item>
        <v-divider/>
      </template>

      <v-list-group
        v-for="(nav, i) in navMenus"
        :key="`nav-${i}`"
        no-action
      >
        <template
          #activator
        >
          <v-list-item-avatar
            left
          >
            <v-icon>
              {{ nav.icon }}
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-title>
            {{ nav.name }}
          </v-list-item-title>
        </template>
        <v-list-item
          v-for="(list, j) in nav.lists"
          :key="`list-${j}`"
          :to="list.link"
        >
          <v-list-item-avatar
            left
          >
            <v-icon>
              {{ list.icon }}
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-title>
            {{ list.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list-group>
      <v-list-item>
        <v-list-item-title>
          その他
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
      <v-list-item
        v-for="(other, k) in otherMenus"
        :key="`other-${k}`"
        :to="other.link"
      >
        <v-list-item-avatar
          left
        >
          <v-icon>
            {{ other.icon }}
          </v-icon>
        </v-list-item-avatar>
        <v-list-item-title>
          {{ other.name }}
        </v-list-item-title>
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
      mobileBreakpoint: 1200,
      navMenus: [
        { name: '農産物', icon: 'mdi-food-apple',
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
              link: '/products/ordered'
            },
            {
              name: 'いいね',
              icon: 'mdi-thumb-up',
              link: '/products/like'
            }
          ]
        },
        { name: 'つぶやき', icon: 'mdi-file-document',
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
            }
          ]
        },
        { name: 'コミュニティ', icon: 'mdi-charity',
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
        { name: 'お知らせ', icon: 'mdi-bell', link: '/information/buyer' },
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