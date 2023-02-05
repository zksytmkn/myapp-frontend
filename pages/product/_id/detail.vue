<template>
  <div
    id="detail"
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
      <v-row>
        <v-col
          cols="12"
        >
          <v-card>
            <v-container>
              <v-row>
                <v-col
                  cols="4"
                >
                  <v-img
                    :src="currentProduct.image_url ? currentProduct.image_url : noImg"
                    max-height="360px"
                    max-width="360px"
                    aspect-ratio="1"
                  >
                  </v-img>
                  <v-card-title
                    class="font-weight-bold pa-1"
                    style="max-width:360px;"
                  >
                    {{ currentProduct.name }}
                    <v-card-subtitle>
                      by {{ currentProduct.seller }}
                    </v-card-subtitle>
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
                      @click="$store.dispatch('updateCurrentLikeState', currentProduct)"
                      :class="{ likeColor: currentProduct.like}"
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
                      @click="$store.dispatch('updateCurrentDislikeState', currentProduct)"
                      :class="{ dislikeColor: currentProduct.dislike }"
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
                    <v-btn
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
                  cols="8"
                >
                  <v-chip
                    class="ma-2 font-weight-bold"
                    outlined
                  >
                    <v-icon
                      v-if="currentProduct.type === '野菜'"
                      left
                    >
                      mdi-peanut-outline
                    </v-icon>
                    <v-icon
                      v-if="currentProduct.type === '果物'"
                      left
                    >
                      mdi-food-apple-outline
                    </v-icon>
                    {{ currentProduct.type }}
                  </v-chip>

                  <v-chip
                    class="ma-2 font-weight-bold"
                    outlined
                  >
                    <v-icon
                      left
                    >
                      mdi-map-outline
                    </v-icon>
                    {{ currentProduct.region }}
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

                  <v-card-text>
                    {{ currentProduct.text }}
                  </v-card-text>
                  <v-card-title
                    class="font-weight-bold"
                  >
                    ¥{{ currentProduct.price.toLocaleString() }}
                  </v-card-title>
                  <v-divider/>
                  <v-container
                    v-if="currentProduct.seller!==$auth.user.name"
                  >
                    <v-card-actions
                      class="pa-0"
                      style="width:40%;"
                    >
                      <v-select
                        @change="(quantity) => $store.dispatch('updateCurrentQuantity', quantity)"
                        :value="currentProduct.quantity"
                        class="mt-6"
                        :items="[...Array(currentProduct.inventory).keys()].map(i => ++i)"
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
                        @click="$store.dispatch('addCurrentProductToCart', currentProduct)"
                        :disabled="!currentProduct.inventory"
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
                    v-if="currentProduct.seller===$auth.user.name"
                  >
                    <v-card-actions
                      style="width:40%;"
                    >
                      <v-btn
                        @click="editCurrentProduct"
                        class="font-weight-bold"
                        color="deep-orange"
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
                        color="deep-orange"
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
  </div>
</template>

<script>
import noImg from '~/assets/images/logged-in/no.png'

export default {
  layout: 'logged-in',
  data () {
    return {
      noImg
    }
  },
  methods: {
    async editCurrentProduct() {
    },
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
        const msg = '農産物の削除に失敗しました'
        return this.$store.dispatch('getToast', { msg })
      })
    }
  },
  computed: {
    currentProduct () {
      const copyProduct = this.$store.state.product.current
      return copyProduct
    }
  }
}
</script>

<style lang="scss">
#detail {
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