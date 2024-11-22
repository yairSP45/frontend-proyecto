<template>
  <contactos />
</template>

<script>
import contactos from '~/components/contactosPage.vue'
export default {
  components: {
    contactos
  },
  layout: 'dashboard',
  middleware: 'auth'
}
</script>

      <style scoped>
      </style>
