<template>
  <home />
</template>

<script>
import home from '~/components/homePage.vue'
export default {
  components: {
    home
  },
  layout: 'dashboard',
  middleware: 'auth'
}
</script>

    <style scoped>
    </style>
