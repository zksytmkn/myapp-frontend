<template>
  <div
    id="products"
  >
    <logged-in-app-product-eye-catch>
      <template
        v-slot
      >
        Various vegetables or fruits are here !
        Please look around and enjoy it !
      </template>
    </logged-in-app-product-eye-catch>

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
                  dark
                  to="/products/register"
                >
                  レジに進む
                </v-btn>
                <v-btn
                  class="font-weight-bold ml-2"
                  color="teal"
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
                      :to="$my.productLinkToDetail(product.id)"
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
                      @click="$store.dispatch('updateLikeState', product)"
                      :class="{ likeColor: product.like}"
                      style="background:grey"
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
                      @click="$store.dispatch('updateDislikeState',product)"
                      :class="{ dislikeColor: product.dislike }"
                      class="ml-2"
                      style="background:grey"
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
                  <v-card-text
                    class="pb-0"
                  >
                    {{ product.text }}
                  </v-card-text>
                  <v-card-subtitle
                    class="pt-0 font-weight-bold"
                    style="white-space:pre-line; line-height:2;"
                  >
                    ¥{{ product.price.toLocaleString() }} × {{product.quantity }}
                    小計（税込）：¥{{ Math.floor(product.price *product.quantity * 1.1).toLocaleString() }}
                  </v-card-subtitle>
                  <v-divider/>
                  <v-container>
                    <v-card-actions
                      style="width:86%;"
                    >
                      <v-btn
                        @click="$store.dispatch('removeProductFromCart',product)"
                        class="font-weight-bold"
                        color="teal"
                        block
                        dark
                      >
                        削除する
                      </v-btn>
                    </v-card-actions>
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-pagination
      class="my-6"
      v-model="page"
      v-show="cartProducts.length"
      :length="Math.ceil(this.cartProducts.length/this.pageSize)"
      circle
    >
    </v-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import noImg from '~/assets/images/logged-in/no.png'

export default {
  data () {
    return {
      noImg,
      page: 1,
      pageSize: 10
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
.likeColor {
  background: #CC0000 !important;
}
.dislikeColor {
  background: #336791 !important;
}
</style>