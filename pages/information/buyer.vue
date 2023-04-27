<template>
  <div>
    <v-container
      class="mt-3"
    >
      <v-row>
        <info-menu />
        <v-col
          cols="9"
        >
          <v-sheet
            rounded="lg"
          >
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  注文（購入）
                </v-list-item-title>
              </v-list-item>

              <v-divider/>
              <v-list-item
                v-show="!orderMenus.length"
              >
                <v-list-item-title>
                  該当する注文はありませんでした。
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                v-for="(order, i) in orderMenus.slice(pageSize*(page-1),pageSize*(page))"
                :key="`order-${i}`"
                :to="$my.informationLinkToDetail(order.id)"
              >
                <v-list-item-avatar
                  left
                >
                  <v-icon>
                    mdi-information-variant
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-title>
                  {{ order.product.name }}を購入しました。
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>

    <v-pagination
      v-show="orderMenus.length"
      v-model="page"
      class="my-6"
      :length="Math.ceil(orderMenus.length/pageSize)"
      circle
    >
    </v-pagination>
  </div>
</template>

<script>
import InfoMenu from '~/components/Information/InfoMenu'

export default {
  components: {
    InfoMenu
  },
  layout:"logged-in",
  data () {
    return {
      page: 1,
      pageSize: 10
    }
  },
  computed: {
    orderMenus () {
      const copyOrderMenus = Array.from(this.$store.state.order.list.buyer)
      return copyOrderMenus.sort((a, b) => {
        if (a.created_at > b.created_at) { return -1 }
        if (a.created_at < b.created_at) { return 1 }
        return 0
      })
    }
  }
}
</script>