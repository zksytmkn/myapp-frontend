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
          <v-list
            color="transparent"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  プロフィール編集
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider/>

            <v-list-item>
              <v-list-item-content>
                <v-row
                  justify="center"
                >
                  <v-col
                    cols="12"
                  >
                    <v-avatar
                      height=200px
                      width=200px
                    >
                      <v-img
                        :src="url"
                      >
                      </v-img>
                    </v-avatar>
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
                        color="primary"
                        @click="upload"
                      >
                        画像をアップロードする
                      </v-btn>
                      <v-btn
                        dark
                        outlined
                        class="mr-2 font-weight-bold"
                        color="primary"
                      >
                        画像を削除する
                      </v-btn>
                    </v-col>
                    <v-col
                      cols="12"
                    >
                    <v-text-field
                      dense
                      outlined
                      label="氏名"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      dense
                      outlined
                      label="都道府県"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      dense
                      outlined
                      label="市町村"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-textarea
                      dense
                      outlined
                      label="プロフィール"
                    >
                    </v-textarea>
                  </v-col>
                  <v-btn
                    class="mb-6 font-weight-bold"
                    color="primary"
                    dark
                  >
                    変更する
                  </v-btn>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import noImg from '~/assets/images/logged-in/no.png'
export default {
  layout: 'logged-in',
  data () {
    return {
      image: null,
      rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'
      ]
    }
  },
  methods: {
    async upload() {
      const formData = new FormData()
      formData.append("image", this.image)
      const config = {
        header: {
          "Content-Type": "multipart/form-data"
        }
      }
      const res = await this.$axios.post('', formData, config)
      console.log(res)
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