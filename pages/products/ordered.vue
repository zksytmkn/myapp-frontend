<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-list-item>
            <v-list-item-title class="font-weight-bold">
              購入済み（{{ orderedProducts.length }}件）
            </v-list-item-title>
          </v-list-item>
          <v-divider/>
          <v-list v-show="!orderedProducts.length" color="transparent">
            <v-list-item>
              <v-list-item-title>
                購入しておりません。
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
          v-for="(product, i) in orderedProducts.slice(pageSize * (page - 1), pageSize * page)"
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
                    <span>
                    {{ product.name.length > 7 ? product.name.substring(0, 7) + "..." : product.name }}
                    </span>
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
      v-show="orderedProducts.length"
      v-model="page"
      class="my-6"
      :length="Math.ceil(orderedProducts.length/pageSize)"
      circle
    >
    </v-pagination>
  </div>
</template>

<script>
import noImg from '~/assets/images/logged-in/no.png'
export default {
  layout: 'logged-in',
  middleware: ['get-order-list'],
  data () {
    return {
      noImg,
      page: 1,
      pageSize: 10
    }
  },
  computed: {
    orderedProducts() {
      const orderList = this.$store.state.order.list;
      const allOrders = orderList.buyer.concat(orderList.close);

      return this.$store.state.product.list
        .filter(product => allOrders.some(order => order.product_id === product.id))
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    },
  },
  methods: {
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