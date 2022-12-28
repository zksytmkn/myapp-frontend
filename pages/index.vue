<template>
  <v-app>
    <home-app-bar
      :menus="menus"
      :img-height="imgHeight"
    />

    <v-img
      id="scroll-top"
      dark
      src="https://picsum.photos/id/11/1920/1080?blur=1"
      gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.5)"
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
          <h1 class="display-1 mb-4">
            Edible
          </h1>
          <h4
            class="subheading"
            :style="{ letterSpacing: '5px' }"
          >
            廃棄される農産物とそれを必要とする消費者を繋ぐサービス
          </h4>
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
              <v-card-text
                class="text-center"
              >
                {{ menu.subtitle }}
              </v-card-text>
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
import HomeContact from '~/components/Home/HomeContact'

export default {
  middleware: ['logged-in-redirect'],
  components: {
    HomeAbout,
    HomeContact
  },
  data () {
    return {
      imgHeight: 500,
      menus: [
        { title: 'about' },
        { title: 'contact', subtitle: '何でもお気軽にお問い合わせください' }
      ]
    }
  }
}
</script>