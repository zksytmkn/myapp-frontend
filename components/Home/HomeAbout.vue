<template>
  <div>
    <v-card-title
      class="justify-center text-h4 mb-10"
    >
        ＊『Edible』ができること
    </v-card-title>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          class="mb-10"
        >
          <v-container>
            <v-row
              justify="center"
              align="center"
            >
              <v-col
                cols="8"
              >
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title
                        class="font-weight-bold teal--text text-h5"
                      >
                        規格外農産物を出品、購入できる！
                      </v-list-item-title>
                      <br/>
                      <v-list-item-subtitle
                        class="font-weight-bold text-subtitle-1"
                        style="white-space:pre-line; line-height:1.5;"
                      >
                          規格外農産物を含みさまざまな野菜や果物を出品、購入していただけます。
                          おいしい野菜や果物を食べたい方も、世の中のフードロスに関心をお持ちの方も、
                          どなたもお気軽にご利用になってください。
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col
                cols="4"
              >
                <v-img
                  :src="productsImg"
                  height="260px"
                  width="370px"
                  class="rounded-lg"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          class="mb-10"
        >
          <v-container>
            <v-row
              justify="center"
              align="center"
            >
              <v-col
                cols="4"
              >
                <v-img
                  :src="postsImg"
                  height="260px"
                  width="370px"
                  class="rounded-lg"
                />
              </v-col>
              <v-col
                cols="8"
              >
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title
                        class="font-weight-bold teal--text text-h5"
                      >
                        皆さまにとって有益な情報を発信、閲覧できる！
                      </v-list-item-title>
                      <br/>
                      <v-list-item-subtitle
                        class="font-weight-bold text-subtitle-1"
                        style="white-space:pre-line; line-height:1.5;"
                      >
                        農家の方々も農家以外の方々も農業に関することや世の中のフードロスに関することなど、
                        さまざまな情報を発信していただけます。皆さまにとって有益な情報がきっとありますので、
                        どなたもお気軽にご利用になってください。
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
    <v-container
      class="mb-10"
    >
      <v-row>
        <v-col
          cols="12"
          class="mb-10"
        >
          <v-container>
            <v-row
              justify="center"
              align="center"
            >
              <v-col
                cols="8"
              >
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title
                        class="font-weight-bold teal--text text-h5"
                      >
                        コミュニティを作成、参加できる！
                      </v-list-item-title>
                      <v-list-item-subtitle
                        class="font-weight-bold text-subtitle-1"
                        style="white-space:pre-line; line-height:1.5;"
                      >
                        コミュニティを自由に作成し、参加しているメンバー間で交流していただけます。
                        農業に関することや世の中のフードロスに関することなど、さまざまなテーマのもと、
                        交流していただけます。どなたもお気軽にご利用になってください。
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col
                cols="4"
              >
                <v-img
                  :src="communitiesImg"
                  height="260px"
                  width="370px"
                  class="rounded-lg"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>

    <v-card-title
      class="justify-center text-h4"
    >
      ＊『Edible』が解決できること
    </v-card-title>
    <v-container
      class="mb-10"
    >
      <v-row>
        <v-col
          cols="12"
          class="py-0"
        >
          <v-card-actions
            class="py-0"
          >
            <v-spacer />
            <v-radio-group
              v-model="answerer"
              row
            >
              <v-radio
                v-for="(answerer, i) in answerers"
                :key="`answerer-${i}`"
                :label="$t(`menus.answerers.${answerer.label}`)"
                :value="answerer.label"
                :color="answerer.color"
              />
            </v-radio-group>
          </v-card-actions>
        </v-col>
        <v-col
          v-for="(que, i) in questions"
          :key="`que-${i}`"
          cols="12"
          :sm="12 / questions.length"
        >
          <v-card
            class="mx-auto mb-10"
          >
            <v-card-title
              :class="['white--text', que.color]"
              class="font-weight-bold"
            >
              {{ que.name[answerer] }}
              <v-icon
                class="ml-2"
                color="white"
                dense
              >
                {{ que.icon[answerer] }}
              </v-icon>
            </v-card-title>
  
            <v-card-actions
              class="justify-center align-baseline font-weight-bold"
              style="color:rgba(0, 0, 0, 0.9);"
            >
              {{ que.text[answerer] }}
            </v-card-actions>
            <v-divider/>
            <v-card-actions
              class="justify-center align-baseline font-weight-bold"
              style="color:rgba(0, 128, 128, 0.9);"
            >
              {{ que.answer[answerer] }}
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-card-title
      class="justify-center text-h4"
    >
      ＊さぁ、今すぐ無料で始めましょう
    </v-card-title>
    <v-list
      class="mb-10"
    >
      <v-list-item
        class="text-center font-weight-bold"
      >
        <v-list-item-content>
          <v-list-item-title>
            全ての機能が無料でご利用できます！
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        class="justify-center"
      >
        <before-login-app-bar-signup-button>
          無料で会員登録する
        </before-login-app-bar-signup-button>
        <before-login-app-bar-guest-login-button>
          無料で機能を試す
        </before-login-app-bar-guest-login-button>
      </v-list-item>
      <v-list-item
        class="justify-center"
      >
        <nuxt-link
          class="ml-2 font-weight-bold teal--text"
          to="/login"
        >
          すでにアカウントをお持ちの方はこちら
        </nuxt-link>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import productsImg from '~/assets/images/before-logged-in/products.png'
import postsImg from '~/assets/images/before-logged-in/posts.png'
import communitiesImg from '~/assets/images/before-logged-in/communities.png'

export default {
  data () {
    const answerers = [
      { label: 'first', color: 'teal' },
      { label: 'second', color: 'teal' }
    ]
    return {
      productsImg,
      postsImg,
      communitiesImg,
      answerers,
      answerer: answerers[0].label,
      questions: [
        {
          name: {
            first: 'No. 1',
            second: 'No. 4'
          },
          color: 'teal',
          text: {
            first: '農家的側面',
            second: '教育的側面'
          },
          answer: {
            first: '規格外農産物であっても『農産物』機能を使って出品できるため、規格外農産物が多く生産される場合でも生計を立てることができます！',
            second: '『つぶやき』と『コミュニティ』機能によって、世の中のフードロスや環境問題の情報を共有し、ユーザーの皆さんの環境意識は向上します。'
          },
          icon: {
            first: 'mdi-food-apple',
            second: 'mdi-school'
          }
        },
        {
          name: {
            first: 'No. 2',
            second: 'No. 5'
          },
          color: 'teal',
          text: {
            first: '消費者的側面',
            second: '地域的側面'
          },
          answer: {
            first: '規格外農産物は通常の農産物と比較すると、安く販売されているため、きっといつもよりもお得にお買いものができます！',
            second: '47都道府県各地の農産物を取り扱っているため、地元の農家と消費者の直接的な繋がりを構築し、地域の活性化に貢献できます。'
          },
          icon: {
            first: 'mdi-account',
            second: 'mdi-handshake'
          }
        },
        {
          name: {
            first: 'No. 3',
            second: 'No. 6'
          },
          color: 'teal',
          text: {
            first: '環境的側面',
            second: 'サポート的側面'
          },
          answer: {
            first: 'SDGsから考えると世の中のフードロス削減は、環境にやさしい取り組みであり、廃棄物の削減や地球温暖化の防止にも繋がります。', 
            second: '農家、消費者、世の中のフードロスに関心ある人が繋がって、サポートネットワークが構築され、助け合いや協力が生まれます。'
          },
          icon: {
            first: 'mdi-earth',
            second: 'mdi-hand-heart'
          }
        }
      ]
    }
  }
}
</script>