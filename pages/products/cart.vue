<template>
  <div
    id="products"
  >
    <logged-in-app-eye-catch>
      <template
        v-slot
      >
        Various vegetables or fruits are here !
        Please look around and enjoy it !
      </template>
    </logged-in-app-eye-catch>
    <v-container>
      <v-list-item>
        <v-list-item-title
          class="font-weight-bold"
        >
          あなたのカート
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
      <v-container>
        <v-row>
          <v-col
            cols="12"
          >
            <v-container>
              <p
                v-show="!cartProducts.length"
              >
                カートには何も入っておりません。
              </p>
              <v-btn
                class="font-weight-bold"
                color="orange"
                outlined
                dark
                to="/products/list"
                v-show="!cartProducts.length"
              >
                農産物を見てみる
              </v-btn>
              <div
                v-show="cartProducts.length"
              >
                <p
                  class="font-weight-bold"
                >
                  合計（税込）：¥{{ Math.floor(cartTotalPrice).toLocaleString() }}
                </p>
                <v-btn
                  class="font-weight-bold"
                  color="teal"
                  outlined
                  dark
                  to="/products/register"
                >
                  レジに進む
                </v-btn>
                <v-btn
                  class="font-weight-bold ml-2"
                  color="orange"
                  outlined
                  dark
                  to="/products/list"
                >
                  一覧に戻る
                </v-btn>
              </div>
            </v-container>
          </v-col>
        </v-row>
      </v-container>

      <v-container>
        <v-row>
          <v-col
            v-for="(product, i) in cartProducts"
            :key="`product-${i}`"
            cols="6"
          >
            <v-card>
              <v-container>
                <v-row>
                  <v-col
                    cols="6"
                  >
                    <v-img
                      :src="noImg"
                      max-height="360px"
                      max-width="360px"
                    >
                    </v-img>
                    <v-card-title
                      class="font-weight-bold pa-1"
                      style="max-width:360px;"
                    >
                      {{ product.name }}
                      <v-spacer />
                      <v-btn
                        text
                        outlined
                        :to="$my.productLinkTo(product.id)"
                        class="font-weight-bold"
                        style="text-transform:none"
                      >
                        詳細
                      </v-btn>
                    </v-card-title>
                    <v-card-actions
                      class="pa-1"
                    >
                      <v-btn
                        color="pink"
                        fab
                        dark
                        x-small
                      >
                        <v-icon>
                          mdi-thumb-up
                        </v-icon>
                      </v-btn>
                      <span
                        class="font-weight-bold ml-1"
                      >
                        Good
                      </span>
                      <v-btn
                        class="ml-2"
                        fab
                        dark
                        x-small
                      >
                        <v-icon>
                          mdi-thumb-down
                        </v-icon>
                      </v-btn>
                      <span
                        class="font-weight-bold ml-1"
                      >
                        Bad
                      </span>
                    </v-card-actions>
                  </v-col>
  
                  <v-col
                    cols="6"
                  >
                    <v-card-text>
                      {{ product.text }}
                    </v-card-text>
                    <v-card-text
                      class="pb-0 font-weight-bold"
                    >
                      <p>
                        ¥{{ product.price.toLocaleString() }} × {{ product.quantity }}（数量）
                      </p>
                    </v-card-text>
                    <v-divider/>
                    <v-card-text
                      class="pb-0 font-weight-bold"
                    >
                      <p>
                        小計（税込）：¥{{ Math.floor(product.price * product.quantity * 1.1).toLocaleString() }}
                      </p>
                    </v-card-text>
                    <v-card-actions
                      class="pt-0"
                      style="width:70%;"
                    >
                      <v-btn
                        @click="$store.dispatch('removeProductFromCart', product)"
                        class="font-weight-bold"
                        color="teal"
                        block
                        dark
                      >
                        削除する
                      </v-btn>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import noImg from '~/assets/images/logged-in/no.png'

export default {
  data () {
    return {
      noImg
    }
  },
  computed: mapGetters(['cartProducts','cartTotalPrice']),
}
</script>

<style lang="scss">
#products {
  .v-parallax__content {
    padding: 0;
  }
}
</style>