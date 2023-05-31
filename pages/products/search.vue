<template>
  <div>
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
                <v-list-item-title
                  class="font-weight-bold"
                >
                  検索条件
                </v-list-item-title>
              </v-list-item>
            </v-list>
            <v-divider/>
            
            <v-container>
              <v-row
                justify="center"
              >
                <v-col
                  cols="9"
                >
                  <v-text-field
                    v-model="searched.name"
                    class="mt-10"
                    label="名前"
                    outlined
                    dense
                  >
                  </v-text-field>
                </v-col>

                <v-col
                  cols="9"
                >
                  <v-text-field
                    v-model="searched.seller"
                    label="出品者"
                    outlined
                    dense
                  >
                  </v-text-field>
                </v-col>

                <v-col
                  cols="9"
                >
                  <v-text-field
                    v-model="searched.description"
                    label="説明文"
                    outlined
                    dense
                  >
                  </v-text-field>
                </v-col>
  
                <v-col
                  cols="9"
                >
                  <v-select
                    v-model="searched.category"
                    label="種類"
                    :items="categoryItems"
                    outlined
                    multiple
                    dense
                  >
                  </v-select>
                </v-col>
  
                <v-col
                  cols="9"
                >
                  <v-select
                    v-model="searched.prefecture"
                    label="都道府県"
                    :items="prefectureItems"
                    outlined
                    multiple
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
                      class="font-weight-bold mt-3 mb-9"
                      color="teal"
                      dark
                      @click="updateSearchCondition"
                    >
                      農産物を検索する
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <ProductList
      title="検索結果"
      message="該当する農産物はありませんでした。"
      :products="searchedProducts"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      searched: { name: '', seller: '', description: '', category: [], prefecture: [] },
      searchedProducts: [],
      categoryItems: [
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
  watch: {
    '$store.state.carts': {
      deep: true,
      handler() {
        this.calculateSearchedProducts();
      }
    }
  },
  mounted() {
    this.searched = {...this.$store.state.product.searchCondition};
    this.calculateSearchedProducts();
  },
  methods: {
    updateSearchCondition() {
      this.$store.commit('setProductSearchCondition', { ...this.searched });
      this.calculateSearchedProducts();
    },
    calculateSearchedProducts() {
      const { name, seller, category, prefecture, description } = this.searched;

      let copySearchedProducts = Array.from(this.$store.state.product.list)

      if (name && name.length) {
        copySearchedProducts = copySearchedProducts.filter((product) =>
          product.name.includes(name)
        );
      }

      if (seller && seller.length) {
        copySearchedProducts = copySearchedProducts.filter((product) =>
          product.user.name.includes(seller)
        );
      }

      if (category && category.length) {
        copySearchedProducts = copySearchedProducts.filter((product) =>
          category.some((str) => product.category.includes(str))
        );
      }
    
      if (prefecture && prefecture.length) {
        copySearchedProducts = copySearchedProducts.filter((product) =>
          prefecture.some((str) => product.prefecture.includes(str))
        );
      }
    
      if (description && description.length) {
        copySearchedProducts = copySearchedProducts.filter((product) =>
          product.description.includes(description)
        );
      }
    
      this.searchedProducts = copySearchedProducts.sort((a, b) => {
        if (a.created_at > b.created_at) return -1;
        if (a.created_at < b.created_at) return 1;
        return 0;
      });
    },
  }
}
</script>