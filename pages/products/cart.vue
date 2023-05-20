<template>
  <div>
    <v-container>
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
          <v-list-item-action>
            <v-row>
              <v-col cols="auto">
                <v-btn
                  class="font-weight-bold"
                  color="teal"
                  dark
                  to="/products/register"
                >
                  レジに進む
                </v-btn>
                <v-btn
                  class="font-weight-bold ml-1"
                  color="teal"
                  outlined
                  dark
                  to="/products/list"
                >
                  一覧に戻る
                </v-btn>
              </v-col>
            </v-row>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-container>

    <v-container v-show="cartProducts.length">
      <v-row>
        <v-col
          v-for="(cart, i) in cartProducts.slice(pageSize * (page - 1), pageSize * page)"
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
                    :src="cart.product.image_url || noImg"
                    max-height="360px"
                    max-width="360px"
                    aspect-ratio="1"
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
                      :to="$my.productLinkToDetail(cart.product.id)"
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
                          :class="productButtonClass(actionType, cart.product.id)"
                          class="ml-0"
                          fab
                          dark
                          x-small
                          @click="handleFavorites(cart.product.id, actionType, $store.state.product[actionType].some(item => item.id === cart.product.id) ? 'delete' : 'post')"
                        >
                          <v-icon>
                            {{ actionType === 'favorite' ? 'mdi-thumb-up' : 'mdi-thumb-down' }}
                          </v-icon>
                        </v-btn>
                        <span :key="actionType + 'Count'" class="font-weight-bold ml-1" :class="{ 'mr-3': actionType === 'favorite' }">
                          {{
                            actionType === 'favorite' ? cart.product.favorites_count : cart.product.unfavorites_count
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
                        @click="removeProductFromCart(cart.id)"
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
        if (a.created_at > b.created_at) return -1;
        if (a.created_at < b.created_at) return 1;
        return 0;
      });
    },
    ...mapGetters(['cartTotalPrice', 'productButtonClass']),
  },
  methods: {
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
        const [updatedFavoriteResponses, updatedUnfavoriteResponses, updatedCartResponses] = await Promise.all([
          this.$axios.$get('api/v1/product_favorites'),
          this.$axios.$get('api/v1/product_unfavorites'),
          this.$axios.$get('api/v1/carts'),
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
        this.$store.commit('setCart', updatedCartResponses);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    async removeProductFromCart(cartId) {
      try {
        await this.$axios.$delete(`/api/v1/carts/${cartId}`);
        this.$store.dispatch('getToast', { msg: 'カートから削除しました', color: 'success' });

        const response = await this.$axios.$get('/api/v1/carts');

        this.$store.commit('setCart', response);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.$store.dispatch('getToast', { msg: 'カートから削除できませんでした', color: 'error' });
        } else {
          // eslint-disable-next-line no-console
          console.log(error.message);
        }
      }
    },
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