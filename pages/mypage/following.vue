<template>
  <v-container>
    <v-row>
      <mypage-menu />
      <v-col
        cols="9"
      >
        <v-card
          flat
          rounded="lg"
        >
          <v-list
            color="transparent"
          >
            <v-list-item>
              <v-list-item-title>
                フォロー
              </v-list-item-title>
            </v-list-item>

            <v-divider/>

            <v-list-item>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    layout: 'logged-in'
  }
</script>