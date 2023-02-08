<template>
  <v-container>
    <v-row>
      <v-col
        cols="7"
      >
        <v-sheet
          rounded="lg"
        >
          <v-list
            color="transparent"
          >
            <v-list-item>
              <v-list-item-title>
                お知らせ
              </v-list-item-title>
            </v-list-item>

            <v-divider/>
            <v-list-item>
              <v-list-item-content>
                <v-row>
                  <v-col
                    cols="12"
                  >
                    <v-chip
                      color="blue"
                      class="white--text font-weight-bold"
                    >
                      新着
                    </v-chip>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-list-item
                      v-for="(newInfo, i) in newInformation"
                      :key="`newInfo-${i}`"
                      :to="newInfo.link"
                    >
                      <v-list-item-icon>
                        <v-icon>
                          {{ newInfo.icon }}
                        </v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        {{ newInfo.text }}
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider/>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-chip
                      color="blue"
                      class="white--text font-weight-bold"
                    >
                      その他
                    </v-chip>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-list-item
                      v-for="(otherInfo, i) in otherInformation"
                      :key="`otherInfo-${i}`"
                      :to="otherInfo.link"
                    >
                      <v-list-item-icon>
                        <v-icon>
                          {{ otherInfo.icon }}
                        </v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        {{ otherInfo.text }}
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider/>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout:"logged-in",
  data () {
    return {
      newInformation: [
        {
          icon: 'mdi-bell',
          text: '',
          link: ''
        }
      ],
      otherInformation: [
        {
          icon: 'mdi-bell',
          text: '',
          link: ''
        }
      ]
    }
  }
}
</script>