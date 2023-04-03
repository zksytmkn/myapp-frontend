<template>
  <div
    class="mb-10"
  >
    <v-container>
      <v-list
        color="transparent"
      >
        <v-list-item>
          <v-list-item-title
            class="font-weight-bold"
          >
            詳細
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider/>
    </v-container>
    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
          <v-card>
            <v-container>
              <v-row>
                <v-col
                  cols="5"
                >
                  <v-img
                    :src="currentProduct.image_url ? currentProduct.image_url : noImg"
                    max-height="430px"
                    max-width="430px"
                    aspect-ratio="1"
                  >
                  </v-img>
                  <v-card-title
                    class="font-weight-bold pa-1"
                    style="max-width:430px;"
                  >
                    <span
                      v-show="currentProduct.name.length>13"
                    >
                      {{ currentProduct.name.substring(0, 13)+'...' }}
                    </span>
                    <span
                      v-show="currentProduct.name.length<=13"
                    >
                      {{ currentProduct.name }}
                    </span>
                    <v-spacer />
                    <v-btn
                      text
                      outlined
                      to="/products/list"
                      class="font-weight-bold"
                    >
                      一覧
                    </v-btn>
                  </v-card-title>
                  <v-card-actions
                    class="pa-1"
                  >
                    <v-btn
                      v-show="!$store.state.product.favorite.some(favorite => favorite.id === currentProduct.id)"
                      @click="addProductFavorite(currentProduct.id)"
                      :class="{ likeColor: $store.state.product.favorite.some(favorite => favorite.id === currentProduct.id) }"
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
                      v-show="$store.state.product.favorite.some(favorite => favorite.id === currentProduct.id)"
                      @click="deleteProductFavorite(currentProduct.id)"
                      :class="{ likeColor: $store.state.product.favorite.some(favorite => favorite.id === currentProduct.id) }"
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
                      {{ $store.state.product.favorites.filter(favorites => favorites.product_id === currentProduct.id).length }}
                    </span>
                    <v-btn
                      v-show="!$store.state.product.unfavorite.some(unfavorite => unfavorite.id === currentProduct.id)"
                      @click="addProductUnfavorite(currentProduct.id)"
                      :class="{ dislikeColor: this.$store.state.product.unfavorite.some(unfavorite => unfavorite.id === currentProduct.id) }"
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
                      v-show="$store.state.product.unfavorite.some(unfavorite => unfavorite.id === currentProduct.id)"
                      @click="deleteProductUnfavorite(currentProduct.id)"
                      :class="{ dislikeColor: this.$store.state.product.unfavorite.some(unfavorite => unfavorite.id === currentProduct.id) }"
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
                      {{ $store.state.product.unfavorites.filter(unfavorites => unfavorites.product_id === currentProduct.id).length }}
                    </span>
                    <v-btn
                      @click="comment = !comment"
                      class="ml-2"
                      text
                      x-small
                    >
                      <v-icon>
                        mdi-comment-outline
                      </v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-col>

                <v-col
                  cols="7"
                >
                  <v-chip
                    class="ma-2 font-weight-bold"
                    outlined
                  >
                    <v-icon
                      v-if="currentProduct.category === '野菜'"
                      left
                    >
                      mdi-seed-outline
                    </v-icon>
                    <v-icon
                      v-if="currentProduct.category === '果物'"
                      left
                    >
                      mdi-food-apple-outline
                    </v-icon>
                    {{ currentProduct.category }}
                  </v-chip>

                  <v-chip
                    class="ma-2 font-weight-bold"
                    outlined
                  >
                    <v-icon
                      left
                    >
                      mdi-map-marker-outline
                    </v-icon>
                    {{ currentProduct.prefecture }}
                  </v-chip>

                  <v-card-subtitle>
                    <nuxt-link
                      :to="$my.userLinkToProfile(currentProduct.user_id)"
                      class="text-decoration-none teal--text text--darken-2"
                    >
                      <span
                        v-show="currentProduct.user.name.length>10"
                      >
                        by {{ currentProduct.user.name.substring(0, 10)+'...' }}
                      </span>
                      <span
                        v-show="currentProduct.user.name.length<=10"
                      >
                        by {{ currentProduct.user.name }}
                      </span>
                    </nuxt-link>
                  </v-card-subtitle>
                  <v-card-text>
                    <span
                      v-show="currentProduct.description.length>300"
                    >
                      {{ currentProduct.description.substring(0, 300)+'...' }}
                    </span>
                    <span
                      v-show="currentProduct.description.length<=300"
                    >
                      {{ currentProduct.description }}
                    </span>
                  </v-card-text>
                  <v-card-title
                    class="font-weight-bold"
                  >
                    ¥{{ currentProduct.price.toLocaleString() }}
                  </v-card-title>
                  <v-divider/>
                  <v-container
                    v-if="currentProduct.user_id!==$auth.user.id"
                  >
                    <v-card-actions
                      class="pa-0"
                      style="width:40%;"
                    >
                      <v-select
                        :value="currentProduct.quantity"
                        @change="quantity => $store.dispatch('getCurrentProductQuantity', quantity)"
                        class="mt-6"
                        :items="[...Array(currentProduct.stock).keys()].map(i => ++i)"
                        solo
                        dense
                        rounded
                        outlined
                      >
                      </v-select>
                    </v-card-actions>
                    <v-card-actions
                      class="pa-0"
                      style="width:40%;"
                    >
                      <v-btn
                        @click="addProductToCart(currentProduct.id, currentProduct.quantity)"
                        :disabled="!currentProduct.stock"
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
                    v-if="currentProduct.user_id===$auth.user.id"
                  >
                    <v-card-actions
                      style="width:40%;"
                    >
                      <v-btn
                        :to="$my.productLinkToEdit(currentProduct.id)"
                        class="font-weight-bold"
                        color="teal"
                        block
                        dark
                        outlined
                      >
                        編集する
                      </v-btn>
                    </v-card-actions>
                    <v-card-actions
                      style="width:40%;"
                    >
                      <v-btn
                        @click="deleteCurrentProduct(currentProduct.id)"
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

    <v-container
      v-show="comment"
    >
      <v-row>
        <v-col
          cols="12"
        >
          <v-card
            flat
            rounded="lg"
          >
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-bold"
                  >
                    コメント
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider/>
            <v-list
              v-for="(comment, i) in comments"
              :key="`comment-${i}`"
            >
              <v-list-item>
                <v-list-item-title>
                  <v-list-item-avatar
                    left
                  >
                    <v-img
                      :src="noImg"
                    >
                    </v-img>
                  </v-list-item-avatar>
                  {{ comment.user.name }}
                </v-list-item-title>
                <v-list-item-action
                  v-if="comment.user.id === $auth.user.id"
                >
                  <v-menu
                    app
                    offset-x
                    offset-y
                    max-width="200"
                  >
                    <template
                      v-slot:activator="{ on }"
                    >
                      <v-btn
                        icon
                        v-on="on"
                      >
                        <v-icon>
                          mdi-dots-horizontal
                        </v-icon>
                      </v-btn>
                    </template>
                    <v-list
                      dense
                    >
                      <template>
                        <v-list-item
                          @click="deleteProductComment(comment.id, currentProduct.id)"
                        >
                          <v-list-item-title>
                            削除する
                          </v-list-item-title>
                        </v-list-item>
                      </template>
                    </v-list>
                  </v-menu>
                </v-list-item-action>
                <v-spacer />
                <v-card-subtitle>
                  {{ dateFormat(comment.updated_at) }} 
                </v-card-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-text>
                  {{ comment.productComment_content }}
                </v-list-item-text>
              </v-list-item>
              <v-divider/>
            </v-list>
            <v-form
              ref="new"
              v-model="isValid"
            >
              <v-list>
                <v-list-item>
                  <v-list-item-title>
                    <v-list-item-avatar
                      left
                    >
                      <v-img
                        :src="$auth.user.image_url ? $auth.user.image_url : noImg"
                      >
                      </v-img>
                    </v-list-item-avatar>
                      {{ $auth.user.name }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-container>
                    <v-row
                      justify="center"
                    >
                      <v-col
                        cols="11"
                      >
                        <v-textarea
                          dense
                          outlined
                          rows="2"
                          placeholder="コメントを追加する"
                          hide-details="auto"
                          v-model="inputted.comment"
                          :rules="commentRules"
                          :disabled="sentIt"
                        >
                        </v-textarea>
                      </v-col>
                      <v-col
                        cols="11"
                      >
                        <v-row
                          justify="center"
                          align="center"
                        >
                          <v-btn
                            text
                            outlined
                            class="font-weight-bold mt-3 mb-3 mr-2"
                            @click="addProductComment(currentProduct.id)"
                            :disabled="!isValid"
                          >
                            コメントする
                          </v-btn>

                          <v-btn
                            text
                            @click="formReset"
                          >
                            キャンセル
                          </v-btn>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-list-item> 
              </v-list>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import noImg from '~/assets/images/logged-in/no.png'

export default {
  layout: 'logged-in',
  data () {
    return {
      noImg,
      isValid: false,
      comment: false,
      commentRules: [
        v => !!v || ''
      ],
      inputted: { comment: '', productId: this.$store.state.product.current.id, userId: this.$auth.user.id }
    }
  },
  methods: {
    async deleteCurrentProduct(id) {
      await this.$axios.$delete(`/api/v1/products/${id}`)
      .then(response => {
        this.$router.back()
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
    addProductComment(id) {
      if (this.isValid) {
        const asyncFunc = async() => {
          const formData = new FormData()
          formData.append('productComment_content', this.inputted.comment)
          formData.append('product_id', this.inputted.productId)
          formData.append('user_id', this.inputted.userId)
          this.formReset()
          await this.$axios.$post('/api/v1/product_comments', formData)
          .then(response => {
            const msg = 'コメントしました'
            const color = 'success'
            return this.$store.dispatch('getToast', { msg, color })
          })
          .catch(error => {
            console.log(error)
            const msg = 'コメントできませんでした'
            const color = 'error'
            return this.$store.dispatch('getToast', { msg, color })
          })
          await this.$axios.$get(`api/v1/product_comments/${id}`)
          .then(comments => this.$store.dispatch('getProductComment', comments))
        }
        asyncFunc().finally(response => console.log(response))
      }
    },
    formReset() {
      this.sentIt = false
      this.$refs.new.reset()
    },
    deleteProductComment(commentId, productId) {
      const asyncFunc = async() => {
        await this.$axios.$delete(`/api/v1/product_comments/${commentId}`)
        .then(response => {
          const msg = 'コメントを削除しました'
          const color = 'success'
          return this.$store.dispatch('getToast', { msg, color })
        })
        .catch(error => {
          console.log(error)
          const msg = 'コメントを削除できませんでした'
          const color = 'error'
          return this.$store.dispatch('getToast', { msg, color })
        })
        await this.$axios.$get(`api/v1/product_comments/${productId}`)
        .then(comments => this.$store.dispatch('getProductComment', comments))
      }
      asyncFunc().finally(response => console.log(response))
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
          const productQuantity = Number(this.$store.state.product.current.stock) - Number(quantity)
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
            this.$axios.$get(`/api/v1/products/${id}`)
          ])
          .then(response => {
            this.$store.dispatch('getCarts', response[0])
            this.$store.dispatch('getCurrentProduct', response[1])
          })
        }
        asyncFunc().finally(response => console.log(response))
      }
      else if(this.$store.state.carts.some(cart => cart.product_id === id)) {
        const asyncFunc = async() => {
          const cartId = this.$store.state.carts.find(cart => cart.product_id === id).id
          const cartQuantity = Number(this.$store.state.carts.find(cart => cart.product_id === id).quantity) + Number(quantity)
          const productQuantity = Number(this.$store.state.product.current.stock) - Number(quantity)
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
            this.$axios.$get(`/api/v1/products/${id}`)
          ])
          .then(response => {
            this.$store.dispatch('getCarts', response[0])
            this.$store.dispatch('getCurrentProduct', response[1])
          })
        }
        asyncFunc().finally(response => console.log(response))
      }
    }
  },
  computed: {
    currentProduct() {
      const copyProduct = this.$store.state.product.current
      return copyProduct
    },
    comments() {
      const copyComments = Array.from(this.$store.state.product.comment)
      return copyComments.sort((a, b) => {
        if (a.created_at < b.created_at) { return -1 }
        if (a.created_at > b.created_at) { return 1 }
        return 0
      })
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

<style lang="scss">
.likeColor {
  background: #CC0000 !important;
}
.dislikeColor {
  background: #336791 !important;
}
</style>