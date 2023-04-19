<template>
  <div>
    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
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
                <v-list-item-title>
                  お届け先
                </v-list-item-title>
              </v-list-item>
            </v-list>
            <v-divider/>
            <v-list>
              <v-list-item>
                <v-list-item-text>
                  お届け先住所：〒{{ $store.state.user.login.zipcode }}
                </v-list-item-text>
              </v-list-item>
              <v-list-item>
                <v-list-item-text>
                  {{ $store.state.user.login.street }}
                  {{ $store.state.user.login.building }}
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
        const formData = new FormData();
        formData.append('user_id', this.$auth.user.id);
        formData.append('billing_amount', Math.floor(this.$store.getters.cartTotalPrice));
        formData.append('zipcode', this.$auth.user.zipcode);
        formData.append('street', this.$auth.user.street);
        formData.append('building', this.$auth.user.building);

        await this.$axios.$post('/api/v1/orders', formData);

        const cartsResponse = await this.$axios.$get('/api/v1/carts');
        this.$store.dispatch('getCarts', cartsResponse);
        this.$store.dispatch('getToast', { msg: '農産物を購入しました', color: 'success' });
      } catch (error) {
        this.$store.dispatch('getToast', { msg: '農産物を購入できませんでした', color: 'error' });
      }
    },
  },
}
</script>