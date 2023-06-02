<template>
  <div>
    <v-container
      class="my-12"
    >
      <v-row>
        <info-menu />
        <v-col
          md="9"
          xs="12"
        >
          <v-card
            flat
            rounded="lg"
          >
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  {{ title }}
                </v-list-item-title>
              </v-list-item>

              <v-divider/>
              <v-list-item
                v-show="!orders.length"
              >
                <v-list-item-title>
                  該当する注文はありませんでした。
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                v-for="(order, i) in orders.slice(pageSize*(page-1),pageSize*(page))"
                :key="`order-${i}`"
                :to="$my.informationLinkToDetail(order.id)"
              >
                <v-list-item-avatar
                  left
                >
                  <v-icon>
                    mdi-information-variant
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-title>
                  {{ order.product.name }}{{ message }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-pagination
      v-show="orders.length"
      v-model="page"
      class="my-6"
      :length="Math.ceil(orders.length/pageSize)"
      circle
    >
    </v-pagination>
  </div>
</template>

<script>
export default {
  layout:"logged-in",
  props: {
    title: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    orders: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      page: 1,
      pageSize: 10
    }
  }
}
</script>
