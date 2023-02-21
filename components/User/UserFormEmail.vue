<template>
  <v-text-field
    dense
    :label="setLabel"
    v-model="setEmail"
    :rules="rules"
    :placeholder="placeholder ? 'your@email.com' : undefined"
    :disabled="sentIt"
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
    },
    label: {
      type: String,
      default: 'メールアドレスを入力'
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
    },
    setLabel () {
      return this.label
    }
  }
}
</script>