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
                  詳細
                </v-list-item-title>
              </v-list-item>

              <v-divider/>
              <v-list-item>
                <v-container>
                  <v-row
                    justify="center"
                  >
                    <v-col
                      cols="11"
                      class="mt-9"
                    >
                      <v-container>
                        <v-row
                          align="center"
                        >
                          <v-col
                            cols="5"
                          >
                            <v-img
                              :src="currentOrderProduct.image_url ? currentOrderProduct.image_url : noImg"
                            >
                            </v-img>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-col>
                  </v-row>
                </v-container>
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import InfoMenu from '~/components/Information/InfoMenu'
import noImg from '~/assets/images/logged-in/no.png'

export default {
  layout:"logged-in",
  middleware: 'get-order-current',
  components: {
    InfoMenu
  },
  data () {
    return {
      noImg
    }
  },
  computed: {
    currentOrder() {
      const copyCurrentOrder = Array.from(this.$store.state.orders.current.orderDetail)
      return copyCurrentOrder
    },
    currentOrderProduct() {
      const copyCurrentOrder = Array.from(this.$store.state.product.list.filter(product => product.id === this.$store.state.order.current.product_id))
      return copyCurrentOrder
    }
  }
}
</script>