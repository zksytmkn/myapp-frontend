<template>
  <div>
    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
          <v-list-item>
            <v-list-item-title
              class="font-weight-bold"
            >
              あなたのカート
            </v-list-item-title>
          </v-list-item>
          <v-divider/>
          <v-list
            v-show="!cartProducts.length"
            color="transparent"
          >
            <v-list-item>
              <v-list-item-title>
                カートには何も入っておりません。
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
          <v-list
            v-show="cartProducts.length"
            color="transparent"
          >
            <v-list-item>
              <v-list-item-title
                class="font-weight-bold"
              >
                合計（税込）：¥{{ Math.floor(cartTotalPrice).toLocaleString() }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-btn
                class="font-weight-bold"
                color="teal"
                dark
                to="/products/register"
              >
                レジに進む
              </v-btn>
              <v-btn
                class="font-weight-bold ml-2"
                color="teal"
                outlined
                dark
                to="/products/list"
              >
                一覧に戻る
              </v-btn>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col
          v-for="(cart, i) in cartProducts"
          :key="`cart-${i}`"
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
                    {{ cart.product.name.length > 7 ? cart.product.name.substring(0, 7) + '...' : cart.product.name }}
                    <v-spacer />
                    <v-btn
                      text
                      outlined
                      :to="$my.productLinkToDetail(cart.product_id)"
                      class="font-weight-bold"
                      style="text-transform:none"
                    >
                      詳細
                    </v-btn>
                  </v-card-title>
                  <v-card-actions class="pa-1">
                    <div v-for="actionType in ['favorite', 'unfavorite']" :key="actionType + 'Wrapper'">
                      <div>
                        <v-btn
                          :key="actionType + 'Btn'"
                          :class="buttonClass(actionType, cart.product_id)"
                          class="ml-0"
                          fab
                          dark
                          x-small
                          @click="handleFavorites(cart.product_id, actionType, $store.state.product[actionType].some(item => item.id === cart.product_id) ? 'delete' : 'post')"
                        >
                          <v-icon>
                            {{ actionType === 'favorite' ? 'mdi-thumb-up' : 'mdi-thumb-down' }}
                          </v-icon>
                        </v-btn>
                        <span :key="actionType + 'Count'" class="font-weight-bold ml-1" :class="{ 'mr-3': actionType === 'favorite' }">
                          {{
                            $store.state.product[actionType + 's'].filter(
                              item => item.product_id === cart.product_id
                            ).length
                          }}
                        </span>
                      </div>
                    </div>
                  </v-card-actions>
                </v-col>

                <v-col
                  cols="6"
                >
                  <v-card-text
                    class="pb-0"
                  >
                    {{ cart.product.description.length > 90 ? cart.product.description.substring(0, 90) + '...' : cart.product.description }}
                  </v-card-text>
                  <v-card-subtitle
                    class="pt-0 font-weight-bold"
                    style="white-space:pre-line; line-height:2;"
                  >
                    数量：¥{{ cart.product.price.toLocaleString() }} × {{ cart.quantity }}
                    小計（税込）：¥{{ Math.floor(cart.product.price * cart.quantity * 1.1).toLocaleString() }}
                  </v-card-subtitle>
                  <v-divider/>
                  <v-card-actions
                    style="width:80%;"
                  >
                    <v-container>
                      <v-btn
                        class="font-weight-bold"
                        color="teal"
                        block
                        dark
                        @click="removeProductFromCart(cart.product_id, cart.quantity, cart.id)"
                      >
                        削除する
                      </v-btn>
                    </v-container>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-pagination
      v-show="cartProducts.length"
      v-model="page"
      class="my-6"
      :length="Math.ceil(cartProducts.length/pageSize)"
      circle
    >
    </v-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
    cartProducts() {
      return [...this.$store.state.carts].sort((a, b) => {
        return a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0;
      });
    },
    ...mapGetters(['cartTotalPrice']),
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
    async removeProductFromCart(productId, quantity, cartId) {
      try {
        const productQuantity = Number(this.$store.state.product.list.find(product => product.id === productId).stock) + Number(quantity);
        const formDataProducts = new FormData();
        formDataProducts.append('stock', productQuantity);

        await Promise.all([
          this.$axios.$delete(`/api/v1/carts/${cartId}`),
          this.$axios.$patch(`/api/v1/products/${productId}`, formDataProducts)
        ]);

        const [response] = await Promise.all([
          this.$axios.$get('/api/v1/carts')
        ]);

        this.$store.dispatch('getCarts', response);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  },
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