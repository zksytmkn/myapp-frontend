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
          検索
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
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-row
                    justify="center"
                  >
                    <v-col
                      cols="12"
                      sm="6"
                      md="9"
                    >
                      <v-text-field
                        class="mt-10"
                        label="名前"
                        v-model="searchedName"
                        dense
                      >
                      </v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="9"
                    >
                      <v-text-field
                        label="出品者"
                        v-model="searchedSeller"
                        dense
                      >
                      </v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="9"
                    >
                      <v-text-field
                        label="説明文"
                        v-model="searchedText"
                        dense
                      >
                      </v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="9"
                    >
                      <v-select
                        label="種類"
                        v-model="searchedType"
                        :items="typeItems"
                        multiple
                        chips
                        dense
                      >
                      </v-select>
                    </v-col>
    
                    <v-col
                      cols="12"
                      sm="6"
                      md="9"
                    >
                      <v-select
                        label="地方"
                        v-model="searchedRegion"
                        :items="regionItems"
                        multiple
                        chips
                        dense
                      >
                      </v-select>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="9"
                    >
                      <v-select
                        label="地域"
                        v-model="searchedPrefecture"
                        :items="prefectureItems"
                        multiple
                        chips
                        dense
                      >
                      </v-select>
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <v-row
                        justify="center"
                      >
                        <v-btn
                          @click="$store.dispatch('updateProductSearchCondition', { name: searchedName, seller: searchedSeller, text: searchedText, type: searchedType, region: searchedRegion, prefecture: searchedPrefecture })"
                          class="font-weight-bold mt-3 mb-9"
                          color="teal"
                          outlined
                          dark
                        >
                          農産物を検索する
                        </v-btn>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-list-item>
        <v-list-item-title
          class="font-weight-bold"
        >
          検索結果（{{ searchedProducts.length }}件）
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
    </v-container>
    <v-container>
      <v-row>
        <v-col
          v-for="product in searchedProducts.slice(this.pageSize*(this.page-1),this.pageSize*(this.page))"
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
      v-model="page"
      v-show="searchedProducts.length"
      :length="Math.ceil(this.searchedProducts.length/this.pageSize)"
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
      pageSize: 10,
      searchedName: '',
      searchedSeller: '',
      searchedText: '',
      searchedType: [],
      searchedRegion: [],
      searchedPrefecture: [],
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
  computed: {
    searchedProducts () {
      const searchCondition = this.$store.state.product.searchCondition

      let copySearchedProducts = Array.from(this.$store.state.product.list).
      filter((x) => x.name.includes(searchCondition.name) && x.seller.includes(searchCondition.seller))

      if (searchCondition.type.length !== 0) {
        copySearchedProducts = copySearchedProducts.filter((x) => searchCondition.type.some(str => x.type.includes(str)))
      }
      if (searchCondition.region.length !== 0) {
        copySearchedProducts = copySearchedProducts.filter((x) => searchCondition.region.some(str => x.region.includes(str)))
      }
      if (searchCondition.prefecture.length !== 0) {
        copySearchedProducts = copySearchedProducts.filter((x) => searchCondition.prefecture.some(str => x.prefecture.includes(str)))
      }

      return copySearchedProducts.sort((a, b) => {
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