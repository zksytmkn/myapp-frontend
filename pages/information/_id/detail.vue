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
                          <v-col
                            cols="7"
                          >
                            <v-list>
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title
                                    v-show="currentOrder.product.user_id !== $auth.user.id"
                                  >
                                    <nuxt-link
                                      class="text-decoration-none font-weight-bold teal--text"
                                      :to="$my.productLinkToDetail(currentOrder.product_id)"
                                    >
                                      {{ currentOrder.product.name }}
                                    </nuxt-link>
                                    を購入しました。
                                  </v-list-item-title>
                                  <v-list-item-title
                                    v-show="currentOrder.product.user_id === $auth.user.id"
                                  >
                                    <nuxt-link
                                      class="text-decoration-none font-weight-bold teal--text"
                                      :to="$my.userLinkToProfile(currentOrder.order.user_id)"
                                    >
                                      {{ currentOrder.order.user.name }}
                                    </nuxt-link>
                                    さんは、
                                    <br/>
                                    <nuxt-link
                                      class="text-decoration-none font-weight-bold teal--text"
                                      :to="$my.productLinkToDetail(currentOrder.product_id)"
                                    >
                                      {{ currentOrder.product.name }}
                                    </nuxt-link>  
                                    を購入しました。
                                  </v-list-item-title>
                                  <v-list-item-subtitle
                                    class="pt-0 font-weight-bold"
                                    style="white-space:pre-line; line-height:2;"
                                  >
                                    お届け先：〒{{ currentOrder.order.zipcode }}
                                    {{ currentOrder.order.street }} {{ currentOrder.order.building }}
                                    <span
                                      class="black--text"
                                      style="white-space:normal;"
                                      v-show="currentOrder.status==='confirm_payment'"
                                    >
                                      入金済み（出荷待ち）
                                      <v-icon
                                        class="black--text"
                                      >
                                        mdi-credit-card-outline
                                      </v-icon>
                                    </span>
                                    <span
                                      class="black--text"
                                      style="white-space:normal;"
                                      v-show="currentOrder.status==='shipped'"
                                    >
                                      出荷済み（配送待ち）
                                      <v-icon
                                        class="black--text"
                                      >
                                        mdi-package-variant-closed
                                      </v-icon>
                                    </span>
                                    <span
                                      class="black--text"
                                      style="white-space:normal;"
                                      v-show="currentOrder.status==='out_for_delivery'"
                                    >
                                      配送中（配達待ち）
                                      <v-icon
                                        class="black--text"
                                      >
                                        mdi-truck-delivery-outline
                                      </v-icon>
                                    </span>
                                    <span
                                      class="black--text"
                                      style="white-space:normal;"
                                      v-show="currentOrder.status==='delivered'"
                                    >
                                      配達済み
                                      <v-icon
                                        class="black--text"
                                      >
                                        mdi-package-variant-closed-check
                                      </v-icon>
                                    </span>
                                    <br/>
                                    <v-btn
                                      v-show="currentOrder.status==='confirm_payment' && currentOrder.product.user_id === $auth.user.id"
                                      @click="ship(currentOrder.id)"
                                      class="font-weight-bold mt-3"
                                      color="teal"
                                      dark
                                    >
                                      出荷しました
                                    </v-btn>
                                    <v-btn
                                      v-show="currentOrder.status==='shipped' && currentOrder.product.user_id === $auth.user.id"
                                      @click="deliver(currentOrder.id)"
                                      class="font-weight-bold mt-3"
                                      color="teal"
                                      dark
                                    >
                                      配送しました
                                    </v-btn>
                                    <v-btn
                                      v-show="currentOrder.status==='out_for_delivery' && currentOrder.order.user_id === $auth.user.id"
                                      @click="delivered(currentOrder.id)"
                                      class="font-weight-bold mt-3"
                                      color="teal"
                                      dark
                                    >
                                      配達されました
                                    </v-btn>
                                  </v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            cols="11"
                          >
                            <v-divider/>
                            <v-list
                              class="pt-0"
                            >
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-subtitle
                                    class="pt-0 font-weight-bold"
                                    style="white-space:pre-line; line-height:2;"
                                  >
                                    ＊注文内容
                                    ¥{{ currentOrder.price.toLocaleString() }} × {{ currentOrder.quantity }}
                                    小計（税込）：¥{{ Math.floor(currentOrder.product.price * currentOrder.quantity * 1.1).toLocaleString() }}
                                    注文日：{{ dateFormat(currentOrder.created_at) }}
                                  </v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list>
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
  methods: {
    ship(id) {
      const asyncFunc = async() => {
        const formData = new FormData()
        formData.append('status', 'shipped')
        await this.$axios.$patch(`/api/v1/orders/${id}`, formData)
        .then(response => console.log(response))
        .catch(error => console.log(error))
        await this.$axios.$get(`/api/v1/orders/${id}`)
        .then(order => this.$store.dispatch('getCurrentOrder', order))
      }
      asyncFunc().finally(response => console.log(response))
    },
    deliver(id) {
      const asyncFunc = async() => {
        const formData = new FormData()
        formData.append('status', 'out_for_delivery')
        await this.$axios.$patch(`/api/v1/orders/${id}`, formData)
        .then(response => console.log(response))
        .catch(error => console.log(error))
        await this.$axios.$get(`/api/v1/orders/${id}`)
        .then(order => this.$store.dispatch('getCurrentOrder', order))
      }
      asyncFunc().finally(response => console.log(response))
    },
    delivered(id) {
      const asyncFunc = async() => {
        const formData = new FormData()
        formData.append('status', 'delivered')
        await this.$axios.$patch(`/api/v1/orders/${id}`, formData)
        .then(response => console.log(response))
        .catch(error => console.log(error))
        await this.$axios.$get(`/api/v1/orders/${id}`)
        .then(order => this.$store.dispatch('getCurrentOrder', order))
      }
      asyncFunc().finally(response => console.log(response))
    }
  },
  computed: {
    currentOrder() {
      const copyCurrentOrder = this.$store.state.order.current
      return copyCurrentOrder
    },
    currentOrderProduct() {
      const copyCurrentOrderProduct = Array.from(this.$store.state.product.list.filter(product => product.id === this.$store.state.order.current.product_id))
      return copyCurrentOrderProduct
    },
    dateFormat() {
      return (date) => {
        const dateTimeFormat = new Intl.DateTimeFormat(
          'ja', { dateStyle: 'medium' }
        )
        return dateTimeFormat.format(new Date(date))
      }
    }
  }
}
</script>