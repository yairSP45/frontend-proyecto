<template>
  <inventarios-crud />
</template>

<script>
import inventariosCrud from '../../../components/inventariosCrud.vue'
export default {
  components: {
    inventariosCrud
  },
  layout: 'dashboard',
  middleware: 'auth'
}
</script>

<style scoped>
</style>
