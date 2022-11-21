<template>
  <v-text-field
    v-model="setEmail"
    :rules="rules"
    label="メールアドレスを入力"
    :placeholder="placeholder ? 'your@email.com' : undefined"
    outlined
  />
</template>

<script>
export default {
  props: {
    email: {
      type: String,
      default: ''
    },
    placeholder: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      rules: [
        v => !!v || '',
        v => /.+@.+\..+/.test(v) || ''
      ]
    }
  },
  computed: {
    setEmail: {
      get () {
        return this.email
      },
      set (newValue) {
        return this.$emit('update:email',newValue)
      }
    }
  }
}
</script>