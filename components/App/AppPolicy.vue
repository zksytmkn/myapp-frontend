<template>
  <div
    :style="{ height: `${height}px`}"
    style="background-color:#EEEEEE	;"
  >
    <v-container
      fluid
      fill-height
    >
      <v-row
        justify="space-around"
        align-items="center"
      >
        <nuxt-link
          to="/contact"
          class="text-decoration-none black--text text-body-2"
        >
          お問い合わせ
        </nuxt-link>
        <nuxt-link
          to="/tos"
          class="text-decoration-none black--text text-body-2"
        >
          利用規約
        </nuxt-link>
        <nuxt-link
          to="/policy"
          class="text-decoration-none black--text text-body-2"
        >
          プライバシーポリシー
        </nuxt-link>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      height: 73
    }
  }
}
</script>
