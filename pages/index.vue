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
      <v-row
        align="center"
        justify="center"
        :style="{ height: `${imgHeight}px` }"
      >
        <v-col
          cols="12"
          class="text-center"
        >
          <v-row
            justify="center"
            align="center"
          >
            <v-col
              cols="6"
            >
              <v-list
                color="transparent"
                class="text-left"
              >
                <v-list-item>
                  <v-list-item-title
                    class="mb-3"
                    style="white-space:pre-line; line-height:1.5; 
                    text-shadow:1px 1px 1px black;"
                  >
                    <h2>
                      『Edible』は規格外農産物を減らし、
                      持続可能な社会の実現を目指します。
                    </h2>
                  </v-list-item-title>
                </v-list-item>
                <div
                  style="background-color:white; width:90%"
                >
                  <v-divider/>
                </div>
                <v-list-item-subtitle
                  class="font-weight-bold"
                  style="white-space:pre-line; line-height:1.5; text-shadow:1px 1px 1px black;"
                >
                  <p>
                    世の中には味が同じでも形が悪いため、棄てられる農産物が全体生産量の2-3割存在します。
                    本サービスはそういった農産物を生産する農家の方々の悩みを解消し、さらにSDGs
                    (持続可能な開発目標)Goal12の『つくる責任、つかう責任』達成にも則しています。
                  </p>
                </v-list-item-subtitle>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <before-login-app-bar-signup-button>
                        無料で会員登録する
                      </before-login-app-bar-signup-button>
                      <before-login-app-bar-guest-login-button>
                        無料で機能を試す
                      </before-login-app-bar-guest-login-button>
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <nuxt-link
                        class="ml-2 font-weight-bold teal--text"
                        to="/login"
                      >
                        すでにアカウントをお持ちの方はこちら
                      </nuxt-link>
                    </v-col>
                  </v-row>
                </v-container>
              </v-list>
            </v-col>
            <v-col
              cols="4"
            >
              <div
                class="text-center"
              >
                <v-avatar
                  color="teal"
                  size="400"
                >
                  <v-list
                    color="transparent"
                    class="font-weight-bold"
                    style="white-space:pre-line; text-shadow:1px 1px 1px black;"
                  >
                    <span>
                      SDGs(持続可能な開発目標)Goal12
                    </span>
                    <span>
                      『つくる責任、つかう責任』
                    </span>
                    <span>
                      持続可能な方法で生産し、
                      責任をもって消費する。
                    </span>
                  </v-list>
                </v-avatar>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-img>

    <v-sheet>
      <v-container
        fluid
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
            <v-card
              flat
            >
              <v-card-title
                class="justify-center display-1"
              >
                {{ $t(`menus.${menu.title}`) }}
              </v-card-title>
              <v-divider/>
            </v-card>
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

export default {
  middleware: ['logged-in-redirect'],
  components: {
    HomeAbout
  },
  data () {
    return {
      imgHeight: 700,
      menus: [
        { title: 'about' }
      ]
    }
  }
}
</script>