<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-list-item class="font-weight-bold">
            いいね（{{ likeProducts.length }}件）
          </v-list-item>
          <v-divider/>
          <v-list v-show="!likeProducts.length" color="transparent">
            <v-list-item>
              <v-list-item-title>
                いいねしておりません。
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
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col
          v-for="product in likeProducts.slice(pageSize*(page-1),pageSize*(page))"
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
                    {{ product.name.length > 7 ? product.name.substring(0, 7) + '...' : product.name }}
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
                          @change="quantity => $store.dispatch('getProductFavoriteQuantity', { id: product.id, quantity: quantity })"
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
      v-show="likeProducts.length"
      v-model="page"
      class="my-6"
      :length="Math.ceil(likeProducts.length/pageSize)"
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
      pageSize: 10
    }
  },
  computed: {
    likeProducts() {
      return [...this.$store.state.product.favorite].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
  },
  methods: {
    async deleteProduct(id) {
      try {
        await this.$axios.$delete(`/api/v1/products/${id}`);
        this.showNotification("農産物を削除しました", "success");
  
        await this.$axios.$get("api/v1/products").then((products) =>
          this.$store.dispatch("getProductList", products)
        );
        // Update favorites and unfavorites list after deleting the product
        await this.updateFavoritesAndUnfavorites();
      } catch (error) {
        this.showNotification("農産物を削除できませんでした", "error");
      }
    },
    showNotification(msg, color) {
      this.$store.dispatch('getToast', { msg, color });
    },
    async addProductToCart(id, quantity) {
      if (
        !this.$store.state.user.login.zipcode ||
        !this.$store.state.user.login.street ||
        !this.$store.state.user.login.building
      ) {
        this.showNotification("まずは住所を編集してください", "error");
        return;
      }

      try {
        const cart = this.$store.state.carts.find(cart => cart.product_id === id);
        const product = this.$store.state.product.list.find(product => product.id === id);
        const productQuantity = Number(product.stock) - Number(quantity);

        if (!cart) {
          await Promise.all([
            this.$axios.$post('/api/v1/carts', { product_id: id, quantity }),
            this.$axios.$patch(`/api/v1/products/${id}`, { stock: productQuantity })
          ]);
        } else {
          const cartQuantity = Number(cart.quantity) + Number(quantity);

          await Promise.all([
            this.$axios.$patch(`/api/v1/carts/${cart.id}`, { quantity: cartQuantity }),
            this.$axios.$patch(`/api/v1/products/${id}`, { stock: productQuantity })
          ]);
        }

        const [cartsResponse, productsResponse, favoritesResponse] = await Promise.all([
          this.$axios.$get('/api/v1/carts'),
          this.$axios.$get('/api/v1/products'),
          this.$axios.$get(`/api/v1/product_favorites/${this.$auth.user.id}`)
        ]);

        this.$store.dispatch('getCarts', cartsResponse);
        this.$store.dispatch('getProductList', productsResponse);
        this.$store.dispatch('getProductFavorite', favoritesResponse);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    async handleFavorites(id, type, method) {
      try {
        if (method === 'delete') {
          await this.$axios[method](`/api/v1/product_${type}s/${id}`);
        } else {
          await this.$axios[method](`/api/v1/product_${type}s`, { product_id: id });
        }

        await this.updateFavoritesAndUnfavorites();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
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
    buttonClass(actionType, id) {
      if (actionType === 'favorite' && this.$store.state.product.favorite.some(item => item.id === id)) {
        return 'likeColor';
      } else if (actionType === 'unfavorite' && this.$store.state.product.unfavorite.some(item => item.id === id)) {
        return 'dislikeColor';
      } else {
        return 'grey';
      }
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