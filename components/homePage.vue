<template>
  <div class="right-panel" style="display: flex; flex-direction: column; padding: 20px; background-color: #f9f9f9; border-radius: 8px; height: 100vh; box-sizing: border-box;">
    <div class="container" style="height: 100%; overflow: hidden;">
      <h2 style="font-size: 36px; color: #1B262C; margin: 0; padding: 10px 0;">
        Actividad
      </h2>

      <!-- Sección de Actividad -->
      <div class="activity-section" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); padding: 20px; margin-bottom: 20px; flex: 1; overflow: hidden;">
        <div class="header" style="display: flex; justify-content: space-between; align-items: center;">
          <h3 style="color: #1B262C; font-size: 18px; line-height: 21.6px;">
            Diciembre 2024 - Enero 2025
          </h3>
        </div>

        <!-- Estadísticas -->
        <div class="stats" style="display: flex; justify-content: space-between; margin-top: 20px;">
          <!-- Contactos -->
          <div style="text-align: center; display: flex; flex-direction: column; align-items: center; flex: 1;">
            <h3 style="font-size: 1rem; color: #555;">
              Contactos
            </h3>
            <p style="font-size: 1.5rem; color: #007bff;">
              {{ totalContactos.toLocaleString() }}
            </p>
          </div>
          <!-- Productos -->
          <div style="text-align: center; display: flex; flex-direction: column; align-items: center; flex: 1;">
            <h3 style="font-size: 1rem; color: #555;">
              Productos
            </h3>
            <p style="font-size: 1.5rem; color: #007bff;">
              {{ totalProductos.toLocaleString() }}
            </p>
          </div>
        </div>

        <!-- Gráfica de Barras Comparativa -->
        <div class="chart" style="height: 160px; background-color: #eef3fc; border-radius: 8px; display: flex; justify-content: space-around; align-items: flex-end; padding: 10px;">
          <!-- Barra de Contactos -->
          <div class="bar" :style="getBarStyle(totalContactos, '#4BC0C0')">
            <span class="label" style="text-align: center; color: #fff; font-size: 12px; padding-top: 5px;">{{ totalContactos }}</span>
          </div>

          <!-- Barra de Productos -->
          <div class="bar" :style="getBarStyle(totalProductos, '#9966FF')">
            <span class="label" style="text-align: center; color: #fff; font-size: 12px; padding-top: 5px;">{{ totalProductos }}</span>
          </div>
        </div>
      </div>

      <!-- Sección Inferior -->
      <div class="bottom-section" style="display: flex; gap: 20px; flex-wrap: wrap;">
        <!-- Contactos Nuevos -->
        <div class="card" style="flex: 1 1 45%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); padding: 20px; height: 100%;">
          <h3 style="font-size: 1rem; margin-bottom: 10px; color: #333;">
            Nuevos Contactos
          </h3>
          <ul style="list-style: none; padding: 0;">
            <li v-for="contacto in contactos" :key="contacto.id" style="margin-bottom: 5px; font-size: 0.9rem; color: #555;">
              {{ contacto.nombre }}
            </li>
          </ul>
        </div>
        <!-- Últimos Productos -->
        <div class="card" style="flex: 1 1 45%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); padding: 20px; height: 100%;">
          <h3 style="font-size: 1rem; margin-bottom: 10px; color: #333;">
            Últimos Productos
          </h3>
          <ul style="list-style: none; padding: 0;">
            <li v-for="producto in productos" :key="producto.id" style="margin-bottom: 5px; font-size: 0.9rem; color: #555;">
              {{ producto.item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedPeriod: 'Mes',
      contactos: [],
      productos: [],
      totalContactos: 0,
      totalProductos: 0
    };
  },
  async mounted() {
    await this.getContactos();
    await this.getProductos();
  },
  methods: {
    setPeriod(period) {
      this.selectedPeriod = period;
    },
    async getContactos() {
      try {
        const res = await this.$axios.get('/clientes');
        this.contactos = res.data.clientes || [];
        this.totalContactos = this.contactos.length;
      } catch (error) {
        console.error('Error al obtener clientes:', error);
      }
    },
    async getProductos() {
      try {
        const res = await this.$axios.get('/inventarios');
        this.productos = res.data.inventarios || [];
        this.totalProductos = this.productos.length;
      } catch (error)        {
        console.error('Error al obtener inventarios:', error);
      }
    },
    // Función para obtener el estilo dinámico de la barra
    getBarStyle(value, color) {
      const scale = 8; // Factor aumentado para hacer las barras más anchas
      const minHeight = 40; // Altura mínima
      const height = (value * scale) + minHeight; // Escala la altura de las barras

      return {
        backgroundColor: color,
        width: '100px', // Barras más anchas
        height: `${height}px` // Ajustamos la altura
      };
    }
  }
};
</script>

<style scoped>
.bar {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 4px;
}

.label {
  padding-top: 5px;
  font-size: 12px;
}
</style>



