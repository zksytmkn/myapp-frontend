<template>
  <v-text-field
    dense
    :label="setLabel"
    v-model="setPassword"
    :rules="form.rules"
    :hint="form.hint"
    :hide-details="!setValidation"
    :counter="setValidation"
    :append-icon="toggle.icon"
    :type="toggle.type"
    outlined
    autocomplete="on"
    @click:append="show = !show"
    :disabled="sentIt"
  />
</template>

<script>
export default {
  props: {
    password: {
      type: String,
      default: ''
    },
    setValidation: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'パスワードを入力'
    }
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    setPassword: {
      get () {
        return this.password
      },
      set (newValue) {
        return this.$emit('update:password',newValue)
      }
    },
    setLabel () {
      return this.label
    },
    form () {
      const min = '8文字以上'
      const msg = `${min}。`
      const required = v => !!v || ''
      const format = v => /^[\w-]{8,72}$/.test(v) || msg

      const rules = this.setValidation ? [format] : [required]
      const hint = this.setValidation ? msg : undefined
      const placeholder = this.setValidation ? min : undefined
      return { rules, hint, placeholder }
    },
    toggle () {
      const icon = this.show ? 'mdi-eye' : 'mdi-eye-off'
      const type = this.show ? 'text' : 'password'
      return { icon, type }
    }
  }
}
</script>