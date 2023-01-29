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
          出品
        </v-list-item-title>
      </v-list-item>
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
                  <v-list-item-title
                    class="font-weight-bold"
                  >
                    農産物
                  </v-list-item-title>
                </v-list-item>
  
                <v-divider/>
  
                <v-list-item>
                  <v-list-item-content>
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
                        <v-btn
                          dark
                          outlined
                          class="mr-2 font-weight-bold"
                          color="teal"
                          @click="upload"
                        >
                          画像をアップロードする
                        </v-btn>
                        <v-btn
                          dark
                          outlined
                          class="mr-2 font-weight-bold"
                          color="teal"
                        >
                          画像を削除する
                        </v-btn>
                      </v-col>
                      <v-col
                        cols="11"
                      >
                        <v-text-field
                          dense
                          outlined
                          class="mt-6"
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
                          small-chips
                        >
                        </v-select>
                      </v-col>
  
                      <v-col
                        cols="11"
                      >
                        <v-select
                          dense
                          outlined
                          label="地方"
                          :items="regionItems"
                          v-model="inputted.region"
                          :rules="regionRules"
                          small-chips

                        >
                        </v-select>
                      </v-col>
                      <v-col
                        cols="11"
                      >
                        <v-select
                          dense
                          outlined
                          label="地域"
                          :items="prefectureItems"
                          v-model="inputted.prefecture"
                          :rules="prefectureRules"
                          :disabled="sentIt"
                          small-chips
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
                          label="紹介文"
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
                  </v-list-item-content>
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
      <v-container
        v-show="!newProducts.length"
      >
        <v-row>
          <v-col
            cols="12"
          >
            <p>
              出品しておりません。
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
    <v-container>
      <v-row>
        <v-col
          v-for="product in newProducts"
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
                    ¥{{ product.price.toLocaleString() }}
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
      image: null,
      isValid: false,
      loading: false,
      imgRules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'
      ],
      nameRules: [
        v => !!v || '名前を入力してください'
      ],
      typeRules: [
        v => !!v || '種類を選択してください'
      ],
      regionRules: [
        v => !!v || '地方を選択してください'
      ],
      prefectureRules: [
        v => !!v || '地域を選択してください'
      ],
      priceRules: [
        v => !!v || '価格を入力してください'
      ],
      inventoryRules: [
        v => !!v || '数量を入力してください'
      ],
      textRules: [
        v => !!v || '紹介文を入力してください'
      ],
      inputted: { name: '', seller: this.$auth.user.name, type: '', region: '', prefecture: '', price: null, quantity: 1, inventory: null, text: '', image: [] },
      typeItems: [
        '野菜',
        '果物'
      ],
      regionItems: [
        '北海道地方',
        '東北地方',
        '関東地方',
        '中部地方',
        '近畿地方',
        '中国地方',
        '四国地方',
        '九州地方'
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
    async upload () {
      const formData = new FormData()
      formData.append("image", this.inputted.image)
      const config = {
        header: {
          "Content-Type": "multipart/form-data"
        }
      }
      const res = await this.$axios.post('post', formData, config)
      console.log(res)
    },
    async addProduct () {
      this.loading = true
      if (this.isValid) {
        await this.$axios.$post('/api/v1/products', this.inputted)
        .then(response => {
          this.$router.go({path: '/products/new', force: true})
          const msg = '農産物を出品しました'
          const color = 'success'
          return this.$store.dispatch('getToast', { msg, color })
        })
        .catch(error => {
          console.log(error)
          const msg = '農産物の出品に失敗にしました'
          return this.$store.dispatch('getToast', { msg })
        })
      }
      this.loading = false
    },
    formReset () {
      this.sentIt = false
      this.$refs.new.reset()
    }
  },
  computed: {
    url() {
      if(this.image===null) {
        return noImg
      } else {
        return URL.createObjectURL(this.image)
      }
    },
    newProducts () {
      const copyNewProducts = Array.from(this.$store.state.product.list.filter((x) => x.seller === this.$auth.user.name))
      return copyNewProducts.sort((a, b) => {
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