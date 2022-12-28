<template>
  <div
    id="products"
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
          v-for="(product, i) in products"
          :key="`product-${i}`"
          cols="6"
        >
          <v-card
            :to="$my.productLinkTo(product.id)"
          >
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
                    {{ product.name }}
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
                    {{ product.text }}
                  </v-card-text>
                  <v-card-title
                    class="font-weight-bold"
                  >
                    {{ product.price }}
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
    <v-pagination
      class="my-6"
      v-model="page"
      :length="6"
      circle
    >
    </v-pagination>
  </div>
</template>

<script>
import noImg from '~/assets/images/logged-in/no.png'
export default {
  layout: 'logged-in',
  middleware: ['get-product-list'],
  data () {
    return {
      noImg,
      page: '1'
    }
  },
  computed: {
    products () {
      const copyproducts = Array.from(this.$store.state.product.list)
      return copyproducts.sort((a, b) => {
        if (a.updatedAt > b.updatedAt) { return -1 }
        if (a.updatedAt < b.updatedAt) { return 1 }
        return 0
      })
    }
  }
}
</script>

<style lang="scss">
#products {
  .v-parallax__content {
    padding: 0;
  }
}
</style>