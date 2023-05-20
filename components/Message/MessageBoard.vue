<template>
  <div>
    <v-list>
      <v-list-item>
        <v-list-item-title class="font-weight-bold">
          {{ title }}
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
          :class="message.user_id === $auth.user.id ? 'd-flex justify-end' : 'd-flex'"
        >
          <div v-show="message.user_id !== $auth.user.id" class="mb-1" style="font-size: 0.7rem; margin-left: 30px;">
            <slot name="messageLink" :message="message"></slot>
            <br>
            {{ dateFormat(message.updated_at) }}
          </div>
          <v-list
            :class="message.user_id === $auth.user.id ? 'ml-6 pa-2 teal lighten-2 text-white' : 'mr-6 pa-2 orange lighten-2'"
            style="border-radius: 18px; margin-left: 12px; margin-right: 12px; display: inline-block;"
            :style="{ maxWidth: '50%', width: 'auto' }"
          >
            <v-list-item-title
              class="font-weight-bold"
              :style="{ 'word-wrap': 'break-word', 'white-space': 'pre-wrap' }"
            >{{ message.content }}</v-list-item-title>
          </v-list>
          <div v-show="message.user_id === $auth.user.id" class="mt-1" style="font-size: 0.7rem; margin-right: 30px;">
            <strong>あなた</strong>
            <br>
            {{ dateFormat(message.updated_at) }}
          </div>
        </v-col>
      </v-row>
    </v-sheet>
    <v-divider/>
    <v-sheet class="pa-4" height="110">
      <v-form ref="new" v-model="isValid" @submit.prevent="$emit('submitMessage')">
        <v-text-field
          v-model="localInputtedMsg"
          :rules="msgRules"
          :disabled="sentIt"
          label="メッセージを入力する"
          counter="200"
          dense
          append-icon="mdi-send"
          @click:append="submitMessage"
        />
      </v-form>
      <v-btn text @click="formReset">
        キャンセル
      </v-btn>
    </v-sheet>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    messages: {
      type: Array,
      required: true,
    },
    inputted: {
      type: Object,
      required: true,
    },
  },
  data () {
    const msgMax = 200
    return {
      isValid: false,
      localInputtedMsg: this.inputted.msg,
      msgRules: [
        v => !!v || '',
        v => (v && v.length <= msgMax) || `${msgMax}文字以内で入力してください`,
      ],
    }
  },
  computed: {
    dateFormat() {
      return (date) => new Intl.DateTimeFormat('ja', { dateStyle: 'medium' }).format(new Date(date));
    },
  },
  methods: {
    submitMessage() {
      this.$emit('submitMessage', { message: this.localInputtedMsg, isValid: this.isValid });
      this.formReset();
    },
    formReset() {
      this.sentIt = false
      this.$refs.new.reset()
    },
    resetForm() {
      this.formReset();
      this.$emit('resetForm');
    },
  }
}
</script>