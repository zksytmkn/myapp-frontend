<template>
  <div>
    <v-container>
      <v-list
        color="transparent"
      >
        <v-list-item>
          <v-list-item-title
            class="font-weight-bold"
          >
            全ての農産物（{{ products.length }}件）
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider/>
    </v-container>
    <v-container>
      <v-row>
        <v-col
          v-for="(product, i) in products.slice(this.pageSize*(this.page-1),this.pageSize*(this.page))"
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
                    :src="product.image_url ? product.image_url : noImg"
                    max-height="360px"
                    max-width="360px"
                    aspect-ratio="1"
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
                      {{ $store.state.product.favorites.filter(favorites => favorites.product_id === product.id).length }}
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
                      {{ $store.state.product.unfavorites.filter(unfavorites => unfavorites.product_id === product.id).length }}
                    </span>
                  </v-card-actions>
                </v-col>

                <v-col
                  cols="6"
                >
                  <v-card-text>
                    <span
                      v-show="product.description.length>80"
                    >
                      {{ product.description.substring(0, 80)+'...' }}
                    </span>
                    <span
                      v-show="product.description.length<=80"
                    >
                      {{ product.description }}
                    </span>
                  </v-card-text>
                  <v-card-title
                    class="pt-0 font-weight-bold"
                  >
                    ¥{{ product.price.toLocaleString() }}
                  </v-card-title>
                  <v-divider/>
                  <v-container
                    class="pt-0"
                    v-if="product.user_id!==$auth.user.id"
                  >
                    <v-card-actions
                      class="pa-0"
                      style="width:80%;"
                    >
                      <v-select
                        v-show="product.stock"
                        :value="product.quantity"
                        @change="quantity => $store.dispatch('getProductQuantity', { id: product.id, quantity: quantity })" 
                        class="mt-6"
                        :items="[...Array(product.stock).keys()].map(i => ++i)"
                        solo
                        dense
                        rounded
                        outlined
                      >
                      </v-select>
                    </v-card-actions>
                    <v-card-text
                      class="px-0 font-weight-bold"
                      style="color:#CC0000;"
                      v-show="!product.stock"
                    >
                      ＊在庫が残っておりません。
                    </v-card-text>
                    <v-card-actions
                      class="pa-0"
                      style="width:80%;"
                    >
                      <v-btn
                        @click="addProductToCart(product.id, product.quantity)"
                        :disabled="!product.stock"
                        class="font-weight-bold"
                        color="teal"
                        block
                        dark
                      >
                        カートに入れる
                      </v-btn>
                    </v-card-actions>
                  </v-container>
                  <v-container
                    v-if="product.user_id===$auth.user.id"
                  >
                    <v-card-actions
                      style="width:86%;"
                    >
                      <v-btn
                        :to="$my.productLinkToEdit(product.id)"
                        class="font-weight-bold mt-2"
                        color="teal"
                        block
                        dark
                        outlined
                      >
                        編集する
                      </v-btn>
                    </v-card-actions>
                    <v-card-actions
                      style="width:86%;"
                    >
                      <v-btn
                        @click="deleteProduct(product.id)"
                        class="font-weight-bold mt-2"
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
      v-show="products.length"
      :length="Math.ceil(this.products.length/this.pageSize)"
      circle
    >
    </v-pagination>
  </div>
</template>

<script>
import noImg from '~/assets/images/logged-in/no.png'

export default {
  layout: 'logged-in',
  data () {
    return {
      noImg,
      page: 1,
      pageSize: 10,
    }
  },
  methods: {
    async deleteProduct(id) {
      await this.$axios.$delete(`/api/v1/products/${id}`)
      .then(response => {
        this.$router.go({path: this.$router.currentRoute.path, force: true})
        const msg = '農産物を削除しました'
        const color = 'success'
        return this.$store.dispatch('getToast', { msg, color })
      })
      .catch(error => {
        console.log(error)
        const msg = '農産物を削除できませんでした'
        const color = 'error'
        return this.$store.dispatch('getToast', { msg, color })
      })
    },
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
    addProductToCart(id, quantity) {
      if(!this.$store.state.carts.length || !this.$store.state.carts.some(cart => cart.product_id === id)) {
        const asyncFunc = async() => {
          const productQuantity = Number(this.$store.state.product.list.find(product => product.id === id).stock) - Number(quantity)
          const formDataCarts = new FormData()
          formDataCarts.append('user_id', this.$auth.user.id)
          formDataCarts.append('product_id', id)
          formDataCarts.append('quantity', quantity)
          const formDataProducts = new FormData()
          formDataProducts.append('stock', productQuantity)
          await Promise.all([
            this.$axios.$post('/api/v1/carts', formDataCarts),
            this.$axios.$patch(`/api/v1/products/${id}`, formDataProducts)
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
            this.$axios.$get('/api/v1/carts'),
            this.$axios.$get('/api/v1/products')
          ])
          .then(response => {
            this.$store.dispatch('getCarts', response[0])
            this.$store.dispatch('getProductList', response[1])
          })
        }
        asyncFunc().finally(response => console.log(response))
      }
      else if(this.$store.state.carts.some(cart => cart.product_id === id)) {
        const asyncFunc = async() => {
          const cartId = this.$store.state.carts.find(cart => cart.product_id === id).id
          const cartQuantity = Number(this.$store.state.carts.find(cart => cart.product_id === id).quantity) + Number(quantity)
          const productQuantity = Number(this.$store.state.product.list.find(product => product.id === id).stock) - Number(quantity)
          const formDataCarts = new FormData()
          formDataCarts.append('quantity', cartQuantity)
          const formDataProducts = new FormData()
          formDataProducts.append('stock', productQuantity)
          await Promise.all([
            this.$axios.$patch(`/api/v1/carts/${cartId}`, formDataCarts),
            this.$axios.$patch(`/api/v1/products/${id}`, formDataProducts)
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
            this.$axios.$get('/api/v1/carts'),
            this.$axios.$get('/api/v1/products')
          ])
          .then(response => {
            this.$store.dispatch('getCarts', response[0])
            this.$store.dispatch('getProductList', response[1])
          })
        }
        asyncFunc().finally(response => console.log(response))
      }
    }
  },
  computed: {
    products () {
      const copyProducts = Array.from(this.$store.state.product.list)
      return copyProducts.sort((a, b) => {
        if (a.created_at > b.created_at) { return -1 }
        if (a.created_at < b.created_at) { return 1 }
        return 0
      })
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