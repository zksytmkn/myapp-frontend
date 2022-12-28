<template>
  <div
    id="posts"
  >
    <logged-in-app-eye-catch>
      <template
        v-slot
      >
        Many farmers post about agriculture here !
        Please look around and enjoy it !
      </template>
    </logged-in-app-eye-catch>
    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
          <v-sheet
            rounded="lg"
          >
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-row
                    justify="center"
                  >
                    <v-col
                      cols="12"
                    >
                      <v-card-title
                        class="font-weight-bold"
                      >
                        表題から検索
                      </v-card-title>
                      <v-divider/>
                      <v-card-actions>
                        <v-text-field
                          outlined
                          placeholder="表題"
                        >
                        </v-text-field>
                      </v-card-actions>
                    </v-col>
    
                    <v-col
                      cols="12"
                    >
                      <v-card-title
                        class="font-weight-bold"
                      >
                        種類から検索
                      </v-card-title>
                      <v-divider/>
                      <v-card-actions>
                        <v-text-field
                          outlined
                          placeholder="種類"
                        >
                        </v-text-field>
                      </v-card-actions>
                    </v-col>
    
                    <v-col
                      cols="12"
                    >
                      <v-card-title
                        class="font-weight-bold"
                      >
                        都道府県から検索
                      </v-card-title>
                      <v-divider/>
                      <v-card-actions>
                        <v-text-field
                          outlined
                          placeholder="都道府県"
                        >
                        </v-text-field>
                      </v-card-actions>
                    </v-col>
                    <v-btn
                      class="white--text font-weight-bold my-6"
                      color="primary"
                    >
                      検索する
                    </v-btn>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
#posts {
  .v-parallax__content {
    padding: 0;
  }
}
</style>