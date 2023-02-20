<template>
  <v-container>
    <v-row>
      <setting-menu />
      <v-col
        cols="9"
      >
        <v-sheet
          rounded="lg"
        >
          <v-form>
            <v-list
              color="transparent"
            >
              <v-list-item>
                <v-list-item-title>
                  住所変更
                </v-list-item-title>
              </v-list-item>
  
              <v-divider/>
              <v-list-item>
                <v-container>
                </v-container>
              </v-list-item>
            </v-list>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'logged-in',
  data () {
    return {
      isValid: false,
      loading: false,
    }
  }
}
</script>