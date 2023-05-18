<template>
  <div class="mb-12">
    <v-container>
      <v-list-item>
        <v-list-item-title class="font-weight-bold">
          詳細
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-container>
              <v-row>
                <v-col cols="5">
                  <v-img
                    :src="currentProduct.image_url ? currentProduct.image_url : noImg"
                    max-height="430px"
                    max-width="430px"
                    aspect-ratio="1"
                  >
                  </v-img>
                  <v-card-title
                    class="font-weight-bold pa-1"
                    style="max-width:430px;"
                  >
                    <span>
                      {{ currentProduct.name.length > 13 ? currentProduct.name.substring(0, 13) + '...' : currentProduct.name }}
                    </span>
                    <v-spacer />
                    <v-btn
                      text
                      outlined
                      to="/products/list"
                      class="font-weight-bold"
                    >
                      一覧
                    </v-btn>
                  </v-card-title>
                  <v-card-actions class="pa-1">
                    <div v-for="actionType in ['favorite', 'unfavorite']" :key="actionType + 'Wrapper'">
                      <div>
                        <v-btn
                          :key="actionType + 'Btn'"
                          :class="productButtonClass(actionType, currentProduct.id)"
                          class="ml-0"
                          fab
                          dark
                          x-small
                          @click="handleFavorites(actionType, $store.state.product[actionType].some(item => item.id === currentProduct.id) ? 'delete' : 'post')"
                        >
                          <v-icon>
                            {{ actionType === 'favorite' ? 'mdi-thumb-up' : 'mdi-thumb-down' }}
                          </v-icon>
                        </v-btn>
                        <span :key="actionType + 'Count'" class="font-weight-bold ml-1" :class="{ 'mr-3': actionType === 'favorite' }">
                          {{
                            actionType === 'favorite' ? currentProduct.favorites_count : currentProduct.unfavorites_count
                          }}
                        </span>
                      </div>
                    </div>

                    <v-btn
                      class="ml-2"
                      text
                      x-small
                      @click="cmt = !cmt"
                    >
                      <v-icon>
                        mdi-comment-outline
                      </v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-col>

                <v-col cols="7">
                  <v-chip class="ma-2 font-weight-bold" outlined>
                    <v-icon left>{{ getCategoryIcon(currentProduct.category) }}</v-icon>
                    {{ currentProduct.category }}
                  </v-chip>

                  <v-chip class="ma-2 font-weight-bold" outlined>
                    <v-icon left>
                      mdi-map-marker-outline
                    </v-icon>
                    {{ currentProduct.prefecture }}
                  </v-chip>

                  <v-card-subtitle>
                    <nuxt-link
                      :to="$my.userLinkToProfile(currentProduct.user_id)"
                      class="text-decoration-none teal--text text--darken-2"
                    >
                      by {{ truncate(currentProduct.user.name, 10) }}
                    </nuxt-link>
                  </v-card-subtitle>

                  <v-card-text>
                    {{ truncate(currentProduct.description, 300) }}
                  </v-card-text>
                
                  <v-card-title class="font-weight-bold">
                    ¥{{ currentProduct.price.toLocaleString() }}
                  </v-card-title>
                  <v-divider />

                  <template v-if="currentProduct.user_id !== $auth.user.id">
                    <v-row no-gutters align="start">
                      <v-col cols="12">
                        <v-select
                          v-if="currentProduct.stock"
                          ref="quantitySelect"
                          v-model="selectedQuantity"
                          class="mt-6"
                          :items="[...Array(currentProduct.stock).keys()].map(i => ++i)"
                          solo
                          dense
                          rounded
                          outlined
                          style="width: 200px; max-width: 200px"
                        ></v-select>
                        <v-card-text v-else class="px-0 font-weight-bold" style="color: #cc0000;">
                          ＊在庫が残っておりません。
                        </v-card-text>
                      </v-col>
                      <v-col cols="12">
                        <v-btn
                          :disabled="!currentProduct.stock"
                          class="font-weight-bold"
                          color="teal"
                          dark
                          style="width: 200px; max-width: 200px"
                          @click="addProductToCart(selectedQuantity)"
                        >
                          カートに入れる
                        </v-btn>
                      </v-col>
                    </v-row>
                  </template>
                  <template v-else>
                    <v-row no-gutters align="start">
                      <v-col cols="12">
                        <v-btn
                          :to="$my.productLinkToEdit(currentProduct.id)"
                          class="font-weight-bold mt-6"
                          color="teal"
                          dark
                          outlined
                          style="width: 200px; max-width: 200px"
                        >
                          編集する
                        </v-btn>
                      </v-col>
                      <v-col cols="12">
                        <v-btn
                          class="font-weight-bold mt-6"
                          color="teal"
                          dark
                          style="width: 200px; max-width: 200px"
                          @click="deleteCurrentProduct"
                        >
                          削除する
                        </v-btn>
                      </v-col>
                    </v-row>
                  </template>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-show="cmt">
      <v-row>
        <v-col cols="12">
          <v-card flat rounded="lg">
            <v-list>
              <v-list-item>
                <v-list-item-title class="font-weight-bold">コメント</v-list-item-title>
              </v-list-item>
            </v-list>
            <v-divider />
            <v-list v-for="(comment, i) in comments" :key="`comment-${i}`">
              <v-list-item>
                <v-list-item-avatar left>
                  <v-img :src="noImg"></v-img>
                </v-list-item-avatar>
                {{ comment.user.name }}
                <v-spacer />
                <v-list-item-action v-show="comment.user.id === $auth.user.id">
                  <v-menu app offset-x offset-y max-width="200">
                    <template #activator="{ on }">
                      <v-btn icon v-on="on">
                        <v-icon>mdi-dots-horizontal</v-icon>
                      </v-btn>
                    </template>
                    <v-list dense>
                      <v-list-item @click="deleteProductComment(comment.id)">
                        <v-list-item-title>削除する</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-list-item-action>
                <v-card-subtitle>{{ dateFormat(comment.updated_at) }}</v-card-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-text>{{ comment.content }}</v-list-item-text>
              </v-list-item>
              <v-divider/>
            </v-list>
            <v-form ref="new" v-model="isValid">
              <v-list>
                <v-list-item>
                  <v-list-item-avatar left>
                    <v-img :src="$auth.user.image_url ? $auth.user.image_url : noImg"></v-img>
                  </v-list-item-avatar>
                  {{ $auth.user.name }}
                </v-list-item>
                <v-list-item>
                  <v-container>
                    <v-row justify="center">
                      <v-col cols="11">
                        <v-textarea
                          v-model="inputted.comment"
                          dense
                          outlined
                          rows="2"
                          placeholder="コメントを追加する"
                          hide-details="auto"
                          :rules="cmtRules"
                          :disabled="sentIt"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="11">
                        <v-row justify="center" align="center">
                          <v-btn
                            text
                            outlined
                            class="font-weight-bold mt-3 mb-3 mr-2"
                            :disabled="!isValid"
                            @click="addProductComment"
                          >
                            コメントする
                          </v-btn>
                          <v-btn text @click="formReset">
                            キャンセル
                          </v-btn>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-container>
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
import { mapGetters } from 'vuex'
import noImg from '@/assets/images/logged-in/no.png'

export default {
  data() {
    return {
      noImg,
      isValid: false,
      cmt: false,
      cmtRules: [v => !!v || ''],
      inputted: { comment: '' },
      selectedQuantity: 1
    }
  },
  computed: {
    currentProduct() {
      return this.$store.state.product.current
    },
    comments() {
      return Array.from(this.$store.state.product.comment).sort((a, b) => {
        if (a.created_at > b.created_at) return -1;
        if (a.created_at < b.created_at) return 1;
        return 0;
      });
    },
    dateFormat() {
      return (date) => new Intl.DateTimeFormat('ja', { dateStyle: 'medium' }).format(new Date(date));
    },
    ...mapGetters(['productButtonClass']),
  },
  methods: {
    async deleteCurrentProduct() {
      if (!confirm('本当にこの農産物を削除しますか？')) {
        return;
      }

      try {
        await this.$axios.$delete(`/api/v1/products/${this.currentProduct.id}`);
        this.$store.dispatch('getToast', { msg: '農産物を削除しました', color: 'success' });
        this.$router.go(-1);
      } catch (error) {
        this.$store.dispatch('getToast', { msg: '農産物を削除できませんでした', color: 'error' });
      }
    },
    async addProductComment() {
      if (!this.isValid) return;
      
      const data = {
        content: this.inputted.comment,
      };
      this.formReset();

      try {
        await this.$axios.$post(`/api/v1/products/${this.currentProduct.id}/product_comments`, data);
        this.$store.dispatch('getToast', { msg: 'コメントしました', color: 'success' });
        this.refreshComments();
      } catch (error) {
        this.$store.dispatch('getToast', { msg: 'コメントできませんでした', color: 'error' });
      }
    },
    formReset() {
      this.sentIt = false
      this.$refs.new.reset()
    },
    async deleteProductComment(id) {
      try {
        await this.$axios.$delete(`/api/v1/products/${this.currentProduct.id}/product_comments/${id}`);
        this.$store.dispatch('getToast', { msg: 'コメントを削除しました', color: 'success' });
        this.refreshComments();
      } catch (error) {
        this.$store.dispatch('getToast', { msg: 'コメントを削除できませんでした', color: 'error' });
      }
    },
    async handleFavorites(type, method) {
      try {
        // ログインユーザーのproduct_favoritesとproduct_unfavoritesを取得し、Vuexストアに反映
        const favoriteResponses = this.$store.state.product.favorite;
        const unfavoriteResponses = this.$store.state.product.unfavorite;

        // APIリクエストを送信
        if (method === 'delete') {
          await this.$axios[method](`/api/v1/product_${type}s/${this.currentProduct.id}/user`);
        } else {
          await this.$axios[method](`/api/v1/product_${type}s`, { product_id: this.currentProduct.id });
        }

        // 更新後のログインユーザーのproduct_favoritesとproduct_unfavoritesを取得し、Vuexストアに反映
        const [updatedFavoriteResponses, updatedUnfavoriteResponses] = await Promise.all([
          this.$axios.$get('api/v1/product_favorites'),
          this.$axios.$get('api/v1/product_unfavorites')
        ]);

        // Vuexストア内のデータを直接更新
        if (method === 'post') {
          if (type === 'favorite') {
            if (unfavoriteResponses.some(unfavorite => unfavorite.id === this.currentProduct.id)) {
              this.$store.commit('decrementCurrentProductUnfavoritesCount');
            }
            this.$store.commit('incrementCurrentProductFavoritesCount');
          } else {
            if (favoriteResponses.some(favorite => favorite.id === this.currentProduct.id)) {
              this.$store.commit('decrementCurrentProductFavoritesCount');
            }
            this.$store.commit('incrementCurrentProductUnfavoritesCount');
          }
        } else if (method === 'delete') {
          if (type === 'favorite') {
            this.$store.commit('decrementCurrentProductFavoritesCount');
          } else {
            this.$store.commit('decrementCurrentProductUnfavoritesCount');
          }
        }

        this.$store.dispatch('getProductFavorite', updatedFavoriteResponses);
        this.$store.commit('setProductUnfavorite', updatedUnfavoriteResponses);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    async refreshComments() {
      const comments = await this.$axios.$get(`api/v1/products/${this.currentProduct.id}/product_comments`);
      this.$store.commit('setProductComment', comments);
    },
    truncate(text, maxLength) {
      return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    },
    getCategoryIcon(category) {
      if (category === "野菜") return "mdi-seed-outline";
      if (category === "果物") return "mdi-food-apple-outline";
      return "";
    },
    async addProductToCart(quantity) {
      if (
        !this.$auth.user.zipcode ||
        !this.$auth.user.street ||
        !this.$auth.user.building
      ) {
        this.$store.dispatch('getToast', { msg: "まずは住所を編集してください", color: "error" });
        return;
      }
    
      try {
        const cart = this.$store.state.carts.find(cart => cart.product_id === this.currentProduct.id);
    
        if (!cart) {
          await this.$axios.$post('/api/v1/carts', { cart: { product_id: this.currentProduct.id, quantity } });
        } else {
          const cartQuantity = Number(cart.quantity) + Number(quantity);
          await this.$axios.$patch(`/api/v1/carts/${cart.id}`, { cart: { quantity: cartQuantity } });
        }
    
        const [carts, product] = await Promise.all([
          this.$axios.$get('/api/v1/carts'),
          this.$axios.$get(`/api/v1/products/${this.currentProduct.id}`)
        ]);
    
        this.$store.commit('setCart', carts);
        this.$store.dispatch('getCurrentProduct', product);
        this.$store.dispatch('getToast', { msg: "カートに入れました", color: "success" });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        this.$store.dispatch('getToast', { msg: "カートに入れられませんでした", color: "error" });
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