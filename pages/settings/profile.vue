<template>
  <v-container
    class="my-12"
  >
    <v-row>
      <setting-menu />
      <v-col
        cols="9"
      >
        <v-card
          flat
          rounded="lg"
        >
          <v-form
            ref="edit"
            v-model="isValid"
            @submit.prevent="editProfile"
          >
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  プロフィール編集
                </v-list-item-title>
              </v-list-item>

              <v-divider/>

              <v-list-item>
                <v-container>
                  <v-row
                    justify="center"
                  >
                    <v-col
                      cols="11"
                      class="mt-9"
                    >
                      <v-avatar
                        height="260px"
                        width="260px"
                      >
                        <v-img
                          :src="url"
                        >
                        </v-img>
                      </v-avatar>
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
                        label="ユーザー名"
                        :rules="nameRules"
                        :disabled="sentIt"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col
                      cols="11"
                    >
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
                    <v-col
                      cols="11"
                    >
                      <v-textarea
                        v-model="inputted.profile_text"
                        dense
                        outlined
                        label="プロフィール文"
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
                          編集する
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
              </v-list-item>
            </v-list>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import noPersonImg from '~/assets/images/logged-in/noPerson.png'

export default {
  data () {
    const nameMax = 13
    const textMax = 120
    return {
      noPersonImg,
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
      prefectureRules: [
        v => !!v || '都道府県を選択してください'
      ],
      textRules: [
        textMax,
        v => !!v || '',
        v => (!!v && textMax >= v.length) || `${textMax}文字以内で入力してください`
      ],
      inputted: { name: '', prefecture: '', profile_text: '', image: null },
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
      return this.inputted.image
        ? URL.createObjectURL(this.inputted.image)
        : this.$auth.user.image_url || noPersonImg;
    }
  },
  mounted() {
    this.inputted.name = this.$auth.user.name
    this.inputted.prefecture = this.$auth.user.prefecture
    this.inputted.profile_text = this.$auth.user.profile_text
  },
  methods: {
    async editProfile() {
      if (!this.isValid) {
        return;
      }
      this.loading = true;

      const formData = new FormData();
      formData.append('name', this.inputted.name);
      formData.append('prefecture', this.inputted.prefecture);
      formData.append('profile_text', this.inputted.profile_text);
      if (this.inputted.image !== null) {
        formData.append('image', this.inputted.image);
      }

      const config = {
        header: {
          "Content-Type": "multipart/form-data"
        }
      };

      try {
        await this.$axios.$patch(`/api/v1/users/${this.$auth.user.id}`, formData, config);
        this.$store.dispatch('getToast', { msg: 'プロフィールを編集しました', color: 'success' });

        const response = await this.$axios.$post('/api/v1/auth_token/refresh');
        this.$auth.login(response);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        let errorMsg = "プロフィールを編集できませんでした";
        if (error.response && error.response.data && error.response.data.error) {
          errorMsg = error.response.data.error;
        }
        this.$store.dispatch('getToast', { msg: errorMsg, color: "error" });
      } finally {
        this.loading = false;
      }
    },
    formReset() {
      this.sentIt = false;
      this.$refs.edit.reset();
    }
  }
}
</script>