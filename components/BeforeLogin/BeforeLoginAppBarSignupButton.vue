<template>
  <v-btn
    outlined
    class="ml-2 font-weight-bold"
    color="blue"
    to="/signup"
  >
    <slot>
      {{ $my.pageTitle('signup') }}
    </slot>
  </v-btn>
</template>