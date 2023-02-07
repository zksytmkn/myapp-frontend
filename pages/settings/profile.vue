<template>
  <v-container>
    <v-row>
      <setting-menu />
      <v-col
        cols="9"
      >
        <v-sheet
          rounded="lg"
        >
          <v-form
            ref="edit"
            v-model="isValid"
            @submit.prevent="editProfile($store.state.user.current.id)"
          >
            <v-list
              color="transparent"
            >
              <v-list-item>
                <v-list-item-title>
                  プロフィール編集
                </v-list-item-title>
              </v-list-item>

              <v-divider/>

              <v-list-item>
                <v-list-item-container>
                  <v-row
                    justify="center"
                  >
                    <v-col
                      cols="11"
                      class="mt-9"
                    >
                      <v-avatar
                        height=230px
                        width=230px
                      >
                        <v-img
                          :src="url"
                        >
                        </v-img>
                      </v-avatar>
                      <v-file-input
                        :rules="imgRules"
                        accept="image/png, image/jpeg, image/bmp"
                        placeholder="画像を選択して下さい"
                        prepend-icon="mdi-camera"
                        label="画像ファイル"
                        v-model="inputted.image"
                      >
                      </v-file-input>
                    </v-col>
                    <v-col
                      cols="11"
                    >
                      <v-text-field
                        dense
                        outlined
                        label="氏名"
                        v-model="inputted.name"
                        :rules="nameRules"
                        :disabled="sentIt"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col
                      cols="11"
                    >
                      <v-select
                        dense
                        outlined
                        label="都道府県"
                        v-model="inputted.prefecture"
                        :rules="prefectureRules"
                        :disabled="sentIt"
                        :items="prefectureItems"
                      >
                      </v-select>
                    </v-col>
                    <v-col
                      cols="11"
                    >
                      <v-text-field
                        dense
                        outlined
                        label="市町村"
                        v-model="inputted.city"
                        :rules="cityRules"
                        :disabled="sentIt"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col
                      cols="11"
                    >
                      <v-textarea
                        dense
                        outlined
                        label="プロフィール文"
                        v-model="inputted.text"
                        :rules="textRules"
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
                          color="appblue"
                        >
                          プロフィールを編集する
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
                </v-list-item-container>
              </v-list-item>
            </v-list>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import noPersonImg from '~/assets/images/logged-in/noPerson.png'

export default {
  layout: 'logged-in',
  data () {
    return {
      noPersonImg,
      isValid: false,
      loading: false,
      imgRules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'
      ],
      nameRules: [
        v => !!v || '名前を入力してください'
      ],
      prefectureRules: [
        v => !!v || '都道府県を選択してください'
      ],
      cityRules: [
        v => !!v || '市町村を選択してください'
      ],
      textRules: [
        v => !!v || 'プロフィール文を入力してください'
      ],
      inputted: { name: '', prefecture: '', city: '', text: '', image: null },
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
    async editProfile(id) {
      this.loading = true
      if (this.isValid) {
        const formData = new FormData()
        formData.append('name', this.inputted.name)
        formData.append('seller', this.inputted.seller)
        formData.append('type', this.inputted.type)
        formData.append('prefecture', this.inputted.prefecture)
        formData.append('price', this.inputted.price)
        formData.append('quantity', this.inputted.quantity)
        formData.append('inventory', this.inputted.inventory)
        formData.append('text', this.inputted.text)
        if (this.inputted.image !== null) {
          formData.append('image', this.inputted.image)
        }
        const config = {
          header: {
            "Content-Type": "multipart/form-data"
          }
        }
        await this.$axios.$patch(`/api/v1/products/${id}`, formData, config)
        .then(response => {
          this.$router.back()
          const msg = '農産物を編集しました'
          const color = 'success'
          return this.$store.dispatch('getToast', { msg, color })
        })
        .catch(error => {
          console.log(error)
          const msg = '農産物の削除に失敗しました'
          return this.$store.dispatch('getToast', { msg })
        })
      }
      this.loading = false
    },
    formReset() {
      this.sentIt = false
      this.$refs.edit.reset()
    }
  },
  computed: {
    url() {
      if(this.inputted.image===null) {
        return this.$store.state.user.current.image_url ? this.$store.state.user.current.image_url : noPersonImg
      } else {
        return URL.createObjectURL(this.inputted.image)
      }
    }
  },
  mounted() {
    this.inputted.name = this.$store.state.user.current.name
    this.inputted.prefecture = this.$store.state.user.current.prefecture
    this.inputted.city = this.$store.state.user.current.city
    this.inputted.text = this.$store.state.user.current.text
  }
}
</script>