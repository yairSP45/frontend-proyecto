<template>
  <div>
    <signup-form />
  </div>
</template>

<script>
import signupForm from '../../components/sigupForm.vue'
export default {
  components: {
    signupForm
  },
  auth: false,
  layout: 'login'
}
</script>

<style scoped>
</style>
