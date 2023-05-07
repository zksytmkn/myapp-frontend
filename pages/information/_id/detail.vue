<template>
  <div>
    <v-container
      class="mt-12"
    >
      <v-row>
        <info-menu />
        <v-col
          cols="9"
        >
          <v-card
            flat
            rounded="lg"
          >
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  詳細
                </v-list-item-title>
              </v-list-item>

              <v-divider/>
              <v-list-item>
                <v-container>
                  <v-row justify="center">
                    <v-col cols="11">
                      <v-container>
                        <v-row align="start">
                          <v-col cols="5" class="img-container" :style="{ 'margin-top': marginTop }">
                            <v-img :src="currentOrderProduct.image_url ? currentOrderProduct.image_url : noImg"></v-img>
                          </v-col>
                          <v-col cols="7">
                            <v-list>
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>
                                    <template v-if="currentOrder.product.user_id !== $auth.user.id">
                                      <nuxt-link
                                        class="text-decoration-none font-weight-bold teal--text"
                                        :to="$my.productLinkToDetail(currentOrder.product_id)"
                                      >
                                        {{ currentOrder.product.name }}
                                      </nuxt-link>
                                      を購入しました。
                                    </template>
                                    <template v-else>
                                      <nuxt-link
                                        class="text-decoration-none font-weight-bold teal--text"
                                        :to="$my.userLinkToProfile(currentOrder.order.user_id)"
                                      >
                                        {{ currentOrder.order.user.name }}
                                      </nuxt-link>
                                      さんは、
                                      <br />
                                      <nuxt-link
                                        class="text-decoration-none font-weight-bold teal--text"
                                        :to="$my.productLinkToDetail(currentOrder.product_id)"
                                      >
                                        {{ currentOrder.product.name }}
                                      </nuxt-link>
                                      を購入しました。
                                    </template>
                                  </v-list-item-title>
                                  <v-card class="mt-4 mb-4" outlined>
                                    <v-card-text class="pa-2">
                                      <v-timeline class="compact-timeline" dense>
                                        <v-timeline-item v-for="(status, statusKey) in orderStatus" :key="statusKey" color="teal" :icon="currentOrder.status === statusKey ? 'mdi-check' : 'mdi-circle'">
                                          <span>{{ status.text }}</span>
                                        </v-timeline-item>
                                      </v-timeline>
                                    </v-card-text>
                                  </v-card>
                                  <v-btn
                                    v-for="(status, statusKey) in orderStatus"
                                    v-show="currentOrder.status === statusKey && 
                                            ((statusKey === 'confirm_payment' && currentOrder.product.user_id === $auth.user.id) ||
                                            (statusKey === 'shipped' && currentOrder.product.user_id === $auth.user.id) ||
                                            (statusKey === 'out_for_delivery' && currentOrder.order.user_id === $auth.user.id))"
                                    :key="statusKey"
                                    class="font-weight-bold mt-3"
                                    color="teal"
                                    dark
                                    @click="handleButtonClick(statusKey, currentOrder.id)"
                                  >
                                    {{ status.buttonText }}
                                  </v-btn>
                                  <v-dialog v-model="orderInfoDialog" max-width="500">
                                    <template #activator="{ on }">
                                      <v-btn color="teal" text class="mt-3" v-on="on">
                                        <v-icon left>
                                          mdi-information-variant-circle-outline
                                        </v-icon>
                                        注文詳細
                                      </v-btn>
                                    </template>

                                    <v-card>
                                      <v-card-title>
                                        注文詳細
                                      </v-card-title>
                                      <v-card-text>
                                        数量：¥{{ currentOrder.price.toLocaleString() }} × {{ currentOrder.quantity }}<br>
                                        小計（税込）：¥{{ Math.floor(currentOrder.product.price * currentOrder.quantity * 1.1).toLocaleString() }}<br>
                                        お届け先：〒{{ currentOrder.order.zipcode }}<br>
                                        {{ currentOrder.order.street }} {{ currentOrder.order.building }}<br>
                                        注文日：{{ dateFormat(currentOrder.created_at) }}
                                      </v-card-text>
                                      <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="primary" text @click="orderInfoDialog = false">
                                          閉じる
                                        </v-btn>
                                      </v-card-actions>
                                    </v-card>
                                  </v-dialog>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-col>
                  </v-row>
                </v-container>
              </v-list-item>
            </v-list>
          </v-card>

          <v-card flat rounded="lg" class="mt-12 mb-12">
            <v-list>
              <v-list-item>
                <v-list-item-title class="font-weight-bold">
                  {{ currentOrder.product.user_id === $auth.user.id ? '購入者とのメッセージ' : '出品者とのメッセージ' }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
            <v-divider/>
            <v-sheet
              ref="messageContainer"
              class="overflow-y-auto grey lighten-5 text-caption font-weight-medium pt-4"
              :style="{height: 'calc(100vh - 250px)', 'background-color': '#e0f2f1'}"
            >
              <v-row v-for="(message, i) in messages" :key="`message-${i}`">
                <v-col
                  cols="12"
                  :class="message.user.id === $auth.user.id ? 'd-flex justify-end' : 'd-flex'"
                >
                  <div v-if="message.user.id !== $auth.user.id" class="mb-1" style="font-size: 0.7rem; margin-left: 30px;">
                    <router-link
                      v-if="isUserInParticipation(message.user.id)"
                      v-slot="{ navigate }"
                      :to="$my.userLinkToProfile(message.user.id)"
                      custom
                    >
                      <strong @click="navigate">
                        {{ message.user.name }}
                      </strong>
                    </router-link>
                    <strong v-else>退会済みユーザー</strong>
                    <br>
                    {{ dateFormat(message.updated_at) }}
                  </div>
                  <v-list
                    :class="message.user.id === $auth.user.id ? 'ml-6 pa-2 teal lighten-2 text-white' : 'mr-6 pa-2 orange lighten-2'"
                    style="border-radius: 18px; margin-left: 12px; margin-right: 12px; display: inline-block;"
                    :style="{ maxWidth: '50%', width: 'auto' }"
                  >
                    <v-list-item-title
                      class="font-weight-bold"
                      :style="{ 'word-wrap': 'break-word', 'white-space': 'pre-wrap' }"
                    >{{ message.content }}</v-list-item-title>
                  </v-list>
                  <div v-if="message.user.id === $auth.user.id" class="mt-1" style="font-size: 0.7rem; margin-right: 30px;">
                    <strong>あなた</strong>
                    <br>
                    {{ dateFormat(message.updated_at) }}
                  </div>
                </v-col>
              </v-row>
            </v-sheet>
            <v-divider/>
            <v-sheet class="pa-4" height="110">
              <v-form ref="new" v-model="valid" @submit.prevent="addOrderMessage">
                <v-text-field
                  v-model="inputted.msg"
                  :rules="msgRules"
                  label="メッセージを入力する"
                  counter="200"
                  dense
                  append-icon="mdi-send"
                  @click:append="addOrderMessage"
                />
              </v-form>
              <v-btn text @click="formReset">
                キャンセル
              </v-btn>
            </v-sheet>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import InfoMenu from '~/components/Information/InfoMenu'
import noImg from '~/assets/images/logged-in/no.png'

export default {
  components: {
    InfoMenu
  },
  layout:"logged-in",
  middleware: [ 'get-order-current', 'get-order-message' ],
  data () {
    return {
      noImg,
      msgRules: [v => !!v || ''],
      inputted: { msg: '' },
      orderInfoDialog: false,
      orderStatus: {
        confirm_payment: {
          text: "入金済み（出荷待ち）",
          icon: "mdi-credit-card-outline",
          buttonText: "出荷しました",
          statusToUpdate: "shipped",
        },
        shipped: {
          text: "出荷済み（配送待ち）",
          icon: "mdi-package-variant-closed",
          buttonText: "配送しました",
          statusToUpdate: "out_for_delivery",
        },
        out_for_delivery: {
          text: "配送中（配達待ち）",
          icon: "mdi-truck-delivery-outline",
          buttonText: "配達されました",
          statusToUpdate: "delivered",
        },
        delivered: {
          text: "配達済み",
          icon: "mdi-package-variant-closed-check",
        },
      },
    };
  },
  computed: {
    currentOrder() {
      return this.$store.state.order.current;
    },
    currentOrderProduct() {
      const copyCurrentOrderProduct = Array.from(
        this.$store.state.product.list.filter(
          (product) => product.id === this.$store.state.order.current.product_id
        )
      );
      return copyCurrentOrderProduct;
    },
    messages() {
      return Array.from(this.$store.state.order.message).sort((a, b) => a.created_at.localeCompare(b.created_at));
    },
    dateFormat() {
      return (date) => new Intl.DateTimeFormat('ja', { dateStyle: 'medium' }).format(new Date(date));
    },
    isUserInParticipation() {
      return (userId) =>
        this.$store.state.community.current.participation.some(
          (participant) => participant.id === userId
        );
    },
    marginTop() {
      const buttonVisible =
        (this.currentOrder.status === "confirm_payment" &&
          this.currentOrder.product.user_id === this.$auth.user.id) ||
        (this.currentOrder.status === "shipped" &&
          this.currentOrder.product.user_id === this.$auth.user.id) ||
        (this.currentOrder.status === "out_for_delivery" &&
          this.currentOrder.order.user_id === this.$auth.user.id);

      return buttonVisible ? "4rem" : "2rem";
    },
  },
  methods: {
    async updateOrderStatus(orderDetailId, status) {
      const data = {
        status
      };

      try {
        await this.$axios.$patch(`/api/v1/orders/${orderDetailId}`, data);
        const order = await this.$axios.$get(`/api/v1/orders/${orderDetailId}`);
        this.$store.dispatch("getCurrentOrder", order);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    handleButtonClick(statusKey, orderDetailId) {
      const statusToUpdate = this.orderStatus[statusKey].statusToUpdate;
      if (statusToUpdate) {
        this.updateOrderStatus(orderDetailId, statusToUpdate);
      }
    },
    async processResponse(action, successMsg, errorMsg, successCallback) {
      try {
        await action();
        this.$store.dispatch('getToast', { msg: successMsg, color: 'success' });
        if (successCallback) {
          successCallback();
        }
      } catch (e) {
        this.$store.dispatch('getToast', { msg: errorMsg, color: 'error' });
      }
    },
    async addOrderMessage() {
      if (!this.valid) return;
      const data = {
        content: this.inputted.msg,
      };
      this.formReset();

      await this.processResponse(
        () => this.$axios.$post(`/api/v1/orders/${this.currentOrder.id}/order_messages`, data),
        "メッセージを送信しました",
        "メッセージを送信できませんでした",
        async () => {
          await this.refreshMessages();
          await this.scrollBottom();
        }
      );
    },
    formReset() {
      this.sentIt = false
      this.$refs.new.reset()
    },
    async refreshMessages() {
      const messages = await this.$axios.$get(`api/v1/orders/${this.currentOrder.id}/order_messages`);
      this.$store.dispatch('getOrderMessage', messages);
    },
    scrollBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messageContainer;
        if (container) {
          const scrollableElement = container.$el;
          scrollableElement.scrollTop = scrollableElement.scrollHeight;
        }
      });
    },
  },
};
</script>

<style scoped>
.compact-timeline {
  padding: 6px 0 0 0;
  font-size: 0.6rem;
}

.compact-timeline .v-timeline-item {
  padding: 0 0 6px;
}

.img-container {
  margin-top: 2rem;
}
</style>
