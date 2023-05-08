<template>
  <div>
    <v-container>
      <v-list-item>
        <v-list-item-title class="font-weight-bold">出品</v-list-item-title>
      </v-list-item>
      <v-divider />
    </v-container>
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <v-card>
            <v-form ref="new" v-model="valid" @submit.prevent="addProduct">
              <v-list>
                <v-list-item>
                  <v-list-item-title class="font-weight-bold">農産物</v-list-item-title>
                </v-list-item>
                <v-divider />

                <v-container>
                  <v-row
                    justify="center"
                  >
                    <v-col
                      cols="11"
                      class="mt-9"
                    >
                      <v-img
                        :src="url"
                        height="300px"
                        width="300px"
                      >
                      </v-img>
                      <v-file-input
                        v-model="inputted.image"
                        :rules="imgRules"
                        accept="image/png, image/jpeg, image/bmp"
                        placeholder="画像を選択して下さい"
                        prepend-icon="mdi-camera"
                        label="画像ファイル"
                      >
                      </v-file-input>
                    </v-col>
                    <v-col
                      cols="11"
                    >
                      <v-text-field
                        v-model="inputted.name"
                        dense
                        outlined
                        label="名前"
                        :rules="nameRules"
                        :disabled="sentIt"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col
                      cols="11"
                    >
                      <v-select
                        v-model="inputted.category"
                        dense
                        outlined
                        label="種類"
                        :items="typeItems"
                        :rules="typeRules"
                        :disabled="sentIt"
                      >
                      </v-select>
                    </v-col>
                    <v-col
                      cols="11"
                    >
                      <v-row>
                        <v-col
                          cols="6"
                        >
                          <v-text-field
                            v-model="inputted.price"
                            dense
                            outlined
                            label="価格"
                            type="number"
                            :rules="priceRules"
                            :disabled="sentIt"
                          >
                          </v-text-field>
                        </v-col>
                        <v-col
                          cols="6"
                        >
                          <v-text-field
                            v-model="inputted.stock"
                            dense
                            outlined
                            label="数量"
                            type="number"
                            :rules="stockRules"
                            :disabled="sentIt"
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="11"
                    >
                      <v-textarea
                        v-model="inputted.description"
                        dense
                        outlined
                        label="説明文"
                        :rules="descRules"
                        :disabled="sentIt"
                      >
                      </v-textarea>
                    </v-col>
                    <v-col
                      cols="11"
                    >
                      <v-row
                        justify="center"
                      >
                        <v-btn
                          type="submit"
                          :disabled="!valid || loading"
                          :loading="loading"
                          class="mb-6 mr-2 font-weight-bold white--text"
                          color="teal"
                        >
                          農産物を出品する
                        </v-btn>

                        <v-btn
                          text
                          @click="formReset"
                        >
                          キャンセル
                        </v-btn>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-list>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-list-item>
        <v-list-item-title class="font-weight-bold">
          出品済み（{{ newProducts.length }}件）
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
      <v-list-item v-show="!newProducts.length">
        <v-list-item-title>
          出品しておりません。
        </v-list-item-title>
      </v-list-item>
    </v-container>
    <v-container>
      <v-row>
        <v-col
          v-for="(product, i) in newProducts.slice(pageSize * (page - 1), pageSize * page)"
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
      v-show="newProducts.length"
      v-model="page"
      class="my-6"
      :length="Math.ceil(newProducts.length/pageSize)"
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
    const nameMax = 13
    const descMax = 300
    return {
      noImg,
      page: 1,
      pageSize: 10,
      valid: false,
      loading: false,
      imgRules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'
      ],
      nameRules: [
        nameMax,
        v => !!v || '',
        v => (!!v && nameMax >= v.length) || `${nameMax}文字以内で入力してください`
      ],
      typeRules: [v => !!v || '種類を選択してください'],
      priceRules: [v => !!v || '価格を入力してください'],
      stockRules: [v => (v > 0 && Number.isInteger(Number(v))) || '数量を入力してください'],
      descRules: [
        descMax,
        v => !!v || '',
        v => (!!v && descMax >= v.length) || `${descMax}文字以内で入力してください`
      ],
      inputted: { name: '', user_id: this.$auth.user.id, category: '', prefecture: this.$auth.user.prefecture, price: null, quantity: 1, stock: null, description: '', image: null },
      typeItems: [
        '野菜',
        '果物'
      ]
    }
  },
  computed: {
    url() {
      return this.inputted.image ? URL.createObjectURL(this.inputted.image) : noImg;
    },
    newProducts() {
      const userProducts = this.$store.state.product.list.filter(x => x.user_id === this.$auth.user.id);
      return userProducts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
  },
  methods: {
    async addProduct() {
      if (!this.$auth.user.prefecture) {
        this.$store.dispatch('getToast', { msg: 'まずはプロフィールを編集してください', color: 'error' });
        return;
      }

      if (!this.valid) {
        this.loading = false;
        return;
      }
    
      this.loading = true;
    
      const formData = new FormData();
      Object.entries(this.inputted).forEach(([key, value]) => {
        if (value !== null) formData.append(key, value);
      });
    
      const config = {
        header: {
          "Content-Type": "multipart/form-data",
        },
      };
    
      this.formReset();
    
      try {
        await this.$axios.$post('/api/v1/products', formData, config);
        this.$store.dispatch('getToast', { msg: '農産物を出品しました', color: 'success' });
      } catch (error) {
        this.$store.dispatch('getToast', { msg: '農産物を出品できませんでした', color: 'error' });
      }
    
      const products = await this.$axios.$get('api/v1/products');
      this.$store.dispatch('getProductList', products);
    
      this.loading = false;
    },
    async deleteProduct(id) {
      try {
        await this.$axios.$delete(`/api/v1/products/${id}`);
        await this.$axios.$get("api/v1/products").then((products) =>
          this.$store.dispatch("getProductList", products)
        );
        this.$store.dispatch('getToast', { msg: '農産物を削除しました', color: 'success' });
      } catch (error) {
        this.$store.dispatch('getToast', { msg: '農産物を削除できませんでした', color: 'error' });
      }
    },
    formReset() {
      this.sentIt = false;
      this.$refs.new.reset();
    },
    async handleFavorites(id, type, method) {
      try {
        if (method === 'delete') {
          await this.$axios[method](`/api/v1/product_${type}s/${id}/user`);
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
    buttonClass(actionType, id) {
      if (actionType === 'favorite' && this.$store.state.product.favorite.some(item => item.id === id)) {
        return 'likeColor';
      } else if (actionType === 'unfavorite' && this.$store.state.product.unfavorite.some(item => item.id === id)) {
        return 'dislikeColor';
      } else {
        return 'grey';
      }
    }
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