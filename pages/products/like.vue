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
                  いいね（{{ likeProducts.length }}件）
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider/>
          <v-list
            v-show="!likeProducts.length"
            color="transparent"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  いいねしておりません。
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
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col
          v-for="product in likeProducts.slice(this.pageSize*(this.page-1),this.pageSize*(this.page))"
          :key="product.id"
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
                  <v-card-text>
                    <span
                      v-show="product.text.length>80"
                    >
                      {{ product.text.substring(0, 80)+'...' }}
                    </span>
                    <span
                      v-show="product.text.length<=80"
                    >
                      {{ product.text }}
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
                    v-if="product.seller!==$auth.user.name"
                  >
                    <v-row>
                      <v-col
                        cols="12"
                      >
                        <v-card-actions
                          class="pa-0"
                          style="width:80%;"
                          v-show="product.inventory"
                        >
                          <v-select
                            @change="(quantity) => $store.dispatch('updateQuantity', {product, quantity})"
                            :value="product.quantity"
                            class="mt-6"
                            :items="[...Array(product.inventory).keys()].map(i => ++i)"
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
                          v-show="!product.inventory"
                        >
                          ＊在庫が残っておりません。
                        </v-card-text>
                        <v-card-actions
                          class="pa-0"
                          style="width:80%;"
                        >
                          <v-btn
                            @click="$store.dispatch('addProductToCart', product)"
                            :disabled="!product.inventory"
                            class="font-weight-bold"
                            color="teal"
                            block
                            dark
                          >
                            カートに入れる
                          </v-btn>
                        </v-card-actions>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-container
                    v-if="product.seller===$auth.user.name"
                  >
                    <v-row>
                      <v-col
                        cols="12"
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
                      </v-col>
                    </v-row>
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
      v-show="likeProducts.length"
      :length="Math.ceil(this.likeProducts.length/this.pageSize)"
      circle
    >
    </v-pagination>
  </div>
</template>

<script>
import noImg from '~/assets/images/logged-in/no.png'

export default {
  layout: 'logged-in',
  middleware: ['get-product-list'],
  data () {
    return {
      noImg,
      page: 1,
      pageSize: 10
    }
  },
  computed: {
    likeProducts() {
      const copyLikeProducts = Array.from(this.$store.state.product.favorite)
      return copyLikeProducts.sort((a, b) => {
        if (a.updated_at > b.updated_at) { return -1 }
        if (a.updated_at < b.updated_at) { return 1 }
        return 0
      })
    }
  },
  methods: {
    async deleteProduct (id) {
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