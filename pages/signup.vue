<template>
  <user-form-card>
    <template
      #user-form-card-content
    >
    <v-form
      v-model="isValid"
    >
      <user-form-name
        :name.sync="params.user.name"
      />
      <user-form-email
        :email.sync="params.user.email"
        placeholder
      />
      <user-form-password
        :password.sync="params.user.password"
        set-validation
      />
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
  layout: 'before-login',
  data () {
    return {
      isValid: false,
      params: { user: { name: '', email: '', password: '' } }
    }
  }
}
</script>