<template>
  <div
    id="post"
  >
    <logged-in-app-post-eye-catch>
      <template
        v-slot
      >
        Many farmers post about agriculture here !
        Please look around and enjoy it !
      </template>
    </logged-in-app-post-eye-catch>

    <v-container>
      <v-list-item>
        <v-list-item-title
          class="font-weight-bold"
        >
          編集
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
              ref="edit"
              v-model="isValid"
              @submit.prevent="editPost($store.state.post.current.id)"
            >
              <v-list>
                <v-list-item>
                  <v-list-item-title
                    class="font-weight-bold"
                  >
                    農家の呟き
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
                        <v-img
                          :src="url"
                          height=300px
                          width=300px
                        >
                        </v-img>
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
                          label="タイトル"
                          v-model="inputted.name"
                          :rules="nameRules"
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
                          label="呟き"
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
                            color="teal"
                          >
                            呟きを編集する
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
      noImg,
      isValid: false,
      loading: false,
      imgRules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'
      ],
      nameRules: [
        v => !!v || '名前を入力してください'
      ],
      textRules: [
        v => !!v || '呟きを入力してください'
      ],
      inputted: { name: '', poster: this.$auth.user.name, text: '', image: null }
    }
  },
  methods: {
    async editPost(id) {
      this.loading = true
      if (this.isValid) {
        const formData = new FormData()
        formData.append('name', this.inputted.name)
        formData.append('poster', this.inputted.poster)
        formData.append('text', this.inputted.text)
        if (this.inputted.image !== null) {
          formData.append('image', this.inputted.image)
        }
        const config = {
          header: {
            "Content-Type": "multipart/form-data"
          }
        }
        await this.$axios.$patch(`/api/v1/posts/${id}`, formData, config)
        .then(response => {
          this.$router.back()
          const msg = '呟きを編集しました'
          const color = 'success'
          return this.$store.dispatch('getToast', { msg, color })
        })
        .catch(error => {
          console.log(error)
          const msg = '呟きの編集に失敗しました'
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
        return this.$store.state.post.current.image_url ? this.$store.state.post.current.image_url : noImg
      } else {
        return URL.createObjectURL(this.inputted.image)
      }
    }
  },
  mounted() {
    this.inputted.name = this.$store.state.post.current.name
    this.inputted.text = this.$store.state.post.current.text
  }
}
</script>