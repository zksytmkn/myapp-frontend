<template>
  <div>
    <v-container>
      <v-list-item>
        <v-list-item-title
          class="font-weight-bold"
        >
          {{ title }}（{{ products.length }}件）
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
      <v-list-item
        v-show="!products.length && !otherProducts"

      >
        <v-list-item-title>
          {{ message }}
        </v-list-item-title>
      </v-list-item>
      <v-list v-show="!products.length && otherProducts" color="transparent">
        <v-list-item>
          <v-list-item-title>
            {{ message }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-btn
              class="font-weight-bold"
              color="orange"
              outlined
              dark
              to="/products/list"
            >
              農産物を見る
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-container>
    <v-container v-show="products.length">
      <v-row>
        <v-col
          v-for="(product, i) in products.slice(pageSize * (page - 1), pageSize * page)"
          :key="`product-${i}`"
          cols="6"
          class="my-col"
        >
          <v-card>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-img
                    :src="product.image_url || noImg"
                    aspect-ratio="1"
                  ></v-img>
                  <v-card-title class="font-weight-bold pa-1">
                    <template v-if="screenWidth <= 1263 && product.name.length >= 7">
                      {{ product.name }}
                    </template>
                    <template v-else>
                      {{ product.name.length > 7 ? product.name.substring(0, 7) + "..." : product.name }}
                    </template>
                    <v-spacer />
                    <v-btn text outlined :to="$my.productLinkToDetail(product.id)" class="font-weight-bold">詳細</v-btn>
                  </v-card-title>
                  <v-card-actions class="pa-1">
                    <div v-for="actionType in ['favorite', 'unfavorite']" :key="actionType + 'Wrapper'">
                      <div>
                        <v-btn
                          :key="actionType + 'Btn'"
                          :class="productButtonClass(actionType, product.id)"
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
                            actionType === 'favorite' ? product.favorites_count : product.unfavorites_count
                          }}
                        </span>
                      </div>
                    </div>
                  </v-card-actions>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-card-text class="pa-1">
                    {{
                      product.description.length > 80
                        ? product.description.substring(0, 80) + '...'
                        : product.description
                    }}
                  </v-card-text>
                  <v-card-title class="pa-1 font-weight-bold">
                    ¥{{ product.price.toLocaleString() }}
                  </v-card-title>
                  <v-divider />
                  <v-container :class="{'pt-0': product.user_id !== $auth.user.id}">
                    <template v-if="product.user_id !== $auth.user.id">
                      <v-card-actions class="pa-0">
                        <v-select
                          v-show="product.stock"
                          ref="quantitySelect"
                          v-model="selectedQuantity[product.id]"
                          class="mt-6"
                          :items="[...Array(product.stock).keys()].map(i => ++i)"
                          solo
                          dense
                          rounded
                          outlined
                        ></v-select>
                      </v-card-actions>
                      <v-card-text
                        v-show="!product.stock"
                        class="px-0 font-weight-bold"
                        style="color: #CC0000;"
                      >
                        ＊在庫が残っておりません。
                      </v-card-text>
                      <v-card-actions class="pa-0">
                        <v-btn
                          :disabled="!product.stock"
                          class="font-weight-bold"
                          color="teal"
                          block
                          dark
                          @click="addProductToCart(product.id, selectedQuantity[product.id])"
                        >
                          カートに入れる
                        </v-btn>
                      </v-card-actions>
                    </template>
                    <template v-else>
                      <v-card-actions>
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
                      <v-card-actions>
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
      v-show="products.length"
      v-model="page"
      class="my-6"
      :length="Math.ceil(products.length/pageSize)"
      circle
    >
    </v-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import noImg from '~/assets/images/logged-in/no.png'

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    products: {
      type: Array,
      default: () => [],
    },
    otherProducts: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      noImg,
      selectedQuantity: {},
      page: 1,
      pageSize: 10,
      screenWidth: 0,
    };
  },
  computed: {
    ...mapGetters(['productButtonClass']),
  },
  watch: {
    products: {
      immediate: true,
      handler(newList) {
        newList.forEach(product => {
          this.$set(this.selectedQuantity, product.id, 1);
        });
      }
    },
  },
  mounted() {
    window.addEventListener('resize', this.updateScreenWidth);
    this.updateScreenWidth();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateScreenWidth);
  },
  methods: {
    async deleteProduct(id) {
      try {
        if (!confirm('本当に農産物を削除しますか？')) {
          return;
        }

        await this.$axios.$delete(`/api/v1/products/${id}`);
        this.$store.dispatch('getToast', { msg: '農産物を削除しました', color: 'success' });

        await this.$axios.$get("api/v1/products").then((products) =>
          this.$store.dispatch("getProductList", products)
        );
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        let errorMsg = "農産物を削除できませんでした";
        if (error.response && error.response.data && error.response.data.error) {
          errorMsg = error.response.data.error;
        }
        this.$store.dispatch('getToast', { msg: errorMsg, color: "error" });
      }
    },
    async handleFavorites(id, type, method) {
      try {
        // ログインユーザーのproduct_favoritesとproduct_unfavoritesを取得し、Vuexストアに反映
        const favoriteResponses = this.$store.state.product.favorite;
        const unfavoriteResponses = this.$store.state.product.unfavorite;

        // APIリクエストを送信
        if (method === 'delete') {
          await this.$axios[method](`/api/v1/product_${type}s/${id}/user`);
        } else {
          await this.$axios[method](`/api/v1/product_${type}s`, { [`product_${type}`]: { product_id: id } });
        }

        // 更新後のログインユーザーのproduct_favoritesとproduct_unfavoritesを取得し、Vuexストアに反映
        const [updatedFavoriteResponses, updatedUnfavoriteResponses] = await Promise.all([
          this.$axios.$get('api/v1/product_favorites'),
          this.$axios.$get('api/v1/product_unfavorites')
        ]);

        // Vuexストア内のデータを直接更新
        if (method === 'post') {
          if (type === 'favorite') {
            if (unfavoriteResponses.some(unfavorite => unfavorite.id === id)) {
              this.$store.commit('decrementProductUnfavoritesCount', id);
            }
            this.$store.commit('incrementProductFavoritesCount', id);
          } else {
            if (favoriteResponses.some(favorite => favorite.id === id)) {
              this.$store.commit('decrementProductFavoritesCount', id);
            }
            this.$store.commit('incrementProductUnfavoritesCount', id);
          }
        } else if (method === 'delete') {
          if (type === 'favorite') {
            this.$store.commit('decrementProductFavoritesCount', id);
          } else {
            this.$store.commit('decrementProductUnfavoritesCount', id);
          }
        }

        this.$store.dispatch('getProductFavorite', updatedFavoriteResponses);
        this.$store.commit('setProductUnfavorite', updatedUnfavoriteResponses);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    async addProductToCart(id, quantity) {
      if (
        !this.$auth.user.zipcode ||
        !this.$auth.user.street ||
        !this.$auth.user.building
      ) {
        this.$store.dispatch('getToast', { msg: "まずは住所を編集してください", color: "error" });
        return;
      }

      try {
        const cart = this.$store.state.carts.find(cart => cart.product_id === id);

        if (!cart) {
          await this.$axios.$post('/api/v1/carts', { cart: { product_id: id, quantity } });
        } else {
          const cartQuantity = Number(cart.quantity) + Number(quantity);
          await this.$axios.$patch(`/api/v1/carts/${cart.id}`, { cart: { quantity: cartQuantity } });
        }

        const [carts, products] = await Promise.all([
          this.$axios.$get('/api/v1/carts'),
          this.$axios.$get('/api/v1/products')
        ]);

        this.$store.commit('setCart', carts);
        this.$store.dispatch('getProductList', products);
        this.$store.dispatch('getToast', { msg: "カートに入れました", color: "success" });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        let errorMsg = "カートに入れられませんでした";
        if (error.response && error.response.data && error.response.data.error) {
          errorMsg = error.response.data.error;
        }
        this.$store.dispatch('getToast', { msg: errorMsg, color: "error" });
      }
    },
    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    },
  },
};
</script>

<style lang="scss">
.likeColor {
  background: #CC0000 !important;
}
.dislikeColor {
  background: #336791 !important;
}
@media (min-width: 1264px) {
  .my-col {
    flex: 0 0 50%;
    max-width: 50%;
  }
}
@media (max-width: 1263px) {
  .my-col {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>