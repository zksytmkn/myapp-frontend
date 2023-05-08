<template>
  <div>
    <v-container
      class="mt-12"
    >
      <v-row>
        <info-menu />
        <v-col
          cols="9"
        >
          <v-card
            flat
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
                v-show="!orderDetails.length"
              >
                <v-list-item-title>
                  該当する注文はありませんでした。
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                v-for="(orderDetail, i) in orderDetails.slice(pageSize * (page - 1), pageSize * page)"
                :key="`orderDetail-${i}`"
                :to="$my.informationLinkToDetail(orderDetail.id)"
              >
                <v-list-item-avatar left>
                  <v-icon>
                    mdi-information-variant
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-title>
                  {{ orderDetail.product.name }}を購入しました。
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-pagination
      v-show="orderDetails.length"
      v-model="page"
      class="my-6"
      :length="Math.ceil(orderDetails.length/pageSize)"
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
    orderDetails () {
      const copyOrderDetails = Array.from(this.$store.state.order.list.buyer)
      return copyOrderDetails.sort((a, b) => {
        if (a.created_at > b.created_at) { return -1 }
        if (a.created_at < b.created_at) { return 1 }
        return 0
      })
    }
  }
}
</script>