<template>
  <v-app>
    <home-app-bar
      :menus="menus"
      :img-height="imgHeight"
    />
    <v-img
      id="scroll-top"
      dark
      src="https://picsum.photos/id/11/1920/1080"
      :height="imgHeight"
    >
      <v-container>
        <v-row
          align="center"
          justify="center"
          :style="{ height: `${imgHeight}px` }"
        >
          <v-col
            cols="12"
            class="text-center"
          >
            <v-container>
              <v-row
                justify="center"
                align="center"
              >
                <v-col
                  cols="7"
                >
                  <v-list
                    color="transparent"
                    class="text-left"
                  >
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title
                          class="font-weight-bold text-h5 mb-3"
                          style="white-space:pre-line; line-height:1.5; 
                          text-shadow:1px 1px 1px black;"
                        >
                          『Edible』は規格外農産物を減らし、
                          持続可能な社会の実現を目指します。
                        </v-list-item-title>
                        <div
                          style="background-color:white;"
                        >
                          <v-divider/>
                        </div>
                        <v-list-item-subtitle
                          class="font-weight-bold text-p white--text"
                          style="white-space:pre-line; line-height:1.5; text-shadow:1px 1px 1px black;"
                        >
                          世の中には味が同じでも形が悪いため、棄てられる農産物が全体生産量の2-3割存在します。
                          本サービスはそれら規格外農産物を減らすことを始めとし、世の中のフードロスを減らします。
                          さらにSDGs（持続可能な開発目標）Goal12の『つくる責任、つかう責任』達成に則しています。
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                  <v-list
                    color="transparent"
                    class="text-left"
                  >
                    <v-list-item>
                      <before-login-app-bar-signup-button>
                        無料で会員登録する
                      </before-login-app-bar-signup-button>
                      <before-login-app-bar-guest-login-button>
                        無料で機能を試す
                      </before-login-app-bar-guest-login-button>
                    </v-list-item>
                  </v-list>
                  <v-list
                    color="transparent"
                    class="text-left"
                  >
                    <v-list-item>
                      <nuxt-link
                        class="ml-2 font-weight-bold teal--text"
                        to="/login"
                      >
                        すでにアカウントをお持ちの方はこちら
                      </nuxt-link>
                    </v-list-item>
                  </v-list>
                </v-col>

                <v-col
                  cols="4"
                >
                  <v-list
                    color="transparent"
                    class="text-center"
                  >
                    <v-list-item>
                      <v-img
                        :src=SDGsImg
                        height=330px
                        width=330px
                      >
                      </v-img>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-img>

    <v-sheet>
      <v-container
        :style="{ maxWidth: '1280px' }"
      >
        <v-row
          v-for="(menu, i) in menus"
          :key="`menu-${i}`"
        >
          <v-col
            :id="menu.title"
            cols="12"
          >
            <v-sheet>
              <v-card-title
                class="justify-center display-1"
              >
                {{ $t(`menus.${menu.title}`) }}
              </v-card-title>
              <v-divider/>
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
          >
            <div
              :is="`home-${menu.title}`"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <app-policy />
    <app-footer />
  </v-app>
</template>

<script>
import HomeAbout from '~/components/Home/HomeAbout'
import SDGsImg from '~/assets/images/before-logged-in/SDGs.png'

export default {
  components: {
    HomeAbout
  },
  middleware: ['logged-in-redirect'],
  data () {
    return {
      SDGsImg,
      imgHeight: 700,
      menus: [
        { title: 'about' }
      ]
    }
  }
}
</script>