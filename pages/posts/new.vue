<template>
  <div
    id="posts"
  >
    <logged-in-app-post-eye-catch/>
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
                      農家の呟き
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
                            農家の呟きを投稿する
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
            :items="newPosts.slice(this.pageSize*(this.page-1),this.pageSize*(this.page))"
            item-key="id"
            hide-default-footer
          >
            <template
              v-slot:[`item.title`]="{ item }"
            >
              <nuxt-link
                :to="$my.postLinkToDetail(item.id)"
                class="text-decoration-none"
              >
                {{ item.name.substring(0, 13)+'...' }}
              </nuxt-link>
            </template>
            <template
              v-slot:[`item.text`]="{ item }"
            >
              {{ item.text.substring(0, 37)+'...' }}
            </template>
            <template
              v-slot:[`item.like`] = "{ item }"
            >
              <v-btn
                @click="$store.dispatch('updatePostLikeState', item)"
                :class="{ likeColor: item.like}"
                style="background:grey"
                fab
                dark
                x-small
              >
                <v-icon>
                  mdi-thumb-up
                </v-icon>
              </v-btn>
              <span
                class="font-weight-bold ml-1"
              >
                Good
              </span>
              <v-btn
                @click="$store.dispatch('updatePostDislikeState', item)"
                :class="{ dislikeColor: item.dislike }"
                class="ml-2"
                style="background:grey"
                fab
                dark
                x-small
              >
                <v-icon>
                  mdi-thumb-down
                </v-icon>
              </v-btn>
              <span
                class="font-weight-bold ml-1"
              >
                Bad
              </span>
            </template>
            <template
              v-slot:[`item.updatedAt`]="{ item }"
            >
              {{ $my.dataFormat(item.updated_at) }}
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
    <v-pagination
      class="my-6"
      v-model="page"
      v-show="newPosts.length"
      :length="Math.ceil(this.newPosts.length/this.pageSize)"
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
    const nameMax = 40
    const textMax = 600
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
          text: '呟き',
          value: 'text'
        },
        {
          text: 'いいね履歴',
          width: 200,
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
      nameRules: [
        nameMax,
        v => !!v || '',
        v => (!!v && nameMax >= v.length) || `${nameMax}文字以内で入力してください`
      ],
      textRules: [
        textMax,
        v => !!v || '',
        v => (!!v && textMax >= v.length) || `${textMax}文字以内で入力してください`
      ],
      inputted: { name: '', poster: this.$auth.user.name, text: '', image: null }
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
      const copyNewPosts = Array.from(this.$store.state.post.list.filter((x) => x.poster === this.$auth.user.name))
      return copyNewPosts.sort((a, b) => {
        if (a.updated_at > b.updated_at) { return -1 }
        if (a.updated_at < b.updated_at) { return 1 }
        return 0
      })
    }
  },
  methods: {
    async addPost () {
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
        await this.$axios.$post('/api/v1/posts', formData, config)
        .then(response => {
          this.$router.go({path: this.$router.currentRoute.path, force: true})
          const msg = '農家の呟きを投稿しました'
          const color = 'success'
          return this.$store.dispatch('getToast', { msg, color })
        })
        .catch(error => {
          console.log(error)
          const msg = '農家の呟きを投稿できませんでした'
          return this.$store.dispatch('getToast', { msg })
        })
      }
      this.loading = false
    },
    formReset () {
      this.sentIt = false
      this.$refs.new.reset()
    }
  }
}
</script>

<style lang="scss">
#posts {
  .v-parallax__content {
    padding: 0;
  }
.likeColor {
  background: #CC0000 !important;
}
.dislikeColor {
  background: #336791 !important;
}
}
</style>