<template>
  <facturador />
</template>

<script>
import facturador from '~/components/facturadorPage.vue'

export default {
  components: {
    facturador
  },
  layout: 'dashboard',
  middleware: 'auth'
}
</script>

<style scoped>
</style>
