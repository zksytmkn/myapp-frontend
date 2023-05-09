<template>
  <div class="mb-12">
    <v-container>
      <v-list-item>
        <v-list-item-title class="font-weight-bold">
          編集
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
    </v-container>

    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <v-card>
            <v-form
              ref="edit"
              v-model="valid"
              @submit.prevent="editProduct($store.state.product.current.id)"
            >
              <v-list>
                <v-list-item>
                  <v-list-item-title class="font-weight-bold">
                    農産物
                  </v-list-item-title>
                </v-list-item>

                <v-divider/>

                <v-list-item>
                  <v-container>
                    <v-row justify="center">
                      <v-col cols="11" class="mt-9">
                        <v-img :src="url" height="300px" width="300px"></v-img>
                        <v-file-input
                          v-model="inputted.image"
                          :rules="imgRules"
                          accept="image/png, image/jpeg, image/bmp"
                          placeholder="画像を選択して下さい"
                          prepend-icon="mdi-camera"
                          label="画像ファイル"
                        ></v-file-input>
                      </v-col>
                      <v-col cols="11">
                        <v-text-field
                          v-model="inputted.name"
                          dense
                          outlined
                          label="名前"
                          :rules="nameRules"
                          :disabled="sentIt"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="11">
                        <v-select
                          v-model="inputted.category"
                          dense
                          outlined
                          label="種類"
                          :items="categoryItems"
                          :rules="categoryRules"
                          :disabled="sentIt"
                        ></v-select>
                      </v-col>
                      <v-col cols="11">
                        <v-select
                          v-model="inputted.prefecture"
                          dense
                          outlined
                          label="都道府県"
                          :rules="prefectureRules"
                          :disabled="sentIt"
                          :items="prefectureItems"
                        >
                        </v-select>
                      </v-col>

                      <v-col cols="11">
                        <v-row>
                          <v-col cols="6">
                            <v-text-field
                              v-model="inputted.price"
                              dense
                              outlined
                              label="価格"
                              type="number"
                              :rules="priceRules"
                              :disabled="sentIt"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              v-model="inputted.stock"
                              dense
                              outlined
                              label="数量"
                              type="number"
                              :rules="stockRules"
                              :disabled="sentIt"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="11">
                        <v-textarea
                          v-model="inputted.description"
                          dense
                          outlined
                          label="説明文"
                          :rules="descRules"
                          :disabled="sentIt"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="11">
                        <v-row justify="center">
                          <v-btn
                            type="submit"
                            :disabled="!valid || loading"
                            :loading="loading"
                            class="mb-6 mr-2 font-weight-bold white--text"
                            color="teal"
                          >
                            農産物を編集する
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
import noImg from '~/assets/images/logged-in/no.png'

export default {
  layout: 'logged-in',
  data() {
    const nameMax = 13;
    const descMax = 300;
    return {
      noImg,
      valid: false,
      loading: false,
      imgRules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
      nameRules: [
        nameMax,
        v => !!v || '',
        v => (!!v && nameMax >= v.length) || `${nameMax}文字以内で入力してください`,
      ],
      categoryRules: [v => !!v || '種類を選択してください'],
      prefectureRules: [v => !!v || '都道府県を選択してください'],
      priceRules: [v => !!v || '価格を入力してください'],
      stockRules: [v => (v > 0 && Number.isInteger(Number(v))) || '数量を入力してください'],
      descRules: [
        descMax,
        v => !!v || '',
        v => (!!v && descMax >= v.length) || `${descMax}文字以内で入力してください`,
      ],
      inputted: {
        name: '',
        category: '',
        prefecture: '',
        price: null,
        stock: null,
        description: '',
        image: null,
      },
      categoryItems: ['野菜', '果物'],
      prefectureItems: [
        '北海道',
        '青森県',
        '岩手県',
        '宮城県',
        '秋田県',
        '山形県',
        '福島県',
        '茨城県',
        '栃木県',
        '群馬県',
        '埼玉県',
        '千葉県',
        '東京都',
        '神奈川県',
        '新潟県',
        '富山県',
        '石川県',
        '福井県',
        '山梨県',
        '長野県',
        '岐阜県',
        '静岡県',
        '愛知県',
        '三重県',
        '滋賀県',
        '京都府',
        '大阪府',
        '兵庫県',
        '奈良県',
        '和歌山県',
        '鳥取県',
        '島根県',
        '岡山県',
        '広島県',
        '山口県',
        '徳島県',
        '香川県',
        '愛媛県',
        '高知県',
        '福岡県',
        '佐賀県',
        '長崎県',
        '熊本県',
        '大分県',
        '宮崎県',
        '鹿児島県',
        '沖縄県'
      ]
    }
  },
  computed: {
    url() {
      if (!this.inputted.image) {
        return this.$store.state.product.current.image_url || noImg;
      }
      return URL.createObjectURL(this.inputted.image);
    },
  },
  mounted() {
    const product = this.$store.state.product.current;
    Object.keys(this.inputted).forEach(key => {
      if (key in product) {
        this.inputted[key] = product[key];
      }
    });
  },
  methods: {
    async editProduct(id) {
      this.loading = true;
      if (this.valid) {
        const formData = new FormData();
        Object.keys(this.inputted).forEach(key => {
          if (key !== 'image' || (key === 'image' && this.inputted[key] !== null)) {
            formData.append(key, this.inputted[key]);
          }
        });
      
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      
        try {
          await this.$axios.$patch(`/api/v1/products/${id}`, formData, config);
          this.$router.back();
          this.$store.dispatch('getToast', { msg: '農産物を編集しました', color: 'success' });
        } catch (error) {
          this.$store.dispatch('getToast', { msg: '農産物を編集できませんでした', color: 'error' });
        }
      }
      this.loading = false;
    },
    formReset() {
      this.sentIt = false;
      this.$refs.edit.reset();
    },
  },
};
</script>