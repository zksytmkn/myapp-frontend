<template>
  <div
    id="communities"
  >
    <logged-in-app-eye-catch>
      <template
        v-slot
      >
        Different kinds of communities are here !
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
                        label="名前"
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
                        label="作成者"
                        v-model="searchedMaker"
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
                    >
                      <v-row
                        justify="center"
                      >
                        <v-btn
                          @click="$store.dispatch('updateCommunitySearchCondition', { name: searchedName, maker: searchedMaker, type: searchedType, region: searchedRegion, prefecture: searchedPrefecture })"
                          class="font-weight-bold mt-3 mb-9"
                          color="teal"
                          outlined
                          dark
                        >
                          コミュニティを検索する
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
          検索結果 {{ searchedCommunities.length }}件
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
    </v-container>

    <v-container>
      <v-row
        justify="center"
        align="center"
      >
        <v-col
          cols="12"
        >
          <v-row
            align="center"
          >
            <v-col
              v-for="(community, i) in searchedCommunities"
              :key="`card-community-${i}`"
              cols="12"
              :sm="card.sm"
              :md="card.md"
            >
              <v-card
                block
                :height="card.height"
                :elevation="card.elevation"
                :to="$my.communityLinkTo(community.id)"
                class="v-btn text-capitalize align-center"
              >
                <v-container>
                  <v-card-title
                    class="pb-1 d-block text-truncate font-weight-bold"
                  >
                    {{ community.name }}
                  </v-card-title>
                  <v-card-text
                    class="caption grey--text text--darken-1"
                  >
                    {{ community.text.substring(0, 30)+'...'}}
                  </v-card-text>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-pagination
      class="my-10"
      v-model="page"
      :length="6"
      circle
    >
    </v-pagination>
  </div>
</template>

<script>
export default {
  layout: 'logged-in',
  middleware: ['get-community-list'],
  data () {
    return {
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
      searchedName: '',
      searchedMaker: '',
      searchedType: [],
      searchedRegion: [],
      searchedPrefecture: [],
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
      ]
    }
  },
  computed: {
    searchedCommunities () {
      const searchCondition = this.$store.state.community.searchCondition

      let copySearchedCommunities = Array.from(this.$store.state.community.list).
      filter((x) => x.name.includes(searchCondition.name) && x.maker.includes(searchCondition.maker))

      if (searchCondition.type.length !== 0) {
        copySearchedCommunities = copySearchedCommunities.filter((x) => searchCondition.type.some(str => x.type.includes(str)))
      }
      if (searchCondition.region.length !== 0) {
        copySearchedCommunities = copySearchedCommunities.filter((x) => searchCondition.region.some(str => x.region.includes(str)))
      }
      if (searchCondition.prefecture.length !== 0) {
        copySearchedCommunities = copySearchedCommunities.filter((x) => searchCondition.prefecture.some(str => x.prefecture.includes(str)))
      }

      return copySearchedCommunities.sort((a, b) => {
        if (a.updatedAt > b.updatedAt) { return -1 }
        if (a.updatedAt < b.updatedAt) { return 1 }
        return 0
      })
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