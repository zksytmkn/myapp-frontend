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
      <v-list-item>
        <v-list-item-title
          class="font-weight-bold"
        >
          作成済み（{{ newCommunities.length }}件）
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
      <v-list-item
        v-show="!newCommunities.length"
      >
        <v-list-item-title>
          作成しておりません。
        </v-list-item-title>
      </v-list-item>
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
                        <v-card-title class="pb-1 d-block text-truncate text-none font-weight-bold">
                          {{ community.name.length > 13 ? community.name.substring(0, 13) + '...' : community.name }}
                        </v-card-title>
                        <v-card-text class="caption grey--text text-none text--darken-1">
                          {{ community.description.length > 23 ? community.description.substring(0, 23) + '...' : community.description }}
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
      inputted: { name: '', description: '', image: null },
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
      return this.inputted.image ? URL.createObjectURL(this.inputted.image) : noImg;
    },
    newCommunities() {
      const userCommunities = this.$store.state.community.list.filter(x => x.user_id === this.$auth.user.id);
      return userCommunities.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
  },
  methods: {
    async addCommunity() {
      if (!this.valid) {
        this.loading = false
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
        this.$store.dispatch('getCommunityList', communities)
      } catch (error) {
        this.$store.dispatch('getToast', { msg: 'コミュニティを作成できませんでした', color: 'error' })
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