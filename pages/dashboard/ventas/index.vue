<template>
  <ventas-crud />
</template>

<script>
import ventasCrud from '../../../components/ventasCrud.vue'
export default {
  components: {
    ventasCrud
  },
  layout: 'dashboard',
  middleware: 'auth'
}
</script>

  <style scoped>
  </style>
