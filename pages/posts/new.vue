<template>
  <div>
    <v-container>
      <v-list-item>
        <v-list-item-title
          class="font-weight-bold"
        >
          投稿
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
              @submit.prevent="addPost"
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
                          つぶやきを投稿する
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

    <PostTable
      title="投稿済み"
      message="投稿しておりません。"
      :posts="newPosts"
    />
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
      return this.inputted.image ? URL.createObjectURL(this.inputted.image) : noImg;
    },
    newPosts () {
      const userPosts = this.$store.state.post.list.filter(post => post.user_id === this.$auth.user.id);
      return userPosts.sort((a, b) => {
        if (a.created_at > b.created_at) return -1;
        if (a.created_at < b.created_at) return 1;
        return 0;
      });
    }
  },
  methods: {
    async addPost() {
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

      this.formReset();

      try {
        await this.$axios.$post('/api/v1/posts', formData, config);
        this.$store.dispatch('getToast', { msg: 'つぶやきを投稿しました', color: 'success' });
        const posts = await this.$axios.$get('api/v1/posts');
        this.$store.dispatch('getPostList', posts);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        let errorMsg = "つぶやきを投稿できませんでした";
        if (error.response && error.response.data && error.response.data.error) {
          errorMsg = error.response.data.error;
        }
        this.$store.dispatch('getToast', { msg: errorMsg, color: "error" });
      } finally {
        this.loading = false;
      }
    },
    formReset () {
      this.sentIt = false
      this.$refs.new.reset()
    },
  }
}
</script>