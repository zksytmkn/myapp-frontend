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
            <v-form ref="new" v-model="isValid" @submit.prevent="addProduct">
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
                        :items="categoryItems"
                        :rules="categoryRules"
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
                          :disabled="!isValid || loading"
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

    <ProductList
      title="出品済み"
      message="出品しておりません。"
      :products="newProducts"
    />
  </div>
</template>

<script>
import noImg from '~/assets/images/logged-in/no.png'
export default {
  data () {
    const nameMax = 13
    const descMax = 300
    return {
      noImg,
      isValid: false,
      loading: false,
      imgRules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'
      ],
      nameRules: [
        nameMax,
        v => !!v || '',
        v => (!!v && nameMax >= v.length) || `${nameMax}文字以内で入力してください`
      ],
      Rules: [v => !!v || '種類を選択してください'],
      priceRules: [v => !!v || '価格を入力してください'],
      stockRules: [v => (v > 0 && Number.isInteger(Number(v))) || '数量を入力してください'],
      descRules: [
        descMax,
        v => !!v || '',
        v => (!!v && descMax >= v.length) || `${descMax}文字以内で入力してください`
      ],
      inputted: { name: '', category: '', price: null, stock: null, description: '', image: null },
      categoryItems: [
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
      const userProducts = this.$store.state.product.list.filter(product => product.user_id === this.$auth.user.id);
      return userProducts.sort((a, b) => {
        if (a.created_at > b.created_at) return -1;
        if (a.created_at < b.created_at) return 1;
        return 0;
      });
    }
  },
  methods: {
    async addProduct() {
      if (!this.$auth.user.prefecture) {
        this.$store.dispatch('getToast', { msg: 'まずはプロフィールを編集してください', color: 'error' });
        return;
      }
    
      if (!this.isValid) {
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
    
      try {
        await this.$axios.$post('/api/v1/products', formData, config);
        this.formReset();
        this.$store.dispatch('getToast', { msg: '農産物を出品しました', color: 'success' });
        const products = await this.$axios.$get('api/v1/products');
        this.$store.dispatch('getProductList', products);
      } catch (error) {
        this.formReset();
        // eslint-disable-next-line no-console
        console.log(error);
        let errorMsg = "農産物を出品できませんでした";
        if (error.response && error.response.data && error.response.data.error) {
          errorMsg = error.response.data.error;
        }
        this.$store.dispatch('getToast', { msg: errorMsg, color: "error" });
      }
    
      this.loading = false;
    },
    formReset() {
      this.sentIt = false;
      this.$refs.new.reset();
    },
  }
}
</script>