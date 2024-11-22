<template>
  <div class="right-panel" style="display: flex; flex-direction: column; padding: 20px; background-color: #f9f9f9; border-radius: 8px; height: 100vh; box-sizing: border-box;">
    <div class="container" style="height: 100%; overflow: hidden;">
      <h2 style="font-size: 36px; color: #1B262C; margin: 0; padding: 10px 0;">
        Actividad
      </h2>

      <!-- Sección de Actividad -->
      <div class="activity-section" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); padding: 20px; margin-bottom: 20px; flex: 1; overflow: hidden;">
        <div class="header" style="display: flex; justify-content: space-between; align-items: center;">
          <!-- Texto de la esquina izquierda -->
          <h3 style="color: #1B262C; font-size: 18px; line-height: 21.6px;">
            Enero 2020 - febrero 2020
          </h3>

          <!-- Contenedor de los botones en la esquina derecha -->
          <div class="period-buttons" style="display: flex; background-color: #C4C4C4; border-radius: 50px; padding: 3px; width: 296px; height: 37px;">
            <button
              :class="{ active: selectedPeriod === 'Mes' }"
              style="width: 97px; height: 31px; background-color: transparent; border: none; border-radius: 15px; font-size: 14px; color: #555; cursor: pointer; transition: background-color 0.3s, color 0.3s;"
              :style="{ backgroundColor: selectedPeriod === 'Mes' ? '#ffffff' : 'transparent', color: selectedPeriod === 'Mes' ? '#333' : '#555', fontWeight: selectedPeriod === 'Mes' ? 'bold' : 'normal', boxShadow: selectedPeriod === 'Mes' ? '0 2px 5px rgba(0, 0, 0, 0.15)' : 'none' }"
              @click="setPeriod('Mes')"
            >
              Mes
            </button>
            <button
              :class="{ active: selectedPeriod === '1 Año' }"
              style="width: 97px; height: 31px; background-color: transparent; border: none; border-radius: 15px; font-size: 14px; color: #555; cursor: pointer; transition: background-color 0.3s, color 0.3s;"
              :style="{ backgroundColor: selectedPeriod === '1 Año' ? '#ffffff' : 'transparent', color: selectedPeriod === '1 Año' ? '#333' : '#555', fontWeight: selectedPeriod === '1 Año' ? 'bold' : 'normal', boxShadow: selectedPeriod === '1 Año' ? '0 2px 5px rgba(0, 0, 0, 0.15)' : 'none' }"
              @click="setPeriod('1 Año')"
            >
              1 Año
            </button>
            <button
              :class="{ active: selectedPeriod === '2 Años' }"
              style="width: 97px; height: 31px; background-color: transparent; border: none; border-radius: 15px; font-size: 14px; color: #555; cursor: pointer; transition: background-color 0.3s, color 0.3s;"
              :style="{ backgroundColor: selectedPeriod === '2 Años' ? '#ffffff' : 'transparent', color: selectedPeriod === '2 Años' ? '#333' : '#555', fontWeight: selectedPeriod === '2 Años' ? 'bold' : 'normal', boxShadow: selectedPeriod === '2 Años' ? '0 2px 5px rgba(0, 0, 0, 0.15)' : 'none' }"
              @click="setPeriod('2 Años')"
            >
              2 Años
            </button>
          </div>
        </div>

        <!-- Estadísticas -->
        <div class="stats" style="display: flex; justify-content: flex-start; margin-top: 20px; flex-wrap: wrap;">
          <!-- Contactos -->
          <div style="text-align: left; display: flex; flex-direction: column; align-items: flex-start; margin: 10px;">
            <h3 style="font-size: 1rem; color: #555;">
              Contactos
            </h3>
            <p style="font-size: 1.5rem; color: #007bff;">
              123,000
            </p>
          </div>
          <!-- Ventas -->
          <div style="text-align: left; display: flex; flex-direction: column; align-items: flex-start; margin: 10px;">
            <h3 style="font-size: 1rem; color: #555;">
              Ventas
            </h3>
            <p style="font-size: 1.5rem; color: #007bff;">
              2,300
            </p>
          </div>
        </div>

        <!-- Gráfica -->
        <div class="chart" style="height: 150px; background-color: #eef3fc; border-radius: 8px; display: flex; justify-content: center; align-items: center; color: #999;">
          <p>Aquí irá la gráfica de barras</p>
        </div>
      </div>

      <!-- Sección Inferior -->
      <div class="bottom-section" style="display: flex; gap: 20px; flex-wrap: wrap;">
        <!-- Cotizaciones Nuevas -->
        <div class="card" style="flex: 1 1 45%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); padding: 20px; height: 100%;">
          <h3 style="font-size: 1rem; margin-bottom: 10px; color: #333;">
            Cotizaciones Nuevas
          </h3>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 5px; font-size: 0.9rem; color: #555;">
              Venta de Hp...
            </li>
            <li style="margin-bottom: 5px; font-size: 0.9rem; color: #555;">
              Venta de Audífonos...
            </li>
            <li style="margin-bottom: 0; font-size: 0.9rem; color: #555;">
              Hp Portátil...
            </li>
          </ul>
        </div>
        <!-- Últimos Productos -->
        <div class="card" style="flex: 1 1 45%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); padding: 20px; height: 100%;">
          <h3 style="font-size: 1rem; margin-bottom: 10px; color: #333;">
            Últimos Productos
          </h3>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 5px; font-size: 0.9rem; color: #555;">
              Hp Pavilion h2342
            </li>
            <li style="margin-bottom: 5px; font-size: 0.9rem; color: #555;">
              Hp Pavilion h2342wvfg...
            </li>
            <li style="margin-bottom: 0; font-size: 0.9rem; color: #555;">
              Hp Pavilion h2342...
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedPeriod: 'Mes' // Valor inicial
    }
  },
  methods: {
    setPeriod (period) {
      this.selectedPeriod = period
    }
  }
}
</script>
