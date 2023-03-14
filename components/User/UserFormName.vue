<template>
  <v-text-field
    dense
    v-model="setName"
    :rules="rules"
    :counter="max"
    label="ユーザー名を入力"
    outlined
  />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    const max = 16
    return {
      max,
      rules: [
        v => !!v || '',
        v => (!!v && max >= v.length) || `${max}文字以内で入力してください`
      ]
    }
  },
  computed: {
    setName: {
      get () {
        return this.name
      },
      set (newValue) {
        return this.$emit('update:name',newValue)
      }
    }
  }
}
</script>