<template>
  <v-app>
    <app-toaster />
    <before-login-app-about-bar
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
                  lg="7" md="12"
                >
                  <v-container
                    class="text-left-lg-up"
                  >
                    <v-list-item-title
                      class="font-weight-bold text-h5 mb-3"
                      style="white-space:pre-line; line-height:1.5; 
                      text-shadow:2px 2px 2px black;"
                    >
                      『Edible』は規格外農産物を減らし、
                      持続可能な社会の実現を目指します。
                    </v-list-item-title>
                    <v-divider style="border-color: white;"></v-divider>
                    <v-list-item-subtitle
                      class="font-weight-bold"
                      style="white-space:pre-line; line-height:1.5; text-shadow:2px 2px 2px black;"
                    >
                      味が同じでも形が悪いため、棄てられる農産物は全体の2-3割存在します。
                      本サービスはそれら規格外農産物を減らし、世の中のフードロスを減らします。
                      さらにSDGs Goal12の『つくる責任、つかう責任』達成に則しています。
                    </v-list-item-subtitle>
                  </v-container>
                  <v-container
                    class="text-left-lg-up"
                  >
                    <before-login-app-bar-signup-button
                      class="mb-2"
                    >
                      無料で会員登録する
                    </before-login-app-bar-signup-button>
                    <before-login-app-bar-guest-login-button
                      class="mb-2"
                    >
                      無料で機能を試す
                    </before-login-app-bar-guest-login-button>
                  </v-container>
                  <v-container
                    class="text-left-lg-up"
                  >
                    <nuxt-link
                      class="text-decoration-none ml-2 font-weight-bold green--text"
                      style="text-shadow: 1px 1px 2px black;"
                      to="/login"
                    >
                      すでにアカウントをお持ちの方はこちら
                    </nuxt-link>
                  </v-container>
                </v-col>

                <v-col v-show="showSDGsImg" cols="5">
                  <v-img :src=SDGsImg></v-img>
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
              :is="`before-login-${menu.title}`"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <app-footer-top />
    <app-footer />
  </v-app>
</template>

<script>
import SDGsImg from '~/assets/images/before-logged-in/SDGs.png'

export default {
  middleware: 'logged-in-redirect',
  data () {
    return {
      SDGsImg,
      imgHeight: 700,
      menus: [
        { title: 'app-about' }
      ],
      windowWidth: 0,
      showSDGsImg: true,
    }
  },
  mounted() {
    if (this.$store.state.logoutSuccess) {
      this.$store.dispatch('getToast', { msg: 'ログアウトしました', color: 'success' });
      // メッセージ表示後、logoutSuccessをfalseにリセット
      this.$store.commit('setLogoutSuccess', false);
    }
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);
      this.getWindowWidth();
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth);
  },
  methods: {
    getWindowWidth() {
      this.windowWidth = document.documentElement.clientWidth;
      this.showSDGsImg = this.windowWidth > 1270;
    }
  }
}
</script>

<style lang="scss">
@media (min-width: 1264px) {
  .text-left-lg-up {
    text-align: left;
  }
}
</style>