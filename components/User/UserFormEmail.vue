<template>
  <v-text-field
    v-model="setEmail"
    dense
    :label="setLabel"
    :rules="rules"
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