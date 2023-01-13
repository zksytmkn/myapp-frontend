<template>
  <v-menu>
    <template
      v-slot:activator="{ on }"
    >
      <v-btn
        icon
        v-on="on"
        to="/products/cart"
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
