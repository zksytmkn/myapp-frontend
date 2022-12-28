<template>
  <div
    id="detail"
  >
    <logged-in-app-eye-catch>
      <template
        v-slot
      >
        Various vegetables or fruits are here !
        Please look around and enjoy it !
      </template>
    </logged-in-app-eye-catch>

    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
          <v-card>
            <v-container>
              <v-row>
                <v-col
                  cols="6"
                >
                  <v-img
                    :src="noImg"
                    max-height="360px"
                    max-width="360px"
                  >
                  </v-img>
                  <v-card-title
                    class="font-weight-bold pa-1 text-decoration-underline"
                  >
                    {{ currentProduct.name }}
                  </v-card-title>
                  <v-card-action
                    class="pa-1"
                  >
                    <v-btn
                      color="pink"
                      fab
                      dark
                      x-small
                    >
                      <v-icon>
                        mdi-thumb-up
                      </v-icon>
                    </v-btn>
                    <v-btn
                      color="indigo"
                      fab
                      dark
                      x-small
                    >
                      <v-icon>
                        mdi-thumb-down
                      </v-icon>
                    </v-btn>
                  </v-card-action>
                </v-col>

                <v-col
                  cols="6"
                >
                  <v-card-text>
                    {{ currentProduct.text }}
                  </v-card-text>
                  <v-card-title
                    class="font-weight-bold"
                  >
                    {{ currentProduct.price }}
                  </v-card-title>
                  <v-divider/>
                  <v-card-action>
                    <v-select
                      class="mt-6"
                      style="width:36%;"
                      label="1"
                      :items="items"
                      dense
                      rounded
                      outlined
                    >
                    </v-select>
                    <v-btn
                      class="font-weight-bold"
                      color="teal"
                      dark
                    >
                      カートに入れる
                    </v-btn>
                  </v-card-action>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import noImg from '~/assets/images/logged-in/no.png'
export default {
  layout: 'logged-in',
  data () {
    return {
      noImg
    }
  },
  computed: {
    currentProduct () {
      const copyProduct = this.$store.state.product.current
      return copyProduct
    }
  }
}
</script>

<style lang="scss">
#detail {
  .v-parallax__content {
    padding: 0;
  }
}
</style>