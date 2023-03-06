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
            出品
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider/>
    </v-container>
    <v-container>
      <v-row
        justify="center"
      >
        <v-col
          cols="12"
        >
          <v-card>
            <v-form
              ref="new"
              v-model="isValid"
              @submit.prevent="addProduct"
            >
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      class="font-weight-bold"
                    >
                      農産物
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
  
                <v-divider/>
  
                <v-list-item>
                  <v-container>
                    <v-row
                      justify="center"
                    >
                      <v-col
                        cols="11"
                        class="mt-9"
                      >
                        <v-img
                          :src="url"
                          height=300px
                          width=300px
                        >
                        </v-img>
                        <v-file-input
                          :rules="imgRules"
                          accept="image/png, image/jpeg, image/bmp"
                          placeholder="画像を選択して下さい"
                          prepend-icon="mdi-camera"
                          label="画像ファイル"
                          v-model="inputted.image"
                        >
                        </v-file-input>
                      </v-col>
                      <v-col
                        cols="11"
                      >
                        <v-text-field
                          dense
                          outlined
                          label="名前"
                          v-model="inputted.name"
                          :rules="nameRules"
                          :disabled="sentIt"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col
                        cols="11"
                      >
                        <v-select
                          dense
                          outlined
                          label="種類"
                          :items="typeItems"
                          v-model="inputted.type"
                          :rules="typeRules"
                          :disabled="sentIt"
                        >
                        </v-select>
                      </v-col>
                      <v-col
                        cols="11"
                      >
                        <v-row>
                          <v-col
                            cols="6"
                          >
                            <v-text-field
                              dense
                              outlined
                              label="価格"
                              type="number"
                              v-model="inputted.price"
                              :rules="priceRules"
                              :disabled="sentIt"
                            >
                            </v-text-field>
                          </v-col>
                          <v-col
                            cols="6"
                          >
                            <v-text-field
                              dense
                              outlined
                              label="数量"
                              type="number"
                              v-model="inputted.inventory"
                              :rules="inventoryRules"
                              :disabled="sentIt"
                            >
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col
                        cols="11"
                      >
                        <v-textarea
                          dense
                          outlined
                          label="説明文"
                          v-model="inputted.text"
                          :rules="textRules"
                          :disabled="sentIt"
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
                            type="submit"
                            :disabled="!isValid || loading"
                            :loading="loading"
                            class="mb-6 mr-2 font-weight-bold white--text"
                            color="teal"
                          >
                            農産物を出品する
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
    <v-container>
      <v-list-item>
        <v-list-item-title
          class="font-weight-bold"
        >
          出品済み（{{ newProducts.length }}件）
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
      <v-list
        v-show="!newProducts.length"
        color="transparent"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              出品しておりません。
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
    <v-container>
      <v-row>
        <v-col
          v-for="product in newProducts.slice(this.pageSize*(this.page-1),this.pageSize*(this.page))"
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
      v-show="newProducts.length"
      :length="Math.ceil(this.newProducts.length/this.pageSize)"
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
    const nameMax = 16
    const textMax = 300
    return {
      noImg,
      page: 1,
      pageSize: 10,
      isValid: false,
      loading: false,
      imgRules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'
      ],
      nameRules: [
        nameMax,
        v => !!v || '',
        v => (!!v && nameMax >= v.length) || `${nameMax}文字以内で入力してください`
      ],
      typeRules: [
        v => !!v || '種類を選択してください'
      ],
      priceRules: [
        v => !!v || '価格を入力してください'
      ],
      inventoryRules: [
        v => !!v || '数量を入力してください'
      ],
      textRules: [
        textMax,
        v => !!v || '',
        v => (!!v && textMax >= v.length) || `${textMax}文字以内で入力してください`
      ],
      inputted: { name: '', user_id: this.$auth.user.id, type: '', prefecture: this.$auth.user.prefecture, price: null, quantity: 1, inventory: null, text: '', image: null },
      typeItems: [
        '野菜',
        '果物'
      ],
      prefectureItems: [
        '北海道',
        '青森県',
        '岩手県',
        '宮城県',
        '秋田県',
        '山形県',
        '福島県',
        '茨城県',
        '栃木県',
        '群馬県',
        '埼玉県',
        '千葉県',
        '東京都',
        '神奈川県',
        '新潟県',
        '富山県',
        '石川県',
        '福井県',
        '山梨県',
        '長野県',
        '岐阜県',
        '静岡県',
        '愛知県',
        '三重県',
        '滋賀県',
        '京都府',
        '大阪府',
        '兵庫県',
        '奈良県',
        '和歌山県',
        '鳥取県',
        '島根県',
        '岡山県',
        '広島県',
        '山口県',
        '徳島県',
        '香川県',
        '愛媛県',
        '高知県',
        '福岡県',
        '佐賀県',
        '長崎県',
        '熊本県',
        '大分県',
        '宮崎県',
        '鹿児島県',
        '沖縄県'
      ]
    }
  },
  methods: {
    addProduct () {
      this.loading = true
      if (this.isValid) {
        const asyncFunc = async() => {
          const formData = new FormData()
          formData.append('name', this.inputted.name)
          formData.append('user_id', this.inputted.user_id)
          formData.append('type', this.inputted.type)
          formData.append('prefecture', this.inputted.prefecture)
          formData.append('price', this.inputted.price)
          formData.append('quantity', this.inputted.quantity)
          formData.append('inventory', this.inputted.inventory)
          formData.append('text', this.inputted.text)
          if (this.inputted.image !== null) {
            formData.append('image', this.inputted.image)
          }
          const config = {
            header: {
              "Content-Type": "multipart/form-data"
            }
          }
          this.formReset()
          await this.$axios.$post('/api/v1/products', formData, config)
          .then(response => {
            const msg = '農産物を出品しました'
            const color = 'success'
            return this.$store.dispatch('getToast', { msg, color })
          })
          .catch(error => {
            console.log(error)
            const msg = '農産物を出品できませんでした'
            const color = 'error'
            return this.$store.dispatch('getToast', { msg, color })
          })
          await this.$axios.$get('api/v1/products')
          .then(products => this.$store.dispatch('getProductList', products))
        }
        asyncFunc().finally(response => console.log(response))
      }
      this.loading = false
    },
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
    formReset() {
      this.sentIt = false
      this.$refs.new.reset()
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
  },
  computed: {
    url() {
      if(this.inputted.image===null) {
        return noImg
      } else {
        return URL.createObjectURL(this.inputted.image)
      }
    },
    newProducts () {
      const copyNewProducts = Array.from(this.$store.state.product.list.filter((x) => x.user_id === this.$auth.user.id))
      return copyNewProducts.sort((a, b) => {
        if (a.updated_at > b.updated_at) { return -1 }
        if (a.updated_at < b.updated_at) { return 1 }
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