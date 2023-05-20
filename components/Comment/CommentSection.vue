<template>
  <v-container v-show="cmt">
    <v-row>
      <v-col cols="12">
        <v-card flat rounded="lg">
          <v-list>
            <v-list-item>
              <v-list-item-title class="font-weight-bold">コメント</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-divider />
          <v-list v-for="(comment, i) in comments" :key="`comment-${i}`">
            <v-list-item>
              <v-list-item-avatar left>
                <v-img :src="comment.user.image_url ? comment.user.image_url : noPersonImg"></v-img>
              </v-list-item-avatar>
              {{ comment.user.name }}
              <v-spacer />
              <v-list-item-action v-show="comment.user_id === $auth.user.id">
                <v-menu app offset-x offset-y max-width="200">
                  <template #activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon>mdi-dots-horizontal</v-icon>
                    </v-btn>
                  </template>
                  <v-list dense>
                    <v-list-item @click="deleteComment(comment.id)">
                      <v-list-item-title>削除する</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-list-item-action>
              <v-card-subtitle>{{ dateFormat(comment.updated_at) }}</v-card-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-text>{{ comment.content }}</v-list-item-text>
            </v-list-item>
            <v-divider/>
          </v-list>
          <v-form ref="new" v-model="isValid" @submit.prevent="$emit('addComment')">
            <v-list>
              <v-list-item>
                <v-list-item-avatar left>
                  <v-img :src="$auth.user.image_url ? $auth.user.image_url : noPersonImg"></v-img>
                </v-list-item-avatar>
                {{ $auth.user.name }}
              </v-list-item>
              <v-list-item>
                <v-container>
                  <v-row justify="center">
                    <v-col cols="11">
                      <v-textarea
                        v-model="localInputtedCmt"
                        dense
                        outlined
                        rows="2"
                        placeholder="コメントを追加する"
                        counter="200"
                        hide-details="auto"
                        :rules="cmtRules"
                        :disabled="sentIt"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="11">
                      <v-row justify="center" align="center">
                        <v-btn
                          text
                          outlined
                          class="font-weight-bold mt-3 mb-3 mr-2"
                          :disabled="!isValid"
                          @click="addComment"
                        >
                          コメントする
                        </v-btn>
                        <v-btn text @click="formReset">
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
import noPersonImg from '@/assets/images/logged-in/noPerson.png'

export default {
  props: {
    cmt: {
      type: Boolean,
      required: true,
    },
    comments: {
      type: Array,
      required: true,
    },
    inputted: {
      type: Object,
      required: true,
    },
  },
  data() {
    const cmtMax = 200
    return {
      noPersonImg,
      isValid: false,
      localInputtedCmt: this.inputted.cmt,
      cmtRules: [
        v => !!v || '',
        v => (v && v.length <= cmtMax) || `${cmtMax}文字以内で入力してください`,
      ],
    }
  },
  computed: {
    dateFormat() {
      return (date) => new Intl.DateTimeFormat('ja', { dateStyle: 'medium' }).format(new Date(date));
    },
  },
  methods: {
    addComment() {
      this.$emit('addComment', { comment: this.localInputtedCmt, isValid: this.isValid });
      this.formReset();
    },
    deleteComment(id) {
      this.$emit('deleteComment', id);
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
