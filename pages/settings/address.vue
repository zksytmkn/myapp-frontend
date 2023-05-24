<template>
  <v-container
    class="mt-12"
  >
    <v-row>
      <setting-menu />
      <v-col
        cols="9"
      >
        <v-card
          flat
          rounded="lg"
        >
          <v-form
            ref="edit"
            v-model="isValid"
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
                          :disabled="!isValid || loading"
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const url = '/api/search?zipcode='
export default {
  data() {
    return {
      isValid: false,
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
    const user = this.$auth.user;
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
      if (!this.isValid) return;
      this.loading = true;
    
      try {
        const data = { ...this.inputted };
        await this.$axios.$patch(`/api/v1/users/${this.$auth.user.id}`, data);
        this.$store.dispatch('getToast', { msg: '住所を編集しました', color: 'success' });
      } catch (error) {
        let errorMsg = '住所を編集できませんでした';
        if (error.response && error.response.data && error.response.data.error) {
          errorMsg += `: ${error.response.data.error}`;
        }
        this.$store.dispatch('getToast', { msg: errorMsg, color: 'error' });
      }
    
      try {
        const response = await this.$axios.$post('/api/v1/auth_token/refresh');
        this.$auth.login(response);
      } catch (error) {
        let errorMsg = 'セッションの更新に失敗しました。再度ログインしてください。';
        if (error.response && error.response.data && error.response.data.error) {
          errorMsg += `: ${error.response.data.error}`;
        }
        this.$store.dispatch('getToast', { msg: errorMsg, color: 'error' });
      } finally {
        this.loading = false;
      }
    },
    formReset() {
      this.sentIt = false;
      this.$refs.edit.reset();
    },
  },
};
</script>
