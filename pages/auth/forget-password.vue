<template>
  <v-form-card>
    <template>
      <v-form>
        <user-form-password
          :password.sync="params.auth.password"
        />
      </v-form>
    </template>
  </v-form-card>
</template>

<script>
export default {
  layout: 'before-login'
}
</script>
