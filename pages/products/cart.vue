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
                    <span
                      v-show="product.name.length>7"
                    >
                      {{ product.name.substring(0, 7)+'...' }}
                    </span>
                    <span
                      v-show="product.name.length<=7"
                    >
                      {{ product.name }}
                    </span>
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
                      v-show="!$store.state.product.favorite.some(favorite => favorite.id === product.id)"
                      @click="addProductFavorite(product.id)"
                      :class="{ likeColor: $store.state.product.favorite.some(favorite => favorite.id === product.id) }"
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
                      v-show="$store.state.product.favorite.some(favorite => favorite.id === product.id)"
                      @click="deleteProductFavorite(product.id)"
                      :class="{ likeColor: $store.state.product.favorite.some(favorite => favorite.id === product.id) }"
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
                      {{ $store.state.product.favorite.filter(favorite => favorite.id === product.id).length }}
                    </span>
                    <v-btn
                      v-show="!$store.state.product.unfavorite.some(unfavorite => unfavorite.id === product.id)"
                      @click="addProductUnfavorite(product.id)"
                      :class="{ dislikeColor: $store.state.product.unfavorite.some(unfavorite => unfavorite.id === product.id) }"
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
                      v-show="$store.state.product.unfavorite.some(unfavorite => unfavorite.id === product.id)"
                      @click="deleteProductUnfavorite(product.id)"
                      :class="{ dislikeColor: $store.state.product.unfavorite.some(unfavorite => unfavorite.id === product.id) }"
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
                      {{ $store.state.product.unfavorite.filter(unfavorite => unfavorite.id === product.id).length }}
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
                      v-show="product.text.length>90"
                    >
                      {{ product.text.substring(0, 90)+'...' }}
                    </span>
                    <span
                    v-show="product.text.length<=90"
                    >
                      {{ product.text }}
                    </span>
                  </v-card-text>
                  <v-card-subtitle
                    class="pt-0 font-weight-bold"
                    style="white-space:pre-line; line-height:2;"
                  >
                    ¥{{ product.price.toLocaleString() }} × {{product.quantity }}
                    小計（税込）：¥{{ Math.floor(product.price *product.quantity * 1.1).toLocaleString() }}
                  </v-card-subtitle>
                  <v-divider/>
                  <v-card-actions
                    style="width:80%;"
                  >
                    <v-container>
                      <v-btn
                        @click="$store.dispatch('removeProductFromCart',product)"
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
  data () {
    return {
      noImg,
      page: 1,
      pageSize: 10
    }
  },
  computed: mapGetters(['cartProducts','cartTotalPrice']),
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
          this.$axios.$get(`api/v1/product_unfavorites/${this.$auth.user.id}`)
        ])
        .then(response => {
          this.$store.dispatch('getProductFavorite', response[0])
          this.$store.dispatch('getProductUnfavorite', response[1])
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
        await this.$axios.$get(`api/v1/product_favorites/${this.$auth.user.id}`)
        .then(favorite => this.$store.dispatch('getProductFavorite', favorite))
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
          this.$axios.$get(`api/v1/product_unfavorites/${this.$auth.user.id}`)
        ])
        .then(response => {
          this.$store.dispatch('getProductFavorite', response[0])
          this.$store.dispatch('getProductUnfavorite', response[1])
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
        await this.$axios.$get(`api/v1/product_unfavorites/${this.$auth.user.id}`)
        .then(unfavorite => this.$store.dispatch('getProductUnfavorite', unfavorite))
      }
      asyncFunc().finally(response => console.log(response))
    }
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