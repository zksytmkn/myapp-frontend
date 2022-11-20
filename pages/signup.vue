<template>
  <user-form-card>
    <template
      #user-form-card-content
    >
    <v-form
      v-model="isValid"
    >
      <user-form-name />
      <user-form-email />
      <user-form-password />
      <v-btn
        :disabled="!isValid"
        block
        color="appblue"
        class="white--text"
      >
        登録する
      </v-btn>
    </v-form>
    </template>
  </user-form-card>  
</template>

<script>
export default {
  layout: 'before-login'
}
</script>