<template>
  <div>
    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
          <v-list
            color="transparent"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  class="font-weight-bold"
                >
                  投稿
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider/>
        </v-col>
      </v-row>
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
                  <v-list-item-content>
                    <v-list-item-title
                      class="font-weight-bold"
                    >
                      つぶやき
                    </v-list-item-title>
                  </v-list-item-content>
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
                </v-list-item>
              </v-list>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col>
          <v-list
            color="transparent"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  class="font-weight-bold"
                >
                  投稿済み（{{ newPosts.length }}件）
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider/>
          <v-list
            v-show="!newPosts.length"
            color="transparent"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  投稿しておりません。
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
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
            v-show="newPosts.length"
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
                class="text-decoration-none"
              >
                <span
                  v-show="item.title.length>13"
                >
                  {{ item.title.substring(0, 13)+'...' }}
                </span>
                <span
                  v-show="item.title.length<=13"
                >
                  {{ item.title }}
                </span>
              </nuxt-link>
            </template>
            <template
              #[`item.text`]="{ item }"
            >
              <span
                v-show="item.body.length>37"
              >
                {{ item.body.substring(0, 37)+'...' }}
              </span>
              <span
                v-show="item.body.length<=37"
              >
                {{ item.body }}
              </span>
            </template>
            <template
              #[`item.like`] = "{ item }"
            >
              <v-btn
                v-show="!$store.state.post.favorite.some(favorite => favorite.id === item.id)"
                :class="{ likeColor: $store.state.post.favorite.some(favorite => favorite.id === item.id) }"
                class="ml-0"
                style="background:grey"
                fab
                dark
                x-small
                @click="addPostFavorite(item.id)"
              >
                <v-icon>
                  mdi-thumb-up
                </v-icon>
              </v-btn>
              <v-btn
                v-show="$store.state.post.favorite.some(favorite => favorite.id === item.id)"
                :class="{ likeColor: $store.state.post.favorite.some(favorite => favorite.id === item.id) }"
                class="ml-0"
                style="background:grey"
                fab
                dark
                x-small
                @click="deletePostFavorite(item.id)"
              >
                <v-icon>
                  mdi-thumb-up
                </v-icon>
              </v-btn>
              <span
                class="font-weight-bold ml-1"
              >
                {{ $store.state.post.favorites.filter(favorites => favorites.post_id === item.id).length }}
              </span>
              <v-btn
                v-show="!$store.state.post.unfavorite.some(unfavorite => unfavorite.id === item.id)"
                :class="{ dislikeColor: $store.state.post.unfavorite.some(unfavorite => unfavorite.id === item.id) }"
                class="ml-2"
                style="background:grey"
                fab
                dark
                x-small
                @click="addPostUnfavorite(item.id)"
              >
                <v-icon>
                  mdi-thumb-down
                </v-icon>
              </v-btn>
              <v-btn
                v-show="$store.state.post.unfavorite.some(unfavorite => unfavorite.id === item.id)"
                :class="{ dislikeColor: $store.state.post.unfavorite.some(unfavorite => unfavorite.id === item.id) }"
                class="ml-2"
                style="background:grey"
                fab
                dark
                x-small
                @click="deletePostUnfavorite(item.id)"
              >
                <v-icon>
                  mdi-thumb-down
                </v-icon>
              </v-btn>
              <span
                class="font-weight-bold ml-1"
              >
                {{ $store.state.post.unfavorites.filter(unfavorites => unfavorites.post_id === item.id).length }}
              </span>
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
  middleware: ['get-post-list'],
  data () {
    const titleMax = 30
    const bodyMax = 400
    return {
      noImg,
      page: 1,
      pageSize: 10,
      isValid: false,
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
      inputted: { title: '', user_id: this.$auth.user.id, body: '', image: null }
    }
  },
  computed: {
    url() {
      console.log(this.inputted.image)
      if(this.inputted.image===null) {
        return noImg
      } else {
        return URL.createObjectURL(this.inputted.image);
      }
    },
    newPosts () {
      const copyNewPosts = Array.from(this.$store.state.post.list.filter((x) => x.user_id === this.$auth.user.id))
      return copyNewPosts.sort((a, b) => {
        if (a.created_at > b.created_at) { return -1 }
        if (a.created_at < b.created_at) { return 1 }
        return 0
      })
    }
  },
  methods: {
    addPost() {
      this.loading = true
      if (this.isValid) {
        const asyncFunc = async() => {
          const formData = new FormData()
          formData.append('title', this.inputted.title)
          formData.append('user_id', this.inputted.user_id)
          formData.append('body', this.inputted.body)
          if (this.inputted.image !== null) {
            formData.append('image', this.inputted.image)
          }
          const config = {
            header: {
              "Content-Type": "multipart/form-data"
            }
          }
          this.formReset()
          await this.$axios.$post('/api/v1/posts', formData, config)
          .then(response => {
            const msg = 'つぶやきを投稿しました'
            const color = 'success'
            return this.$store.dispatch('getToast', { msg, color })
          })
          .catch(error => {
            console.log(error)
            const msg = 'つぶやきを投稿できませんでした'
            const color = 'error'
            return this.$store.dispatch('getToast', { msg, color })
          })
          await this.$axios.$get('api/v1/posts')
          .then(posts => this.$store.dispatch('getPostList', posts))
        }
        asyncFunc().finally(response => console.log(response))
      }
      this.loading = false
    },
    formReset () {
      this.sentIt = false
      this.$refs.new.reset()
    },
    addPostFavorite(id) {
      const asyncFunc = async() => {
        const formData = new FormData()
        formData.append('post_id', id)
        formData.append('user_id', this.$auth.user.id)
        await this.$axios.$post('/api/v1/post_favorites', formData)
        .then(response => console.log(response))
        .catch(error => console.log(error))
        await Promise.all([
          this.$axios.$get(`api/v1/post_favorites/${this.$auth.user.id}`),
          this.$axios.$get('api/v1/post_favorites'),
          this.$axios.$get(`api/v1/post_unfavorites/${this.$auth.user.id}`),
          this.$axios.$get('api/v1/post_unfavorites')
        ])
        .then(response => {
          this.$store.dispatch('getPostFavorite', response[0])
          this.$store.dispatch('getPostFavorites', response[1])
          this.$store.dispatch('getPostUnfavorite', response[2])
          this.$store.dispatch('getPostUnfavorites', response[3])
        })
      }
      asyncFunc().finally(response => console.log(response))
    },
    deletePostFavorite(id) {
      const asyncFunc = async() => {
        const formData = new FormData()
        formData.append('post_id', id)
        formData.append('user_id', this.$auth.user.id)
        await this.$axios.$delete('/api/v1/post_favorites', {data: formData})
        .then(response => console.log(response))
        .catch(error => console.log(error))
        await Promise.all([
          this.$axios.$get(`api/v1/post_favorites/${this.$auth.user.id}`),
          this.$axios.$get('api/v1/post_favorites')
        ])
        .then(response => {
          this.$store.dispatch('getPostFavorite', response[0])
          this.$store.dispatch('getPostFavorites', response[1])
        })
      }
      asyncFunc().finally(response => console.log(response))
    },
    addPostUnfavorite(id) {
      const asyncFunc = async() => {
        const formData = new FormData()
        formData.append('post_id', id)
        formData.append('user_id', this.$auth.user.id)
        await this.$axios.$post('/api/v1/post_unfavorites', formData)
        .then(response => console.log(response))
        .catch(error => console.log(error))
        await Promise.all([
          this.$axios.$get(`api/v1/post_favorites/${this.$auth.user.id}`),
          this.$axios.$get('api/v1/post_favorites'),
          this.$axios.$get(`api/v1/post_unfavorites/${this.$auth.user.id}`),
          this.$axios.$get('api/v1/post_unfavorites'),
        ])
        .then(response => {
          this.$store.dispatch('getPostFavorite', response[0])
          this.$store.dispatch('getPostFavorites', response[1])
          this.$store.dispatch('getPostUnfavorite', response[2])
          this.$store.dispatch('getPostUnfavorites', response[3])
        })
      }
      asyncFunc().finally(response => console.log(response))
    },
    deletePostUnfavorite(id) {
      const asyncFunc = async() => {
        const formData = new FormData()
        formData.append('post_id', id)
        formData.append('user_id', this.$auth.user.id)
        await this.$axios.$delete('/api/v1/post_unfavorites', {data: formData})
        .then(response => console.log(response))
        .catch(error => console.log(error))
        await Promise.all([
          this.$axios.$get(`api/v1/post_unfavorites/${this.$auth.user.id}`),
          this.$axios.$get('api/v1/post_unfavorites'),
        ])
        .then(response => {
          this.$store.dispatch('getPostUnfavorite', response[0])
          this.$store.dispatch('getPostUnfavorites', response[1])
        })
      }
      asyncFunc().finally(response => console.log(response))
    }
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