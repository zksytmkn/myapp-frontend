<template>
  <div>
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
                  あなたのカート
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
                  カートには何も入っておりません。
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
                  to="/products/list"
                >
                  農産物を見る
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-list
            v-show="cartProducts.length"
            color="transparent"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  class="font-weight-bold"
                >
                  合計（税込）：¥{{ Math.floor(cartTotalPrice).toLocaleString() }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
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
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col
          v-for="(cart, i) in cartProducts"
          :key="`cart-${i}`"
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
                    <span
                      v-show="cart.product.name.length>7"
                    >
                      {{ cart.product.name.substring(0, 7)+'...' }}
                    </span>
                    <span
                      v-show="cart.product.name.length<=7"
                    >
                      {{ cart.product.name }}
                    </span>
                    <v-spacer />
                    <v-btn
                      text
                      outlined
                      :to="$my.productLinkToDetail(cart.product_id)"
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
                      v-show="!$store.state.product.favorite.some(favorite => favorite.id === cart.product_id)"
                      @click="addProductFavorite(cart.product_id)"
                      :class="{ likeColor: $store.state.product.favorite.some(favorite => favorite.id === cart.product_id) }"
                      class="ml-0"
                      style="background:grey"
                      fab
                      dark
                      x-small
                    >
                      <v-icon>
                        mdi-thumb-up
                      </v-icon>
                    </v-btn>
                    <v-btn
                      v-show="$store.state.product.favorite.some(favorite => favorite.id === cart.product_id)"
                      @click="deleteProductFavorite(cart.product_id)"
                      :class="{ likeColor: $store.state.product.favorite.some(favorite => favorite.id === cart.product_id) }"
                      class="ml-0"
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
                      {{ $store.state.product.favorites.filter(favorites => favorites.product_id === cart.product_id).length }}
                    </span>
                    <v-btn
                      v-show="!$store.state.product.unfavorite.some(unfavorite => unfavorite.id === cart.product_id)"
                      @click="addProductUnfavorite(cart.product_id)"
                      :class="{ dislikeColor: $store.state.product.unfavorite.some(unfavorite => unfavorite.id === cart.product_id) }"
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
                    <v-btn
                      v-show="$store.state.product.unfavorite.some(unfavorite => unfavorite.id === cart.product_id)"
                      @click="deleteProductUnfavorite(cart.product_id)"
                      :class="{ dislikeColor: $store.state.product.unfavorite.some(unfavorite => unfavorite.id === cart.product_id) }"
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
                      {{ $store.state.product.unfavorites.filter(unfavorites => unfavorites.product_id === cart.product_id).length }}
                    </span>
                  </v-card-actions>
                </v-col>

                <v-col
                  cols="6"
                >
                  <v-card-text
                    class="pb-0"
                  >
                    <span
                      v-show="cart.product.text.length>90"
                    >
                      {{ cart.product.text.substring(0, 90)+'...' }}
                    </span>
                    <span
                    v-show="cart.product.text.length<=90"
                    >
                      {{ cart.product.text }}
                    </span>
                  </v-card-text>
                  <v-card-subtitle
                    class="pt-0 font-weight-bold"
                    style="white-space:pre-line; line-height:2;"
                  >
                    ¥{{ cart.product.price.toLocaleString() }} × {{ cart.quantity }}
                    小計（税込）：¥{{ Math.floor(cart.product.price * cart.quantity * 1.1).toLocaleString() }}
                  </v-card-subtitle>
                  <v-divider/>
                  <v-card-actions
                    style="width:80%;"
                  >
                    <v-container>
                      <v-btn
                        @click="removeProductFromCart(cart.product_id, cart.quantity, cart.id)"
                        class="font-weight-bold"
                        color="teal"
                        block
                        dark
                      >
                        削除する
                      </v-btn>
                    </v-container>
                  </v-card-actions>
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
  layout: 'logged-in',
  middleware: ['get-cart'],
  data () {
    return {
      noImg,
      page: 1,
      pageSize: 10
    }
  },
  methods: {
    addProductFavorite(id) {
      const asyncFunc = async() => {
        const formData = new FormData()
        formData.append('product_id', id)
        formData.append('user_id', this.$auth.user.id)
        await this.$axios.$post('/api/v1/product_favorites', formData)
        .then(response => console.log(response))
        .catch(error => console.log(error))
        await Promise.all([
          this.$axios.$get(`api/v1/product_favorites/${this.$auth.user.id}`),
          this.$axios.$get('api/v1/product_favorites'),
          this.$axios.$get(`api/v1/product_unfavorites/${this.$auth.user.id}`),
          this.$axios.$get('api/v1/product_unfavorites')
        ])
        .then(response => {
          this.$store.dispatch('getProductFavorite', response[0])
          this.$store.dispatch('getProductFavorites', response[1])
          this.$store.dispatch('getProductUnfavorite', response[2])
          this.$store.dispatch('getProductUnfavorites', response[3])
        })
      }
      asyncFunc().finally(response => console.log(response))
    },
    deleteProductFavorite(id) {
      const asyncFunc = async() => {
        const formData = new FormData()
        formData.append('product_id', id)
        formData.append('user_id', this.$auth.user.id)
        await this.$axios.$delete('/api/v1/product_favorites', {data: formData})
        .then(response => console.log(response))
        .catch(error => console.log(error))
        await Promise.all([
          this.$axios.$get(`api/v1/product_favorites/${this.$auth.user.id}`),
          this.$axios.$get('api/v1/product_favorites')
        ])
        .then(response => {
          this.$store.dispatch('getProductFavorite', response[0])
          this.$store.dispatch('getProductFavorites', response[1])
        })
      }
      asyncFunc().finally(response => console.log(response))
    },
    addProductUnfavorite(id) {
      const asyncFunc = async() => {
        const formData = new FormData()
        formData.append('product_id', id)
        formData.append('user_id', this.$auth.user.id)
        await this.$axios.$post('/api/v1/product_unfavorites', formData)
        .then(response => console.log(response))
        .catch(error => console.log(error))
        await Promise.all([
          this.$axios.$get(`api/v1/product_favorites/${this.$auth.user.id}`),
          this.$axios.$get('api/v1/product_favorites'),
          this.$axios.$get(`api/v1/product_unfavorites/${this.$auth.user.id}`),
          this.$axios.$get('api/v1/product_unfavorites'),
        ])
        .then(response => {
          this.$store.dispatch('getProductFavorite', response[0])
          this.$store.dispatch('getProductFavorites', response[1])
          this.$store.dispatch('getProductUnfavorite', response[2])
          this.$store.dispatch('getProductUnfavorites', response[3])
        })
      }
      asyncFunc().finally(response => console.log(response))
    },
    deleteProductUnfavorite(id) {
      const asyncFunc = async() => {
        const formData = new FormData()
        formData.append('product_id', id)
        formData.append('user_id', this.$auth.user.id)
        await this.$axios.$delete('/api/v1/product_unfavorites', {data: formData})
        .then(response => console.log(response))
        .catch(error => console.log(error))
        await Promise.all([
          this.$axios.$get(`api/v1/product_unfavorites/${this.$auth.user.id}`),
          this.$axios.$get('api/v1/product_unfavorites'),
        ])
        .then(response => {
          this.$store.dispatch('getProductUnfavorite', response[0])
          this.$store.dispatch('getProductUnfavorites', response[1])
        })
      }
      asyncFunc().finally(response => console.log(response))
    },
    removeProductFromCart(productId, quantity, cartId) {
      const asyncFunc = async() => {
        const productQuantity = Number(this.$store.state.product.list.find(product => product.id === productId).stock) + Number(quantity)
        const formDataProducts = new FormData()
        formDataProducts.append('stock', productQuantity)
        await Promise.all([
          this.$axios.$delete(`/api/v1/carts/${cartId}`),
          this.$axios.$patch(`/api/v1/products/${productId}`, formDataProducts)
        ])
        .then(response => {
          console.log(response[0])
          console.log(response[1])
        })
        .catch(error => {
          console.log(error[0])
          console.log(error[1])
        })
        await Promise.all([
          this.$axios.$get(`/api/v1/carts/${this.$auth.user.id}`)
        ])
        .then(response => {
          this.$store.dispatch('getCarts', response[0])
        })
      }
      asyncFunc().finally(response => console.log(response))
    }
  },
  computed: {
    cartProducts() {
      const copyCartProducts = Array.from(this.$store.state.carts)
      return copyCartProducts.sort((a, b) => {
        if (a.created_at > b.created_at) { return -1 }
        if (a.created_at < b.created_at) { return 1 }
        return 0
      })
    },
    ...mapGetters(['cartTotalPrice'])
  }
}
</script>

<style lang="scss">
.likeColor {
  background: #CC0000 !important;
}
.dislikeColor {
  background: #336791 !important;
}
</style>