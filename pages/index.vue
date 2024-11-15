<template>
  <login-form />
</template>

<script>
import loginForm from '../components/loginForm.vue'
export default {
  components: {
    loginForm
  },
  auth: false,
  layout: 'login'
}
</script>

<style scoped>
</style>
