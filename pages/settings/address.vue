<template>
  <v-container
    class="mt-3"
  >
    <v-row>
      <setting-menu />
      <v-col
        cols="9"
      >
        <v-sheet
          rounded="lg"
        >
          <v-form
            ref="edit"
            v-model="isValid"
          >
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
                  <v-row
                    justify="center"
                  >
                    <v-col
                      cols="11"
                      class="mt-6"
                    >
                    <v-text-field
                        dense
                        outlined
                        v-model="inputted.zipcode"
                        :rules="zipcodeRules"
                        :disabled="sentIt"
                        @input="searchAddressInfo"
                        label="郵便番号"
                      >
                      </v-text-field>
                      <v-text-field
                        dense
                        outlined
                        v-model="inputted.street"
                        :rules="streetRules"
                        :disabled="sentIt"
                        label="住所"
                      >
                      </v-text-field>
                      <v-text-field
                        dense
                        outlined
                        v-model="inputted.building"
                        :rules="buildingRules"
                        :disabled="sentIt"
                        hide-details="auto"
                        label="建物名"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col
                      cols="11"
                    >
                      <v-row
                        justify="center"
                      >
                        <v-btn
                          @click="editAddress"
                          :disabled="!isValid || loading"
                          :loading="loading"
                          color="appblue"
                          class="white--text mt-3 mb-3 mr-2"
                        >
                          変更する
                        </v-btn>

                        <v-btn
                          text
                          class="mt-3"
                          @click="formReset"
                        >
                          キャンセル
                        </v-btn>
                      </v-row>
                    </v-col>
                  </v-row>
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
const axios = require('axios')
const url = 'http://zipcloud.ibsnet.co.jp/api/search?zipcode='
export default {
  layout: 'logged-in',
  data () {
    return {
      isValid: false,
      loading: false,
      inputted: { zipcode: '', street: '', building: '' },
      zipcodeRules: [
        v => !!v || '',
        v => /^[0-9]{3}-?[0-9]{4}$/.test(v) || '○○○-○○○○と入力してください'
      ],
      streetRules: [
        v => !!v || '住所を入力してください'
      ],
      buildingRules: [
        v => !!v || '建物名を入力してください'
      ]
    }
  },
  methods: {
    searchAddressInfo() {
      axios.get(url + this.inputted.zipcode).then((res) => {
      this.inputted.street = res.data.results[0].address1 + res.data.results[0].address2 + res.data.results[0].address3
      })
    },
    editAddress() {
      const asyncFunc = async() => {
        const formData = new FormData()
        formData.append('zipcode', this.inputted.zipcode)
        formData.append('street', this.inputted.street)
        formData.append('building', this.inputted.building)
      }
    },
    formReset() {
      this.sentIt = false
      this.$refs.edit.reset()
    }
  },
  mounted() {
    this.inputted.zipcode = this.$store.state.user.login.zipcode
    this.inputted.street = this.$store.state.user.login.street
    this.inputted.building = this.$store.state.user.login.building
  }
}
</script>