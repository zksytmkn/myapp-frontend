<template>
  <div
    id="products"
  >
    <logged-in-app-product-eye-catch>
      <template
        v-slot
      >
        Various agricultural products are here !
        Please look around and enjoy it !
      </template>
    </logged-in-app-product-eye-catch>
    <v-container>
      <v-list-item>
        <v-list-item-title
          class="font-weight-bold"
        >
          いいね（{{ likeProducts.length }}件）
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
      <v-container
        v-show="!likeProducts.length"
      >
        <v-row>
          <v-col
            cols="12"
          >
            <p>
              いいねしておりません。
            </p>
            <v-btn
              class="font-weight-bold"
              color="orange"
              outlined
              dark
              to="/products/list"
            >
              農産物を見てみる
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
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
                    {{ product.name }}
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
                      @click="$store.dispatch('updateDislikeState', product)"
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
                  <v-card-text>
                    {{ product.text }}
                  </v-card-text>
                  <v-card-title
                    class="pt-0 font-weight-bold"
                  >
                    ¥{{ product.price.toLocaleString() }}
                  </v-card-title>
                  <v-divider/>
                  <v-container
                    v-if="product.seller!==$auth.user.name"
                  >
                    <v-card-actions
                      class="pa-0"
                      style="width:80%;"
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
                      <v-card-text
                        class="px-0 pt-0 font-weight-bold"
                        style="color:#CC0000;"
                        v-show="!product.inventory"
                      >
                        ＊在庫が残っておりません。
                      </v-card-text>
                    </v-card-actions>
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
                  </v-container>
                  <v-container
                    v-if="product.seller===$auth.user.name"
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
        const msg = '農産物の削除に失敗しました'
        return this.$store.dispatch('getToast', { msg })
      })
    }
  },
  computed: {
    likeProducts () {
      const copyLikeProducts = Array.from(this.$store.state.product.list.filter((x) => x.like === true))
      return copyLikeProducts.sort((a, b) => {
        if (a.updated_at > b.updated_at) { return -1 }
        if (a.updated_at < b.updated_at) { return 1 }
        return 0
      })
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
.likeColor {
  background: #CC0000 !important;
}
.dislikeColor {
  background: #336791 !important;
}
</style>