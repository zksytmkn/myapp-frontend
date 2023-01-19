<template>
  <div
    id="products"
  >
    <logged-in-app-eye-catch>
      <template
        v-slot
      >
        Various vegetables or fruits are here !
        Please look around and enjoy it !
      </template>
    </logged-in-app-eye-catch>

    <v-container>
      <v-list-item>
        <v-list-item-title
          class="font-weight-bold"
        >
          出品
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
    </v-container>
    <v-container>
      <v-row
        justify="center"
      >
        <v-col
          cols="12"
        >
          <v-card>
            <v-form
              @submit.prevent="addProduct"
            >
              <v-list>
                <v-list-item>
                  <v-list-item-title
                    class="font-weight-bold"
                  >
                    農産物
                  </v-list-item-title>
                </v-list-item>
  
                <v-divider/>
  
                <v-list-item>
                  <v-list-item-content>
                    <v-row
                      justify="center"
                    >
                      <v-col
                        cols="11"
                        class="mt-9"
                      >
                        <v-img
                          :src="url"
                          height=300px
                          width=300px
                        >
                        </v-img>
                        <v-file-input
                          :rules="rules"
                          accept="image/png, image/jpeg, image/bmp"
                          placeholder="画像を選択して下さい"
                          prepend-icon="mdi-camera"
                          label="画像ファイル"
                          v-model="image"
                        >
                        </v-file-input>
                        <v-btn
                          dark
                          outlined
                          class="mr-2 font-weight-bold"
                          color="teal"
                          @click="upload"
                        >
                          画像をアップロードする
                        </v-btn>
                        <v-btn
                          dark
                          outlined
                          class="mr-2 font-weight-bold"
                          color="teal"
                        >
                          画像を削除する
                        </v-btn>
                      </v-col>
                      <v-col
                        cols="11"
                      >
                        <v-text-field
                          dense
                          outlined
                          class="mt-6"
                          label="名前"
                          v-model="inputtedName"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col
                        cols="11"
                      >
                        <v-combobox
                          dense
                          outlined
                          label="種類"
                          :items="typeItems"
                          v-model="inputtedType"
                          small-chips
                        >
                        </v-combobox>
                      </v-col>
  
                      <v-col
                        cols="11"
                      >
                        <v-combobox
                          dense
                          outlined
                          label="地方"
                          :items="regionItems"
                          v-model="inputtedRegion"
                          small-chips
                        >
                        </v-combobox>
                      </v-col>
                      <v-col
                        cols="11"
                      >
                        <v-combobox
                          dense
                          outlined
                          label="地域"
                          :items="prefectureItems"
                          v-model="inputtedPrefecture"
                          small-chips
                        >
                        </v-combobox>
                      </v-col>
                      <v-col
                        cols="11"
                      >
                        <v-textarea
                          dense
                          outlined
                          label="紹介文"
                          v-model="inputtedText"
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
                            class="mb-6 font-weight-bold white--text"
                            color="teal"
                          >
                            農産物を出品する
                          </v-btn>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
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
  data () {
    return {
      image: null,
      isValid: false,
      loading: false,
      rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'
      ],
      inputtedName: '',
      inputtedType: '',
      inputtedRegion: '',
      inputtedPrefecture: '',
      inputtedText: '',
      typeItems: [
        '野菜',
        '果物'
      ],
      regionItems: [
        '北海道地方',
        '東北地方',
        '関東地方',
        '中部地方',
        '近畿地方',
        '中国地方',
        '四国地方',
        '九州地方'
      ],
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
  methods: {
    async upload () {
      const formData = new FormData()
      formData.append("image", this.image)
      const config = {
        header: {
          "Content-Type": "multipart/form-data"
        }
      }
      const res = await this.$axios.post('', formData, config)
      console.log(res)
    },
    async addProduct () {
      this.loading = true
      if (this.isValid) {
        await this.$axios.$post('api/v1/products', this.)
      }
      this.loading = false
    }
  },
  computed: {
    url() {
      if(this.image===null) {
        return noImg
      } else {
        return URL.createObjectURL(this.image)
      }
    }
  }
}
</script>

<style lang="scss">
#products {
  .v-parallax__content {
    padding: 0;
  }
}
</style>