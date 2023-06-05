<template>
  <div>
    <v-container>
      <v-list-item>
        <v-list-item-title
          class="font-weight-bold"
        >
          あなたのレジ
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
      <v-list
        v-show="!cartProducts.length"
        color="transparent"
      >
        <v-list-item>
          <v-list-item-title>
            農産物をカートに入れましょう。
          </v-list-item-title>
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
    </v-container>

    <v-container
      v-show="cartProducts.length"
    >
      <v-row>
        <v-col
          cols="12"
        >
          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  お届け先
                </v-list-item-title>
              </v-list-item>
            </v-list>
            <v-divider/>
            <v-list>
              <v-list-item>
                <v-list-item-text>
                  お届け先住所：〒{{ $auth.user.zipcode }}
                </v-list-item-text>
              </v-list-item>
              <v-list-item>
                <v-list-item-text>
                  {{ $auth.user.street }}
                  {{ $auth.user.building }}
                </v-list-item-text>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-title>お支払い</v-list-item-title>
              </v-list-item>
            </v-list>
            <v-divider />
            <v-list>
              <v-list-item>
                <v-list-item-text>
                  お支払い金額：¥{{ Math.floor(cartTotalPrice).toLocaleString() }}
                </v-list-item-text>
              </v-list-item>
              <v-list-item>
                <v-list-item-text>
                  お支払い方法：クレジットカード
                </v-list-item-text>
              </v-list-item>
              <v-list-item>
                <v-list-item-text>
                  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
                </v-list-item-text>
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
              class="font-weight-bold mt-6 mb-6 mr-2"
              color="teal"
              dark
              @click="addOrder"
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
  computed: mapGetters(['cartProducts','cartTotalPrice']),
  methods: {
    async addOrder() {
      try {
        const data = {
          order: {
            billing_amount: Math.floor(this.$store.getters.cartTotalPrice)
          }
        };
    
        await this.$axios.$post('/api/v1/orders', data);
    
        const cartsResponse = await this.$axios.$get('/api/v1/carts');
        this.$store.commit('setCart', cartsResponse);
        this.$store.dispatch('getToast', { msg: '農産物を購入しました', color: 'success' });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        let errorMsg = "農産物を購入できませんでした";
        if (error.response && error.response.data && error.response.data.error) {
          errorMsg = error.response.data.error;
        }
        this.$store.dispatch('getToast', { msg: errorMsg, color: "error" });
      }
    },
  },
}
</script>