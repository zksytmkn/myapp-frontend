<template>
  <div
    class="mb-3"
  >
    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
          <v-list
            color="transparent"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  class="font-weight-bold"
                >
                  あなたのレジ
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider/>
          <v-list
            v-show="!cartProducts.length"
            color="transparent"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  農産物をカートに入れましょう。
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-action>
                <v-btn
                  class="font-weight-bold"
                  color="orange"
                  outlined
                  dark
                  to="/products/cart"
                >
                  カートを見る
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>

    <v-container
      v-show="cartProducts.length"
      color="transparent"
    >
      <v-row>
        <v-col
          cols="12"
        >
          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    お届け先情報
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider/>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-text>
                    お届け先住所：{{ this.$store.state.user.login.zipcode }}
                    <br/><br/>
                    {{ this.$store.state.user.login.street }}
                    {{ this.$store.state.user.login.building }}
                  </v-list-item-text>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col
          cols="12"
        >
          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    お支払い情報
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider/>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-text>
                    お支払い金額：¥{{ Math.floor(cartTotalPrice).toLocaleString() }}
                  </v-list-item-text>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-text>
                    お支払い方法：クレジットカード
                    <br/><br/>
                    ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
                  </v-list-item-text>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col
          cols="12"
        >
          <v-row
            justify="center"
          >
            <v-btn
              @click="addOrder()"
              class="font-weight-bold mt-6 mb-6 mr-2"
              color="teal"
              dark
            >
              注文を確定する
            </v-btn>
            <v-btn
              class="mt-6 mb-6"
              color="teal"
              to="/products/cart"
              outlined
              dark
            >
              カートに戻る
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware: ['get-cart'],
  computed: mapGetters(['cartProducts','cartTotalPrice']),
  methods: {
    addOrder() {
      const asyncFunc = async() => {
        const formData = new FormData()
        formData.append('user_id', this.$auth.user.id)
        formData.append('billing_amount', Math.floor(this.$store.getters.cartTotalPrice))
        formData.append('status', 'confirm_payment')
        await this.$axios.$post('/api/v1/orders', formData)
        .then(response => console.log(response))
        .catch(error => console.log(error))
        await Promise.all([
          this.$axios.$get(`/api/v1/carts/${this.$auth.user.id}`)
        ])
        .then(response => {
          this.$store.dispatch('getCarts', response[0])
          const msg = '農産物を購入しました'
          const color = 'success'
          return this.$store.dispatch('getToast', { msg, color })
        })
        .catch(error => {
          console.log(error[0])
          const msg = '農産物を購入できませんでした'
          const color = 'error'
          return this.$store.dispatch('getToast', { msg, color })
        })
      }
      asyncFunc().finally(response => console.log(response))
    }
  }
}
</script>


<style lang="scss">
#products {
  .v-parallax__content {
    padding: 0;
  }
}
</style>