<template>
  <v-menu
    app
    offset-x
    offset-y
    max-width="200"
  >
    <template
      v-slot:activator="{ on }"
    >
      <v-btn
        icon
        v-on="on"
      >
        <v-icon>
          mdi-cart
        </v-icon>
      </v-btn>
    </template>
    <v-list
      dense
    >
      <v-subheader>
        ログイン中のユーザー
      </v-subheader>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle>
            {{ $auth.user.name }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider/>

      <v-subheader>
        カート
      </v-subheader>
    </v-list>
  </v-menu>
</template>

<script>
export default {
}
</script>
