<template>
  <div
    id="product"
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
      <v-list-item>
        <v-list-item-title
          class="font-weight-bold"
        >
          編集
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
              ref="edit"
              v-model="isValid"
              @submit.prevent="editProduct($store.state.product.current.id)"
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
                      </v-col>
                      <v-col
                        cols="11"
                      >
                        <v-text-field
                          dense
                          outlined
                          label="名前"
                          :rules="nameRules"
                          :disabled="sentIt"
                          v-model="inputted.name"
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
                          :rules="typeRules"
                          :disabled="sentIt"
                          v-model="inputted.type"
                        >
                        </v-select>
                      </v-col>
                      <v-col
                        cols="11"
                      >
                        <v-select
                          dense
                          outlined
                          label="都道府県"
                          :items="prefectureItems"
                          :rules="prefectureRules"
                          :disabled="sentIt"
                          v-model="inputted.prefecture"
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
                              :rules="priceRules"
                              :disabled="sentIt"
                              v-model="inputted.price"
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
                              :rules="inventoryRules"
                              :disabled="sentIt"
                              v-model="inputted.quantity"
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
                          :rules="textRules"
                          :disabled="sentIt"
                          v-model="inputted.text"
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
                            農産物を編集する
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
      prefectureRules: [
        v => !!v || '都道府県を選択してください'
      ],
      priceRules: [
        v => !!v || '価格を入力してください'
      ],
      inventoryRules: [
        v => !!v || '数量を入力してください'
      ],
      textRules: [
        v => !!v || '説明文を入力してください'
      ],
      inputted: { name: '', seller: this.$auth.user.name, type: '', prefecture: '', price: null, quantity: 1, inventory: null, text: '', image: null },
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
    async editProduct(id) {
      this.loading = true
      if (this.isValid) {
        const formData = new FormData()
        formData.append('name', this.inputted.name)
        formData.append('seller', this.inputted.seller)
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
        await this.$axios.$patch(`/api/v1/products/${id}`, formData, config)
        .then(response => {
          this.$router.back()
          const msg = '農産物を編集しました'
          const color = 'success'
          return this.$store.dispatch('getToast', { msg, color })
        })
        .catch(error => {
          console.log(error)
          const msg = '農産物の削除に失敗しました'
          return this.$store.dispatch('getToast', { msg })
        })
      }
      this.loading = false
    },
    formReset() {
      this.sentIt = false
      this.$refs.edit.reset()
    }
  },
  computed: {
    url() {
      if(this.inputted.image===null) {
        return this.$store.state.product.current.image_url ? this.$store.state.product.current.image_url : noImg
      } else {
        return URL.createObjectURL(this.inputted.image)
      }
    }
  },
  mounted() {
    this.inputted.name = this.$store.state.product.current.name
    this.inputted.type = this.$store.state.product.current.type
    this.inputted.prefecture = this.$store.state.product.current.prefecture
    this.inputted.price = this.$store.state.product.current.price
    this.inputted.inventory = this.$store.state.product.current.inventory
    this.inputted.text = this.$store.state.product.current.text
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