<template>
  <div>
    <v-container>
      <v-list-item>
        <v-list-item-title
          class="font-weight-bold"
        >
          作成
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
              ref="new"
              v-model="isValid"
              @submit.prevent="addCommunity"
            >
              <v-list>
                <v-list-item>
                  <v-list-item-title
                    class="font-weight-bold"
                  >
                    コミュニティ
                  </v-list-item-title>
                </v-list-item>
              </v-list>
  
              <v-divider/>
  
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
                      height=300px
                      width=300px
                    >
                    </v-img>
                    <v-file-input
                      v-model="inputted.image"
                      :rules="imgRules"
                      accept="image/png, image/jpeg, image/bmp"
                      placeholder="画像を選択して下さい"
                      prepend-icon="mdi-camera"
                      label="画像ファイル"
                      :disabled="sentIt"
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
                        コミュニティを作成する
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
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <CommunityList
      title="作成済み"
      message="作成しておりません。"
      :communities="newCommunities"
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
      descRules: [
        descMax,
        v => !!v || '',
        v => (!!v && descMax >= v.length) || `${descMax}文字以内で入力してください`
      ],
      inputted: { name: '', description: '', image: null },
    }
  },
  computed: {
    url() {
      return this.inputted.image ? URL.createObjectURL(this.inputted.image) : noImg;
    },
    newCommunities() {
      const userCommunities = this.$store.state.community.list.filter(community => community.user_id === this.$auth.user.id);
      return userCommunities.sort((a, b) => {
        if (a.created_at > b.created_at) return -1;
        if (a.created_at < b.created_at) return 1;
        return 0;
      });
    }
  },
  methods: {
    async addCommunity() {
      if (!this.isValid) {
        return
      }
    
      this.loading = true
      try {
        const formData = new FormData()
        formData.append('name', this.inputted.name)
        formData.append('description', this.inputted.description)
    
        if (this.inputted.image !== null) {
          formData.append('image', this.inputted.image)
        }
    
        const config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
    
        this.formReset()
    
        await this.$axios.$post('api/v1/communities', formData, config)
        this.$store.dispatch('getToast', { msg: 'コミュニティを作成しました', color: 'success' })
    
        const communities = await this.$axios.$get('api/v1/communities')
        this.$store.commit('setCommunityList', communities)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        let errorMsg = "コミュニティを作成できませんでした";
        if (error.response && error.response.data && error.response.data.error) {
          errorMsg = error.response.data.error;
        }
        this.$store.dispatch('getToast', { msg: errorMsg, color: "error" });
      } finally {
        this.loading = false
      }
    },
    formReset () {
      this.sentIt = false
      this.$refs.new.reset()
    }
  }
}
</script>