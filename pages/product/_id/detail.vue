<template>
  <div
    id="product"
  >
    <logged-in-app-product-eye-catch/>
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
                      v-if="currentProduct.type === '野菜'"
                      left
                    >
                      mdi-seed-outline
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
                <v-spacer />
                <v-card-subtitle>
                  {{ comment.updated_at }}
                </v-card-subtitle>
                <v-card-subtitle>
                  <logged-in-app-comment-detail/>
                </v-card-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-text>
                  {{ comment.comment_content }}
                </v-list-item-text>
              </v-list-item>
              <v-divider/>
            </v-list>
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
                        hide-details
                        rows="2"
                        placeholder="コメントを追加する"
                      >
                      </v-textarea>
                    </v-col>
                    <v-col
                      cols="11"
                    >
                      <v-row
                        justify="center"
                      >
                        <v-btn
                          text
                          outlined
                          class="font-weight-bold mt-3 mb-3"
                        >
                          コメントする
                        </v-btn>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-list-item> 
            </v-list>
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
  middleware: ['get-product-comment'],
  data () {
    return {
      noImg,
      comment: false
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
        const msg = '農産物の削除に失敗しました'
        return this.$store.dispatch('getToast', { msg })
      })
    }
  },
  computed: {
    currentProduct() {
      const copyProduct = this.$store.state.product.current
      return copyProduct
    },
    comments() {
      const copyComments = Array.from(this.$store.state.product.comment.list)
      return copyComments.sort((a, b) => {
        if (a.updated_at > b.updated_at) { return -1 }
        if (a.updated_at < b.updated_at) { return 1 }
        return 0
      })
    }
  }
}
</script>

<style lang="scss">
#product {
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