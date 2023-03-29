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
            <v-list
              color="transparent"
            >
              <v-list-item>
                <v-list-item-title>
                  注文（販売）
                </v-list-item-title>
              </v-list-item>

              <v-divider/>
              <v-list-item
                v-show="!orderMenus.length"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    該当する注文はありませんでした。
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                v-for="(order, i) in orderMenus.slice(this.pageSize*(this.page-1),this.pageSize*(this.page))"
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
                  {{ order.product.name }}が購入されました。
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>

    <v-pagination
      class="my-6"
      v-model="page"
      v-show="orderMenus.length"
      :length="Math.ceil(this.orderMenus.length/this.pageSize)"
      circle
    >
    </v-pagination>
  </div>
</template>

<script>
import InfoMenu from '~/components/Information/InfoMenu'

export default {
  layout:"logged-in",
  components: {
    InfoMenu
  },
  data () {
    return {
      page: 1,
      pageSize: 10
    }
  },
  computed: {
    orderMenus () {
      const copyOrderMenus = Array.from(this.$store.state.order.list.seller)
      return copyOrderMenus.sort((a, b) => {
        if (a.created_at > b.created_at) { return -1 }
        if (a.created_at < b.created_at) { return 1 }
        return 0
      })
    }
  }
}
</script>