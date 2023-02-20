<template>
  <div
    id="communities"
  >
    <logged-in-app-community-eye-catch/>
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
                  作成
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
              @submit.prevent="addCommunity"
            >
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      class="font-weight-bold"
                    >
                      コミュニティ
                    </v-list-item-title>
                  </v-list-item-content>
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
                      label="名前"
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
                      label="紹介文"
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
                  作成済み（{{ newCommunities.length }}件）
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider/>
          <v-container
            v-show="!newCommunities.length"
          >
            <v-row>
              <v-col
                cols="12"
              >
                <v-list
                  color="transparent"
                >
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        作成しておりません。
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-container>
          <v-container
            v-show="newCommunities.length"
          >
            <v-row
              justify="center"
              align="center"
            >
              <v-col
                cols="12"
              >
                <v-container>
                  <v-row
                    align="center"
                  >
                    <v-col
                      v-for="(community, i) in newCommunities.slice(this.pageSize*(this.page-1),this.pageSize*(this.page))"
                      :key="`card-community-${i}`"
                      cols="12"
                      :sm="card.sm"
                      :md="card.md"
                    >
                      <v-card
                        block
                        :height="card.height"
                        :elevation="card.elevation"
                        :to="$my.communityLinkToDetail(community.id)"
                        class="v-btn text-capitalize align-center"
                      >
                        <v-container>
                          <v-col
                            cols="12"
                          >
                            <v-row>
                              <v-card-title
                                class="pb-1 d-block text-truncate font-weight-bold"
                              >
                                {{ community.name.substring(0, 13)+'...' }}
                              </v-card-title>
                              <v-card-text
                                class="caption grey--text text--darken-1"
                              >
                                {{ community.text.substring(0, 23)+'...'}}
                              </v-card-text>
                            </v-row>
                          </v-col>
                        </v-container>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>

    <v-pagination
      class="my-6"
      v-model="page"
      v-show="newCommunities.length"
      :length="Math.ceil(this.newCommunities.length/this.pageSize)"
      circle
    >
    </v-pagination>
  </div>
</template>

<script>
import noImg from '~/assets/images/logged-in/no.png'

export default {
  layout: 'logged-in',
  middleware: ['get-community-list'],
  data () {
    const nameMax = 16
    const textMax = 300
    return {
      noImg,
      page: 1,
      pageSize: 10,
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
      textRules: [
        textMax,
        v => !!v || '',
        v => (!!v && textMax >= v.length) || `${textMax}文字以内で入力してください`
      ],
      inputted: { name: '', maker: this.$auth.user.name, text: '', image: null },
      container: {
        sm: 10,
        md: 8
      },
      card: {
        sm: 6,
        md: 4,
        height: 110,
        elevation: 4
      }
    }
  },
  computed: {
    url() {
      if(this.inputted.image===null) {
        return noImg
      } else {
        return URL.createObjectURL(this.inputted.image)
      }
    },
    newCommunities () {
      const copyNewCommunities = Array.from(this.$store.state.community.list.filter((x) => x.maker === this.$auth.user.name))
      return copyNewCommunities.sort((a, b) => {
        if (a.updated_at > b.updated_at) { return -1 }
        if (a.updated_at < b.updated_at) { return 1 }
        return 0
      })
    }
  },
  methods: {
    async addCommunity() {
      this.loading = true
      if (this.isValid) {
        const formData = new FormData()
        formData.append('name', this.inputted.name)
        formData.append('maker', this.inputted.maker)
        formData.append('text', this.inputted.text)
        if (this.inputted.image !== null) {
          formData.append('image', this.inputted.image)
        }
        const config = {
          header: {
            "Content-Type": "multipart/form-data"
          }
        }
        await this.$axios.$post('api/v1/communities', formData, config)
        .then(response => {
          this.$router.go({path: this.$router.currentRoute.path, force: true})
          const msg = 'コミュニティを作成しました'
          const color = 'success'
          return this.$store.dispatch('getToast', { msg, color })
        })
        .catch(error => {
          console.log(error)
          const msg = 'コミュニティの作成に失敗しました'
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
#communities {
  .v-parallax__content {
    padding: 0;
  }
}
</style>