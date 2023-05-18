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
              @submit.prevent="editCommunity($store.state.community.current.community.id)"
            >
              <v-list>
                <v-list-item>
                  <v-list-item-title
                    class="font-weight-bold"
                  >
                    コミュニティ
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
                        <v-textarea
                          v-model="inputted.description"
                          dense
                          outlined
                          label="紹介文"
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
                            コミュニティを編集する
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
      descRules: [
        descMax,
        v => !!v || '',
        v => (!!v && descMax >= v.length) || `${descMax}文字以内で入力してください`
      ],
      inputted: { name: '', description: '', image: null }
    }
  },
  computed: {
    url() {
      if (!this.inputted.image) {
        return this.$store.state.community.current.community.image_url || noImg;
      }
      return URL.createObjectURL(this.inputted.image);
    },
  },
  mounted() {
    const community = this.$store.state.community.current.community;
    Object.keys(this.inputted).forEach(key => {
      if (key in community) {
        this.inputted[key] = community[key];
      }
    });
  },
  methods: {
    async editCommunity(id) {
      this.loading = true;
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

        try {
          await this.$axios.$patch(`/api/v1/communities/${id}`, formData, config);
          this.$router.back();
          this.$store.dispatch('getToast', { msg: 'コミュニティを編集しました', color: 'success' });
        } catch (error) {
          this.$store.dispatch('getToast', { msg: 'コミュニティを編集できませんでした', color: 'error' });
        }
      }
      this.loading = false;
    },
    formReset() {
      this.sentIt = false
      this.$refs.edit.reset()
    }
  }
}
</script>
