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
              v-model="valid"
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
                          :disabled="!valid || loading"
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

    <v-container>
      <v-list-item>
        <v-list-item-title
          class="font-weight-bold"
        >
          投稿済み（{{ newPosts.length }}件）
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
      <v-list-item v-show="!newPosts.length">
        <v-list-item-title>
          投稿しておりません。
        </v-list-item-title>
      </v-list-item>
    </v-container>

    <v-container
      v-show="newPosts.length"
    >
      <v-row
        justify="center"
      >
        <v-col
          cols="12"
        >
          <v-data-table
            :headers="tableHeaders"
            :items="newPosts.slice(pageSize*(page-1),pageSize*(page))"
            item-key="id"
            hide-default-footer
          >
            <template
              #[`item.title`]="{ item }"
            >
              <nuxt-link
                :to="$my.postLinkToDetail(item.id)"
                class="text-decoration-none teal--text"
              >
                {{ item.title.length > 13 ? item.title.substring(0, 13) + '...' : item.title }}
              </nuxt-link>
            </template>
            <template #[`item.body`]="{ item }">
              {{ item.body.length > 37 ? item.body.substring(0, 37) + '...' : item.body }}
            </template>
            <template
              #[`item.like`] = "{ item }"
            >
              <div style="display: flex;">
                <div v-for="actionType in ['favorite', 'unfavorite']" :key="actionType + 'Wrapper'">
                  <v-btn
                    :key="actionType + 'Btn'"
                    :class="buttonClass(actionType, item.id)"
                    class="ml-0"
                    fab
                    dark
                    x-small
                    @click="handleFavorites(item.id, actionType, $store.state.post[actionType].some(x => x.id === item.id) ? 'delete' : 'post')"
                  >
                    <v-icon>
                      {{ actionType === 'favorite' ? 'mdi-thumb-up' : 'mdi-thumb-down' }}
                    </v-icon>
                  </v-btn>
                  <span :key="actionType + 'Count'" class="font-weight-bold ml-1" :class="{ 'mr-3': actionType === 'favorite' }">
                    {{
                      $store.state.post[actionType + 's'].filter(
                        x => x.post_id === item.id
                      ).length
                    }}
                  </span>
                </div>
              </div>
            </template>
            <template
              #[`item.updatedAt`]="{ item }"
            >
              {{ $my.dataFormat(item.updated_at) }}
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
    <v-pagination
      v-show="newPosts.length"
      v-model="page"
      class="my-6"
      :length="Math.ceil(newPosts.length/pageSize)"
      circle
    >
    </v-pagination>
  </div>
</template>

<script>
import noImg from '~/assets/images/logged-in/no.png'
export default {
  layout: 'logged-in',
  data () {
    const titleMax = 30
    const bodyMax = 400
    return {
      noImg,
      page: 1,
      pageSize: 10,
      valid: false,
      loading: false,
      container: {
        sm: 10,
        md: 8
      },
      card: {
        sm: 6,
        md: 4,
        height: 110,
        elevation: 4
      },
      tableHeaders: [
        {
          text: 'タイトル',
          value: 'title'
        },
        {
          text: 'つぶやき',
          value: 'body'
        },
        {
          text: 'いいね履歴',
          width: 170,
          value: 'like'
        },
        {
          text: '更新日',
          width: 150,
          value: 'updatedAt'
        }
      ],
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
      const userPosts = this.$store.state.post.list.filter(x => x.user_id === this.$auth.user.id);
      return userPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
  },
  methods: {
    async addPost() {
      if (!this.valid) {
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
      } catch (error) {
        this.$store.dispatch('getToast', { msg: 'つぶやきを投稿できませんでした', color: 'error' });
      }

      const posts = await this.$axios.$get('api/v1/posts');
      this.$store.dispatch('getPostList', posts);
    
      this.loading = false;
    },
    formReset () {
      this.sentIt = false
      this.$refs.new.reset()
    },
    async handleFavorites(id, type, method) {
      try {
        if (method === 'delete') {
          await this.$axios[method](`/api/v1/post_${type}s/${id}/user`);
        } else {
          await this.$axios[method](`/api/v1/post_${type}s`, { post_id: id })
        }
    
        await this.updateFavoritesAndUnfavorites();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    async updateFavoritesAndUnfavorites() {
      const [userFavorites, allFavorites, userUnfavorites, allUnfavorites] = await Promise.all([
        this.$axios.$get(`api/v1/post_favorites/${this.$auth.user.id}`),
        this.$axios.$get('api/v1/post_favorites'),
        this.$axios.$get(`api/v1/post_unfavorites/${this.$auth.user.id}`),
        this.$axios.$get('api/v1/post_unfavorites')
      ]);

      this.$store.dispatch('getPostFavorite', userFavorites);
      this.$store.dispatch('getPostFavorites', allFavorites);
      this.$store.dispatch('getPostUnfavorite', userUnfavorites);
      this.$store.dispatch('getPostUnfavorites', allUnfavorites);
    },
    buttonClass(actionType, id) {
      if (actionType === 'favorite' && this.$store.state.post.favorite.some(item => item.id === id)) {
        return 'likeColor';
      } else if (actionType === 'unfavorite' && this.$store.state.post.unfavorite.some(item => item.id === id)) {
        return 'dislikeColor';
      } else {
        return 'grey';
      }
    },
  }
}
</script>

<style lang="scss">
.likeColor {
  background: #CC0000 !important;
}
.dislikeColor {
  background: #336791 !important;
}
</style>