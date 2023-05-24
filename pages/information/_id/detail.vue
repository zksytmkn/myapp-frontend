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
                                    @click="handleButtonClick(statusKey)"
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
                                        合計（税込）：¥{{ Math.floor(currentOrder.product.price * currentOrder.quantity * 1.1).toLocaleString() }}<br>
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
            <MessageBoard
              :title="currentOrder.product.user_id === $auth.user.id ? '購入者とのメッセージ' : '出品者とのメッセージ'"
              :messages="messages"
              :inputted="inputted"
              @submitMessage="addOrderMessage"
              @resetForm="formReset"
            >
              <template #messageLink="{ message }">
                <router-link
                  v-slot="{ navigate }"
                  :to="$my.userLinkToProfile(message.user_id)"
                  custom
                >
                  <strong @click="navigate">
                    {{ message.user.name }}
                  </strong>
                </router-link>
              </template>
            </MessageBoard>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import noImg from '~/assets/images/logged-in/no.png'

export default {
  middleware: [ 'get-order-current', 'get-order-message' ],
  data () {
    return {
      noImg,
      orderInfoDialog: false,
      inputted: { msg: '' },
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
          text: "配送済み（配達待ち）",
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
      return Array.from(this.$store.state.order.message).sort((a, b) => {
        if (a.created_at < b.created_at) return -1;
        if (a.created_at > b.created_at) return 1;
        return 0;
      });
    },
    dateFormat() {
      return (date) => new Intl.DateTimeFormat('ja', { dateStyle: 'medium' }).format(new Date(date));
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
    async updateOrderStatus(status) {
      const data = {
        order_detail: {
          status
        }
      };

      try {
        await this.$axios.$patch(`/api/v1/order_details/${this.currentOrderDetail.id}`, data);
        const order = await this.$axios.$get(`/api/v1/order_details/${this.currentOrderDetail.id}`);
        this.$store.commit("setCurrentOrderDetail", order);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        let errorMsg = "注文ステータスを更新できませんでした";
        if (error.response && error.response.data && error.response.data.error) {
          errorMsg = error.response.data.error;
        }
        this.$store.dispatch('getToast', { msg: errorMsg, color: "error" });
      }
    },
    async handleButtonClick(statusKey) {
      const statusToUpdate = this.orderStatus[statusKey].statusToUpdate;
      if (statusToUpdate) {
        if (confirm('本当に注文ステータスを更新しますか？')) {
          await this.updateOrderStatus(statusToUpdate);
        }
      }
    },
    async addOrderMessage({ message, isValid }) {
      if (!isValid) return;
      const data = {
        order_message: {
          content: message,
        },
      };
      this.formReset();
    
      try {
        await this.$axios.$post(`/api/v1/orders/${this.currentOrder.id}/order_messages`, data);
        await this.refreshMessages();
        await this.scrollBottom();
        this.$store.dispatch('getToast', { msg: 'メッセージを送信しました', color: 'success' });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        let errorMsg = "メッセージを送信できませんでした";
        if (error.response && error.response.data && error.response.data.error) {
          errorMsg = error.response.data.error;
        }
        this.$store.dispatch('getToast', { msg: errorMsg, color: "error" });
      }
    },
    async refreshMessages() {
      const messages = await this.$axios.$get(`api/v1/orders/${this.currentOrder.id}/order_messages`);
      this.$store.commit('setOrderMessage', messages);
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
    formReset() {
      this.sentIt = false
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
