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
                    <div v-for="actionType in ['favorites', 'unfavorites']" :key="actionType + 'Wrapper'">
                      <div>
                        <v-btn
                          v-if="isNotRegistered(actionType)"
                          :key="actionType + 'Btn'"
                          :class="buttonClass(actionType)"
                          class="ml-0"
                          fab
                          dark
                          x-small
                          @click="() => handleFavorites(currentProduct.id, actionType, 'post')"
                        >
                          <v-icon>
                            {{ actionType === 'favorites' ? 'mdi-thumb-up' : 'mdi-thumb-down' }}
                          </v-icon>
                        </v-btn>
                        <v-btn
                          v-else
                          :key="actionType + 'BtnElse'"
                          :class="buttonClass(actionType)"
                          class="ml-0"
                          fab
                          dark
                          x-small
                          @click="() => handleFavorites(currentProduct.id, actionType, 'delete')"
                        >
                          <v-icon>
                            {{ actionType === 'favorites' ? 'mdi-thumb-up' : 'mdi-thumb-down' }}
                          </v-icon>
                        </v-btn>
                        <span :key="actionType + 'Count'" class="font-weight-bold ml-1 mr-3">
                          {{ $store.state.product[actionType].filter(item => item.product_id === currentProduct.id).length }}
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
                          :value="currentProduct.quantity"
                          class="mt-6"
                          :items="[...Array(currentProduct.stock).keys()].map(i => ++i)"
                          solo
                          dense
                          rounded
                          outlined
                          style="width: 200px; max-width: 200px"
                          @change="quantity => $store.dispatch('getCurrentProductQuantity', quantity)"
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
                          @click="addProductToCart(currentProduct.id, currentProduct.quantity)"
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
                          @click="deleteCurrentProduct(currentProduct.id)"
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
                <v-list-item-action v-if="comment.user.id === $auth.user.id">
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
            <v-form ref="new" v-model="Valid">
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
                            :disabled="!Valid"
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
import noImg from '@/assets/images/logged-in/no.png'

export default {
  layout: 'logged-in',
  data() {
    return {
      noImg,
      Valid: false,
      cmt: false,
      cmtRules: [v => !!v || ''],
      inputted: { comment: '' },
    }
  },
  computed: {
    currentProduct() {
      return this.$store.state.product.current
    },
    comments() {
      return Array.from(this.$store.state.product.comment).sort((a, b) => a.created_at.localeCompare(b.created_at));
    },
    dateFormat() {
      return (date) => new Intl.DateTimeFormat('ja', { dateStyle: 'medium' }).format(new Date(date));
    },
    isNotRegistered() {
      return (actionType) => {
        return actionType === 'favorites'
          ? !this.$store.state.product.favorite.some(favorite => favorite.id === this.currentProduct.id)
          : !this.$store.state.product.unfavorite.some(unfavorite => unfavorite.id === this.currentProduct.id);
      };
    },
  },
  methods: {
    async processResponse(action, successMsg, errorMsg, successCallback) {
      try {
        await action();
        this.$store.dispatch('getToast', { msg: successMsg, color: 'success' });
        if (successCallback) {
          successCallback();
        }
      } catch (e) {
        this.$store.dispatch('getToast', { msg: errorMsg, color: 'error' });
      }
    },
    deleteCurrentProduct(id) {
      this.processResponse(
        () => this.$axios.$delete(`/api/v1/products/${id}`),
        '農産物を削除しました',
        '農産物を削除できませんでした',
        () => this.$router.go(-1)
      );
    },
    async addProductComment() {
      if (!this.Valid) return;
      const data = {
        product_comment: {
          content: this.inputted.comment,
        },
      };
      this.formReset();

      await this.processResponse(
        () => this.$axios.$post(`/api/v1/products/${this.currentProduct.id}/product_comments`, data),
        'コメントしました',
        'コメントできませんでした',
        () => this.refreshComments()
      );
    },
    formReset() {
      this.sentIt = false
      this.$refs.new.reset()
    },
    deleteProductComment(id) {
      this.processResponse(
        () => this.$axios.$delete(`/api/v1/products/${this.currentProduct.id}/product_comments/${id}`),
        'コメントを削除しました',
        'コメントを削除できませんでした',
        () => this.refreshComments()
      )
    },
    handleFavorite(id, type, method) {
      this.handleFavorites(id, type, method)
    },
    async handleFavorites(id, type, method) {
      try {
        if (method === 'delete') {
          await this.$axios[method](`/api/v1/product_${type}/${id}/user`);
        } else {
          await this.$axios[method](`/api/v1/product_${type}`, { product_id: id });
        }
    
        const [userFavorites, allFavorites, userUnfavorites, allUnfavorites] = await Promise.all([
          this.$axios.$get(`api/v1/product_favorites/${this.$auth.user.id}`),
          this.$axios.$get('api/v1/product_favorites'),
          this.$axios.$get(`api/v1/product_unfavorites/${this.$auth.user.id}`),
          this.$axios.$get('api/v1/product_unfavorites')
        ])
    
        this.$store.dispatch('getProductFavorite', userFavorites)
        this.$store.dispatch('getProductFavorites', allFavorites)
        this.$store.dispatch('getProductUnfavorite', userUnfavorites)
        this.$store.dispatch('getProductUnfavorites', allUnfavorites)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    async refreshComments() {
      const comments = await this.$axios.$get(`api/v1/products/${this.currentProduct.id}/product_comments`);
      this.$store.dispatch('getProductComment', comments);
    },
    truncate(text, maxLength) {
      return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    },
    getCategoryIcon(category) {
      if (category === "野菜") return "mdi-seed-outline";
      if (category === "果物") return "mdi-food-apple-outline";
      return "";
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
    
        const [cartsResponse, productsResponse] = await Promise.all([
          this.$axios.$get('/api/v1/carts'),
          this.$axios.$get('/api/v1/products')
        ]);
    
        this.$store.dispatch('getCarts', cartsResponse);
        this.$store.dispatch('getProductList', productsResponse);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    buttonClass() {
      return (actionType) => {
        if (actionType === 'favorites' && this.$store.state.product.favorite.some(item => item.id === this.currentProduct.id)) {
          return 'likeColor';
        } else if (actionType === 'unfavorites' && this.$store.state.product.unfavorite.some(item => item.id === this.currentProduct.id)) {
          return 'dislikeColor';
        } else {
        return 'grey';
        }
      };
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