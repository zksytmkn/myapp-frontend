<template>
  <v-container
    class="mt-3"
  >
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
              <v-list-item-content>
                <v-list-item-title>
                  住所＆お支払い
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider/>

            <v-list-item>
              <v-container>
                <v-row>
                  <v-col
                    cols="11"
                  >
                    <v-list>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>
                            住所：{{ this.$store.state.user.current.zipcode }}
                            <br/><br/>
                            {{ this.$store.state.user.current.street }}
                            {{ this.$store.state.user.current.building }}
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                    <v-list>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>
                            お支払い：クレジットカード
                            <br/><br/>
                            ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </v-container>
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