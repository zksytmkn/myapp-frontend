<template>
  <v-container
    class="mt-12"
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
            v-model="valid"
            @submit.prevent="editAddress"
          >
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  住所編集
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
                        v-model="inputted.zipcode"
                        dense
                        outlined
                        :rules="zipcodeRules"
                        :disabled="sentIt"
                        label="郵便番号"
                        @input="searchAddressInfo"
                      >
                      </v-text-field>
                      <v-text-field
                        v-model="inputted.street"
                        dense
                        outlined
                        :rules="streetRules"
                        :disabled="sentIt"
                        label="住所"
                      >
                      </v-text-field>
                      <v-text-field
                        v-model="inputted.building"
                        dense
                        outlined
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
                          type="submit"
                          :disabled="!valid || loading"
                          :loading="loading"
                          color="appblue"
                          class="white--text mt-3 mb-3 mr-2"
                        >
                          編集する
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
const url = '/api/search?zipcode='
export default {
  layout: 'logged-in',
  data() {
    return {
      valid: false,
      loading: false,
      inputted: { zipcode: '', street: '', building: '' },
      zipcodeRules: [
        v => !!v || '',
        v => /^[0-9]{3}-?[0-9]{4}$/.test(v) || '○○○-○○○○と入力してください',
      ],
      streetRules: [v => !!v || '住所を入力してください'],
      buildingRules: [v => !!v || '建物名を入力してください'],
    };
  },
  mounted() {
    const user = this.$store.state.user.login;
    this.inputted = { ...user };
  },
  methods: {
    async searchAddressInfo() {
      if (!this.inputted.zipcode) return;
    
      const res = await this.$axios.get(url + this.inputted.zipcode);
      const { address1, address2, address3 } = res.data.results[0];
      this.inputted.street = address1 + address2 + address3;
    },
    async editAddress() {
      if (!this.valid) return;
      this.loading = true;

      try {
        const formData = new FormData();
        Object.entries(this.inputted).forEach(([key, value]) => formData.append(key, value));
        await this.$axios.$patch(`/api/v1/users/${this.$auth.user.id}`, formData);
        this.$store.dispatch('getToast', { msg: '住所を編集しました', color: 'success' });
      } catch (error) {
        this.$store.dispatch('getToast', { msg: '住所を編集できませんでした', color: 'error' });
      }

      try {
        const response = await this.$axios.$post('/api/v1/auth_token/refresh');
        this.$auth.login(response);
      } catch (error) {
      }

      this.loading = false;
    },
    formReset() {
      this.sentIt = false;
      this.$refs.edit.reset();
    },
  },
};
</script>
