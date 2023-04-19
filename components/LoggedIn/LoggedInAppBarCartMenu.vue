<template>
  <v-menu>
    <template
      #activator="{ on }"
    >
      <v-btn
        icon
        to="/products/cart"
        v-on="on"
      >
        <v-icon>
          mdi-cart
        </v-icon>
        {{ cartTotalQuantity }}
      </v-btn>
    </template>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['cartTotalQuantity'])
}
</script>
