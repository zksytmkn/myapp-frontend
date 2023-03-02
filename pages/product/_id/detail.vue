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
                      v-show="currentProduct.name.length>16"
                    >
                      {{ currentProduct.name.substring(0, 16)+'...' }}
                    </span>
                    <span
                      v-show="currentProduct.name.length<=16"
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
                      @click="addProductFavorite"
                      :class="{ likeColor: true}"
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
                      :class="{ dislikeColor: true }"
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

                  <v-card-subtitle>
                    <nuxt-link
                      :to="$my.userLinkToProfile(currentProduct.user_id)"
                      class="text-decoration-none grey--text text--darken-2"
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
                      v-show="currentProduct.text.length>300"
                    >
                      {{ currentProduct.text.substring(0, 300)+'...' }}
                    </span>
                    <span
                      v-show="currentProduct.text.length<=300"
                    >
                      {{ currentProduct.text }}
                    </span>
                  </v-card-text>
                  <v-card-title
                    class="font-weight-bold"
                  >
                    ¥{{ currentProduct.price.toLocaleString() }}
                  </v-card-title>
                  <v-divider/>
                  <v-container
                    v-if="currentProduct.user.id!==$auth.user.id"
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
                    v-if="currentProduct.user.id===$auth.user.id"
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
    addProductFavorite() {
      await this.$axios
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
        if (a.updated_at < b.updated_at) { return -1 }
        if (a.updated_at > b.updated_at) { return 1 }
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