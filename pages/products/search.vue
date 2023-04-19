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
                  cols="12"
                  sm="6"
                  md="9"
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
                  cols="12"
                  sm="6"
                  md="9"
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
                  cols="12"
                  sm="6"
                  md="9"
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
                  cols="12"
                  sm="6"
                  md="9"
                >
                  <v-select
                    v-model="searched.category"
                    label="種類"
                    :items="typeItems"
                    outlined
                    multiple
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

    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
          <v-list-item>
            <v-list-item-title
              class="font-weight-bold"
            >
              検索結果（{{ searchedProducts.length }}件）
            </v-list-item-title>
          </v-list-item>
          <v-divider/>
          <v-list-item
            v-show="!searchedProducts.length"
          >
            <v-list-item-title>
              該当する農産物はありませんでした。
            </v-list-item-title>
          </v-list-item>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col
          v-for="(product, i) in searchedProducts.slice(pageSize * (page - 1), pageSize * page)"
          :key="`product-${i}`"
          cols="6"
        >
          <v-card>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-img
                    :src="product.image_url || noImg"
                    max-height="360px"
                    max-width="360px"
                    aspect-ratio="1"
                  ></v-img>
                  <v-card-title class="font-weight-bold pa-1" style="max-width: 360px;">
                    {{ product.name.length > 7 ? product.name.substring(0, 7) + "..." : product.name }}
                    <v-spacer />
                    <v-btn text outlined :to="$my.productLinkToDetail(product.id)" class="font-weight-bold">詳細</v-btn>
                  </v-card-title>
                  <v-card-actions class="pa-1">
                    <div v-for="actionType in ['favorite', 'unfavorite']" :key="actionType + 'Wrapper'">
                      <div>
                        <v-btn
                          :key="actionType + 'Btn'"
                          :class="buttonClass(actionType, product.id)"
                          class="ml-0"
                          fab
                          dark
                          x-small
                          @click="handleFavorites(product.id, actionType, $store.state.product[actionType].some(item => item.id === product.id) ? 'delete' : 'post')"
                        >
                          <v-icon>
                            {{ actionType === 'favorite' ? 'mdi-thumb-up' : 'mdi-thumb-down' }}
                          </v-icon>
                        </v-btn>
                        <span :key="actionType + 'Count'" class="font-weight-bold ml-1" :class="{ 'mr-3': actionType === 'favorite' }">
                          {{
                            $store.state.product[actionType + 's'].filter(
                              item => item.product_id === product.id
                            ).length
                          }}
                        </span>
                      </div>
                    </div>
                  </v-card-actions>
                </v-col>

                <v-col cols="6">
                  <v-card-text>
                    {{
                      product.description.length > 80
                        ? product.description.substring(0, 80) + '...'
                        : product.description
                    }}
                  </v-card-text>
                  <v-card-title class="pt-0 font-weight-bold">
                    ¥{{ product.price.toLocaleString() }}
                  </v-card-title>
                  <v-divider />
                  <v-container :class="{'pt-0': product.user_id !== $auth.user.id}">
                    <template v-if="product.user_id !== $auth.user.id">
                      <v-card-actions class="pa-0" style="width: 80%;">
                        <v-select
                          v-show="product.stock"
                          :value="product.quantity"
                          class="mt-6"
                          :items="[...Array(product.stock).keys()].map(i => ++i)"
                          solo
                          dense
                          rounded
                          outlined
                          @change="quantity => $store.dispatch('getProductQuantity', { id: product.id, quantity: quantity })"
                        ></v-select>
                      </v-card-actions>
                      <v-card-text
                        v-show="!product.stock"
                        class="px-0 font-weight-bold"
                        style="color: #CC0000;"
                      >
                        ＊在庫が残っておりません。
                      </v-card-text>
                      <v-card-actions class="pa-0" style="width: 80%;">
                        <v-btn
                          :disabled="!product.stock"
                          class="font-weight-bold"
                          color="teal"
                          block
                          dark
                          @click="addProductToCart(product.id, product.quantity)"
                        >
                          カートに入れる
                        </v-btn>
                      </v-card-actions>
                    </template>
                    <template v-else>
                      <v-card-actions style="width: 86%;">
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
                      <v-card-actions style="width: 86%;">
                        <v-btn
                          class="font-weight-bold mt-2"
                          color="teal"
                          block
                          dark
                          @click="deleteProduct(product.id)"
                        >
                          削除する
                        </v-btn>
                      </v-card-actions>
                    </template>
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-pagination
      v-show="searchedProducts.length"
      v-model="page"
      class="my-6"
      :length="Math.ceil(searchedProducts.length/pageSize)"
      circle
    >
    </v-pagination>
  </div>
</template>

<script>
import noImg from '~/assets/images/logged-in/no.png'
export default {
  layout: 'logged-in',
  data () {
    return {
      noImg,
      page: 1,
      pageSize: 10,
      searched: { name: '', seller: '', description: '', category: [], prefecture: [] },
      searchedProducts: [],
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
  mounted() {
    this.searched.name = this.$store.state.product.searchCondition.name;
    this.searched.seller = this.$store.state.product.searchCondition.seller;
    this.searched.description = this.$store.state.product.searchCondition.description;
    this.searched.category = this.$store.state.product.searchCondition.category;
    this.searched.prefecture = this.$store.state.product.searchCondition.prefecture;

    this.calculateSearchedProducts();
  },
  methods: {
    async deleteProduct(id) {
      try {
        await this.$axios.$delete(`/api/v1/products/${id}`);
        this.showNotification("農産物を削除しました", "success");

        await this.$axios.$get("api/v1/products").then((products) =>
          this.$store.dispatch("getProductList", products)
        );
      } catch (error) {
        this.showNotification("農産物を削除できませんでした", "error");
      }
    },
    showNotification(msg, color) {
      this.$store.dispatch('getToast', { msg, color });
    },
    async handleFavorites(id, type, method) {
      try {
        if (method === 'delete') {
          await this.$axios[method](`/api/v1/product_${type}s/${id}/user/${this.$auth.user.id}`);
        } else {
          const formData = new FormData()
          formData.append('product_id', id)
          formData.append('user_id', this.$auth.user.id)
          await this.$axios[method](`/api/v1/product_${type}s`, formData)
        }
  
        await this.updateFavoritesAndUnfavorites();
      } catch (error) {
      }
    },
    async updateFavoritesAndUnfavorites() {
      const [userFavorites, allFavorites, userUnfavorites, allUnfavorites] = await Promise.all([
        this.$axios.$get(`api/v1/product_favorites/${this.$auth.user.id}`),
        this.$axios.$get('api/v1/product_favorites'),
        this.$axios.$get(`api/v1/product_unfavorites/${this.$auth.user.id}`),
        this.$axios.$get('api/v1/product_unfavorites')
      ]);

      this.$store.dispatch('getProductFavorite', userFavorites);
      this.$store.dispatch('getProductFavorites', allFavorites);
      this.$store.dispatch('getProductUnfavorite', userUnfavorites);
      this.$store.dispatch('getProductUnfavorites', allUnfavorites);
    },
    async addProductToCart(id, quantity) {
      try {
        const cart = this.$store.state.carts.find(cart => cart.product_id === id);
        const product = this.$store.state.product.list.find(product => product.id === id);
        const productQuantity = Number(product.stock) - Number(quantity);
        const formDataProducts = new FormData();
        formDataProducts.append('stock', productQuantity);

        if (!cart) {
          const formDataCarts = new FormData();
          formDataCarts.append('user_id', this.$auth.user.id);
          formDataCarts.append('product_id', id);
          formDataCarts.append('quantity', quantity);

          await Promise.all([
            this.$axios.$post('/api/v1/carts', formDataCarts),
            this.$axios.$patch(`/api/v1/products/${id}`, formDataProducts)
          ]);
        } else {
          const cartQuantity = Number(cart.quantity) + Number(quantity);
          const formDataCarts = new FormData();
          formDataCarts.append('quantity', cartQuantity);
        
          await Promise.all([
            this.$axios.$patch(`/api/v1/carts/${cart.id}`, formDataCarts),
            this.$axios.$patch(`/api/v1/products/${id}`, formDataProducts)
          ]);
        }

        const [cartsResponse, productsResponse] = await Promise.all([
          this.$axios.$get('/api/v1/carts'),
          this.$axios.$get('/api/v1/products')
        ]);

        this.$store.dispatch('getCarts', cartsResponse);
        this.$store.dispatch('getProductList', productsResponse);

        this.calculateSearchedProducts();
      } catch (error) {
      }
    },
    buttonClass(actionType, id) {
      if (actionType === 'favorite' && this.$store.state.product.favorite.some(item => item.id === id)) {
        return 'likeColor';
      } else if (actionType === 'unfavorite' && this.$store.state.product.unfavorite.some(item => item.id === id)) {
        return 'dislikeColor';
      } else {
        return 'grey';
      }
    },
    updateSearchCondition() {
      this.$store.dispatch('updateProductSearchCondition', {
        name: this.searched.name,
        seller: this.searched.seller,
        description: this.searched.description,
        category: this.searched.category,
        prefecture: this.searched.prefecture
      });

      this.calculateSearchedProducts();
    },
    calculateSearchedProducts() {
      const { name, seller, category, prefecture, description } = this.searched;

      let copySearchedProducts = Array.from(this.$store.state.product.list)

      if (name && name.length) {
        copySearchedProducts = copySearchedProducts.filter((x) =>
          x.name.includes(name)
        );
      }

      if (seller && seller.length) {
        copySearchedProducts = copySearchedProducts.filter((x) =>
          x.user.name.includes(seller)
        );
      }

      if (category && category.length) {
        copySearchedProducts = copySearchedProducts.filter((x) =>
          category.some((str) => x.category.includes(str))
        );
      }
    
      if (prefecture && prefecture.length) {
        copySearchedProducts = copySearchedProducts.filter((x) =>
          prefecture.some((str) => x.prefecture.includes(str))
        );
      }
    
      if (description && description.length) {
        copySearchedProducts = copySearchedProducts.filter((x) =>
          x.description.includes(description)
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

<style lang="scss">
.likeColor {
  background: #CC0000 !important;
}
.dislikeColor {
  background: #336791 !important;
}
</style>