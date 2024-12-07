<template>
  <v-app>
    <v-main>
      <Nuxt />
    </v-main>
    <v-navigation-drawer
      permanent
      absolute
      left
      app
      width="325px"
      color="#0F4C75"
      style="border-top-right-radius: 50px;"
    >
      <template #prepend>
        <v-list-item>
          <v-list-item-content style="text-align: center;">
            <v-list-item-title
              style="text-align: center; margin: 15%;"
            >
              <img src="../assets/logo.jpeg" alt="Logo" style="max-width: 100%; height: auto;">
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-list dense>
        <v-list-item
          v-for="(item, index) in items"
          :key="item.title"
          :to="item.path"
          :class="['list-item', { 'active-item': activeIndex === index }]"
          link
          style="margin: 10%;  font-family: 'Lato', sans-serif;
          font-weight: 700;
          font-size: 18px;
          line-height: 21.6px;
          margin-bottom: 10px;
          color: white"
          @click="setActive(index)"
        >
          <v-list-item-icon style="position: relative;">
            <v-icon color="white">
              {{ item.icon }}
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { title: 'Home', path: '/dashboard/home', icon: 'mdi-home-outline' },
        { title: 'Contactos', path: '/dashboard/contactos', icon: 'mdi-account-box-outline' },
        { title: 'Ventas', path: '/dashboard/ventas', icon: 'mdi-sale-outline' },
        { title: 'Inventarios', path: '/dashboard/inventarios', icon: 'mdi-store-check-outline' },
        { title: 'Facturador', path: '/dashboard/facturador', icon: 'mdi-text-box-edit-outline' }
      ],
      activeIndex: null // Índice del elemento seleccionado
    }
  },
  methods: {
    setActive (index) {
      this.activeIndex = index // Actualiza el índice del ítem activo
    }
  }
}
</script>

<style scoped>

.list-item {
  position: relative;
  transition: all 0.3s ease;
  border-radius: 0; /* Quitar bordes redondeados por defecto de Vuetify */
}

.active-item {
  background-color: #BBE1FA;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  width: 290px;
  height: 88px;
  margin-left: 33px; /* Desplazamiento hacia la izquierda para mantener proporciones */
  color: #0F4C75;
  transition: all 0.3s ease;
}

.v-list-item-title,
.v-list-item-icon {
  color: white; /* Cambia el color del texto de los ítems */
  position: relative;
}

.active-item .v-list-item-title,
.active-item .v-icon {
  color: #0F4C75; /* Cambia el color del ítem activo */
  position: relative;
}
</style>
