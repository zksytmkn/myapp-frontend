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
                          規格外農産物につきましても出品時チェックによって品質は十分に保証されます。
                          その為、安心して本サービスをご利用していただけます。
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col
                cols="4"
              >
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
                        農家にとって有益な情報を発信、閲覧できる！
                      </v-list-item-title>
                      <br/>
                      <v-list-item-subtitle
                        class="font-weight-bold text-subtitle-1"
                        style="white-space:pre-line; line-height:1.5;"
                      >
                        農家の方々は農業に関するさまざまな情報を発信していただけますし、他の農家の方々はそれらの情報を閲覧していただけます。すでに本サービスにはたくさんの情報が発信されておりますので、ご自身に合ってそうな情報から閲覧ください。
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
                        農家、消費者、地元間のコミュニティを作成、参加していただくことによって、
                        参加メンバー同士で交流できます。農業に関することや旬の農産物のことなど、
                        お好きなように会話し、交流していただけます。
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col
                cols="4"
              >
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>

    <v-card-title
      class="justify-center text-h4"
    >
      ＊『Edible』が解決できる悩み
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
              v-model="user"
              row
            >
              <v-radio
                v-for="(user, i) in users"
                :key="`user-${i}`"
                :label="$t(`menus.users.${user.label}`)"
                :value="user.label"
                :color="user.color"
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
              {{ que.name[user] }}
              <v-icon
                color="white"
                dense
              >
                mdi-account-question
              </v-icon>
            </v-card-title>
  
            <v-card-actions
              class="justify-center align-baseline font-weight-bold"
              style="color:rgba(0, 0, 0, 0.73);"
            >
              {{ que.text[user] }}
            </v-card-actions>
            <v-divider/>
            <v-card-actions
              class="justify-center align-baseline font-weight-bold"
              style="color:rgba(255, 0, 0, 0.73);"
            >
              {{ que.answer[user] }}
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
export default {
  data () {
    const users = [
      { label: 'farmer', color: 'teal' },
      { label: 'consumer', color: 'teal' }
    ]
    return {
      users,
      user: users[0].label,
      questions: [
        {
          name: {
            farmer: '農家の悩み',
            consumer: '消費者の悩み'
          },
          color: 'teal',
          text: {
            farmer: '味が同じでも形が悪いため、捨てられる農産物が一定数存在するのですが、そちらも出品できますでしょうか？',
            consumer: '私の地元は農産物があまり売られていないため、困っているのですが、農産物を購入後は遠くにも届けていただけますでしょうか？'
          },
          answer: {
            farmer: '出品できます！出品時チェックがあるのですが、そちらの基準を満たしていたら、出品できます！',
            consumer: '遠くに届けることもできます！日本各地から出品いただいているため、ご対応できます！'
          }
        },
        {
          name: {
            farmer: '農家の悩み',
            consumer: '消費者の悩み'
          },
          color: 'teal',
          text: {
            farmer: '農業に悩むこともあるのですが、農家にとっての有益な情報も得られますでしょうか？',
            consumer: '趣味で農業を始めるのですが、農業に関する情報は得られますでしょうか？'
          },
          answer: {
            farmer: '有益な情報も得られます！『農家の呟き』という機能があるのですが、そちらを使って有益な情報を閲覧していただけます！',
            consumer: '農業に関する情報も得られます！『農家の呟き』という機能があるのですが、そちらを使って情報を閲覧していただけます！'
          }
        },
        {
          name: {
            farmer: '農家の悩み',
            consumer: '消費者の悩み'
          },
          color: 'teal',
          text: {
            farmer: '他の農家や地元の方と交流を深めたいのですが、それはできますでしょうか？',
            consumer: '地元の農家の方々とも交流してみたいのですが、それはできますでしょうか？'
          },
          answer: {
            farmer: '交流を深めることもできます！『コミュニティ』という機能があるのですが、そちらを使って他の方々と交流を深めていただけます！',
            consumer: '交流してみることもできます！『コミュニティ』という機能があるのですが、そちらを使って他の方々と交流いただけます！'
          }
        }
      ]
    }
  }
}
</script>