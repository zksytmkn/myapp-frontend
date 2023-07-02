<template>
  <v-menu>
    <template
      #activator="{ on }"
    >
      <v-btn
        icon
        to="/products/register"
        v-on="on"
      >
        <v-icon>
          mdi-registered-trademark
        </v-icon>
      </v-btn>
    </template>
  </v-menu>
</template>
