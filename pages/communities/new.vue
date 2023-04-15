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
              v-model="valid"
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
                      v-model="inp.image"
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
                      v-model="inp.name"
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
                      v-model="inp.description"
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
                        :disabled="!valid || loading"
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
              <v-list-item-title
                class="font-weight-bold"
              >
                作成済み（{{ newCommunities.length }}件）
              </v-list-item-title>
            </v-list-item>
          </v-list>
          <v-divider/>
          <v-list
            v-show="!newCommunities.length"
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
                      v-for="(community, i) in newCommunities.slice(pageSize*(page-1),pageSize*(page))"
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
                                <span
                                  v-show="community.name.length>13"
                                >
                                  {{ community.name.substring(0, 13)+'...' }}
                                </span>
                                <span
                                  v-show="community.name.length<=13"
                                >
                                  {{ community.name }}
                                </span>
                              </v-card-title>
                              <v-card-text
                                class="caption grey--text text--darken-1"
                              >
                                <span
                                  v-show="community.description.length>23"
                                >
                                  {{ community.description.substring(0, 23)+'...'}}
                                </span>
                                <span
                                  v-show="community.description.length<=23"
                                >
                                  {{ community.description }}
                                </span>
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
      v-show="newCommunities.length"
      v-model="page"
      class="my-6"
      :length="Math.ceil(newCommunities.length/pageSize)"
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
    const nameMax = 13
    const descMax = 300
    return {
      noImg,
      page: 1,
      pageSize: 10,
      valid: false,
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
      inp: { name: '', user_id: this.$auth.user.id, description: '', image: null },
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
      if(this.inp.image===null) {
        return noImg
      } else {
        return URL.createObjectURL(this.inp.image)
      }
    },
    newCommunities () {
      const copyNewCommunities = Array.from(this.$store.state.community.list.filter((x) => x.user.id === this.$auth.user.id))
      return copyNewCommunities.sort((a, b) => {
        if (a.created_at > b.created_at) { return -1 }
        if (a.created_at < b.created_at) { return 1 }
        return 0
      })
    }
  },
  methods: {
    addCommunity() {
      this.loading = true
      if (this.valid) {
        const asyncFunc = async() => {
          const formData = new FormData()
          formData.append('name', this.inp.name)
          formData.append('user_id', this.inp.user_id)
          formData.append('description', this.inp.description)
          if (this.inp.image !== null) {
            formData.append('image', this.inp.image)
          }
          const config = {
            header: {
              "Content-Type": "multipart/form-data"
            }
          }
          this.formReset()
          await this.$axios.$post('api/v1/communities', formData, config)
          .then(response => {
            const msg = 'コミュニティを作成しました'
            const color = 'success'
            return this.$store.dispatch('getToast', { msg, color })
          })
          .catch(error => {
            console.log(error)
            const msg = 'コミュニティを作成できませんでした'
            const color = 'error'
            return this.$store.dispatch('getToast', { msg, color })
          })
          await this.$axios.$get('api/v1/communities')
          .then(communities => this.$store.dispatch('getCommunityList', communities))
        }
        asyncFunc().finally(response => console.log(response))
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