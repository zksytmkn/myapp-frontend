<template>
  <div
    class="mb-12"
  >
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
                    つぶやき
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
                        <v-img
                          :src="url"
                          max-height="400px"
                          max-width="400px"
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
                          v-model="inputted.title"
                          dense
                          outlined
                          label="タイトル"
                          :rules="titleRules"
                          :disabled="sentIt"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col
                        cols="11"
                      >
                        <v-textarea
                          v-model="inputted.body"
                          dense
                          outlined
                          label="つぶやき"
                          :rules="bodyRules"
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
                            つぶやきを編集する
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
  </div>
</template>

<script>
import noImg from '~/assets/images/logged-in/no.png'

export default {
  data () {
    const titleMax = 30
    const bodyMax = 400
    return {
      noImg,
      isValid: false,
      loading: false,
      imgRules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'
      ],
      titleRules: [
        titleMax,
        v => !!v || '',
        v => (!!v && titleMax >= v.length) || `${titleMax}文字以内で入力してください`
      ],
      bodyRules: [
        bodyMax,
        v => !!v || '',
        v => (!!v && bodyMax >= v.length) || `${bodyMax}文字以内で入力してください`
      ],
      inputted: { title: '', body: '', image: null }
    }
  },
  computed: {
    url() {
      if (!this.inputted.image) {
        return this.$store.state.post.current.image_url || noImg;
      }
      return URL.createObjectURL(this.inputted.image);
    },
  },
  mounted() {
    this.inputted.title = this.$store.state.post.current.title
    this.inputted.body = this.$store.state.post.current.body
  },
  methods: {
    async editPost(id) {
      this.loading = true;
      try {
        if (this.isValid) {
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

          await this.$axios.$patch(`/api/v1/posts/${id}`, formData, config);
          this.$router.back();
          this.$store.dispatch('getToast', { msg: 'つぶやきを編集しました', color: 'success' });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        let errorMsg = "つぶやきを編集できませんでした";
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
    },
  }
}
</script>