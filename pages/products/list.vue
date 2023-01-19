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
          全ての農産物（{{ products.length }}件）
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
    </v-container>
    <v-container>
      <v-row>
        <v-col
          v-for="product in products"
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
                    ¥{{ product.price }}
                  </v-card-title>
                  <v-divider/>
                  <v-card-actions
                    class="pa-0"
                    style="width:60%;"
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
                    style="width:60%;"
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
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-pagination
      class="my-6"
      v-model="page"
      :length="6"
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
      page: 1
    }
  },
  computed: {
    products () {
      const copyproducts = Array.from(this.$store.state.product.list)
      return copyproducts.sort((a, b) => {
        if (a.updatedAt > b.updatedAt) { return -1 }
        if (a.updatedAt < b.updatedAt) { return 1 }
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