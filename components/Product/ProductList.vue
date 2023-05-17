<template>
  <div>
    <v-container v-show="products.length">
      <v-row>
        <v-col
          v-for="(product, i) in products.slice(pageSize * (page - 1), pageSize * page)"
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
                      <v-card-actions class="pa-0" style="width: 80%;">
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
      v-show="products.length"
      v-model="localPage"
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
    products: {
      type: Array,
      default: () => [],
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    page: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      noImg,
      localPage: this.page,
      selectedQuantity: {}
    };
  },
  computed: {
    ...mapGetters(['productButtonClass']),
  },
  watch: {
    page(newVal) {
      this.localPage = newVal;
    },
    localPage(newVal) {
      if (newVal !== this.page) {
        this.$emit('update:page', newVal);
      }
    },
    products: {
      immediate: true,
      handler(newList) {
        newList.forEach(product => {
          this.$set(this.selectedQuantity, product.id, 1);
        });
      }
    },
  },
  methods: {
    async deleteProduct(id) {
      try {
        if (!confirm('本当にこの農産物を削除しますか？')) {
          return;
        }

        await this.$axios.$delete(`/api/v1/products/${id}`);
        this.$store.dispatch('getToast', { msg: '農産物を削除しました', color: 'success' });

        await this.$axios.$get("api/v1/products").then((products) =>
          this.$store.dispatch("getProductList", products)
        );
      } catch (error) {
        this.$store.dispatch('getToast', { msg: '農産物を削除できませんでした', color: 'error' });
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
          await this.$axios[method](`/api/v1/product_${type}s`, { product_id: id });
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
    addProductToCart(id, quantity) {
      this.$store.dispatch('addProductToCart', { id, quantity });
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
</style>