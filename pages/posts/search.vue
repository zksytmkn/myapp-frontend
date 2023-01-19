<template>
  <div
    id="posts"
  >
    <logged-in-app-eye-catch>
      <template
        v-slot
      >
        Many farmers post about agriculture here !
        Please look around and enjoy it !
      </template>
    </logged-in-app-eye-catch>
    <v-container>
      <v-list-item>
        <v-list-item-title
          class="font-weight-bold"
        >
          検索
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
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-row
                    justify="center"
                  >
                    <v-col
                      cols="12"
                      sm="6"
                      md="9"
                    >
                      <v-text-field
                        class="mt-10"
                        label="タイトル"
                        v-model="searchedName"
                        dense
                      >
                      </v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="9"
                    >
                      <v-text-field
                        label="投稿者"
                        v-model="searchedPoster"
                        dense
                      >
                      </v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="9"
                    >
                      <v-combobox
                        label="種類"
                        v-model="searchedType"
                        :items="typeItems"
                        multiple
                        chips
                        dense
                      >
                      </v-combobox>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="9"
                    >
                      <v-combobox
                        label="地方"
                        v-model="searchedRegion"
                        :items="regionItems"
                        multiple
                        chips
                        dense
                      >
                      </v-combobox>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="9"
                    >
                      <v-combobox
                        label="地域"
                        v-model="searchedPrefecture"
                        :items="prefectureItems"
                        multiple
                        chips
                        dense
                      >
                      </v-combobox>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="9"
                    >
                      <v-combobox
                        label="対象者"
                        v-model="searchedTarget"
                        :items="targetItems"
                        multiple
                        chips
                        dense
                      >
                      </v-combobox>
                    </v-col>

                    <v-col
                      cols="12"
                    >
                      <v-row
                        justify="center"
                      >
                        <v-btn
                          @click="$store.dispatch('updatePostSearchCondition', { name: searchedName, poster: searchedPoster, type: searchedType, region: searchedRegion, prefecture: searchedPrefecture, target: searchedTarget })"
                          class="font-weight-bold mt-3 mb-9"
                          color="teal"
                          outlined
                          dark
                        >
                          呟きを検索する
                        </v-btn>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-list-item>
        <v-list-item-title
          class="font-weight-bold"
        >
          検索結果 {{ searchedPosts.length }}件
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
    </v-container>
    <v-container
      v-if="searchedPosts.length !== 0"
    >
      <v-row
        justify="center"
      >
        <v-col
          cols="12"
        >
          <v-data-table
            :headers="tableHeaders"
            :items="searchedPosts"
            item-key="id"
            hide-default-footer
          >
            <template
              v-slot:[`item.name`]="{ item }"
            >
              <nuxt-link
                :to="$my.postLinkTo(item.id)"
                class="text-decoration-none"
              >
                {{ item.name }}
              </nuxt-link>
            </template>
            <template
              v-slot:[`item.like`] = "{ item }"
            >
              <v-card-actions
                class="pl-0"
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
              </v-card-actions>
            </template>
            <template
              v-slot:[`item.updatedAt`]="{ item }"
            >
              {{ $my.dataFormat(item.updatedAt) }}
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
    <v-pagination
      class="my-6"
      v-model="page"
      :length="4"
      circle
    >
    </v-pagination>
  </div>
</template>

<script>
export default {
  layout: 'logged-in',
  middleware: ['get-post-list'],
  data () {
    return {
      tableHeaders: [
        {
          text: 'タイトル',
          value: 'name'
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
      searchedName: '',
      searchedPoster: '',
      searchedType: [],
      searchedRegion: [],
      searchedPrefecture: [],
      searchedTarget: [],
      typeItems: [
        '野菜',
        '果物'
      ],
      regionItems: [
        '北海道地方',
        '東北地方',
        '関東地方',
        '中部地方',
        '近畿地方',
        '中国地方',
        '四国地方',
        '九州地方'
      ],
      prefectureItems: [
        '北海道',
        '青森県',
        '岩手県',
        '宮城県',
        '秋田県',
        '山形県',
        '福島県',
        '茨城県',
        '栃木県',
        '群馬県',
        '埼玉県',
        '千葉県',
        '東京都',
        '神奈川県',
        '新潟県',
        '富山県',
        '石川県',
        '福井県',
        '山梨県',
        '長野県',
        '岐阜県',
        '静岡県',
        '愛知県',
        '三重県',
        '滋賀県',
        '京都府',
        '大阪府',
        '兵庫県',
        '奈良県',
        '和歌山県',
        '鳥取県',
        '島根県',
        '岡山県',
        '広島県',
        '山口県',
        '徳島県',
        '香川県',
        '愛媛県',
        '高知県',
        '福岡県',
        '佐賀県',
        '長崎県',
        '熊本県',
        '大分県',
        '宮崎県',
        '鹿児島県',
        '沖縄県'
      ],
      targetItems: [
        '農家対象',
        '消費者対象'
      ]
    }
  },
  computed: {
    searchedPosts () {
      const searchCondition = this.$store.state.post.searchCondition

      let copySearchedPosts = Array.from(this.$store.state.post.list).
      filter((x) => x.name.includes(searchCondition.name) && x.poster.includes(searchCondition.poster))

      if (searchCondition.type.length !== 0) {
        copySearchedPosts = copySearchedPosts.filter((x) => searchCondition.type.some(str => x.type.includes(str)))
      }
      if (searchCondition.region.length !== 0) {
        copySearchedPosts = copySearchedPosts.filter((x) => searchCondition.region.some(str => x.region.includes(str)))
      }
      if (searchCondition.prefecture.length !== 0) {
        copySearchedPosts = copySearchedPosts.filter((x) => searchCondition.prefecture.some(str => x.prefecture.includes(str)))
      }
      if (searchCondition.target.length !== 0) {
        copySearchedPosts = copySearchedPosts.filter((x) => searchCondition.target.some(str => x.target.includes(str)))
      }

      return copySearchedPosts.sort((a, b) => {
        if (a.updatedAt > b.updatedAt) { return -1 }
        if (a.updatedAt < b.updatedAt) { return 1 }
        return 0
      })
    }
  }
}
</script>

<style lang="scss">
#posts {
  .v-parallax__content {
    padding: 0;
  }
}
.likeColor {
  background: #CC0000 !important;
}
.dislikeColor {
  background: #336791 !important;
}
</style>