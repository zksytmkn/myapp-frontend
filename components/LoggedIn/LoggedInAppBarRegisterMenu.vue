<template>
  <v-menu>
    <template
      v-slot:activator="{ on }"
    >
      <v-btn
        icon
        v-on="on"
        to="/products/register"
      >
        <v-icon>
          mdi-registered-trademark
        </v-icon>
      </v-btn>
    </template>
  </v-menu>
</template>

<script>
</script>
