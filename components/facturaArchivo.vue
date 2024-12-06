<template>
  <div>
    <div id="contenido-factura">
      <v-card class="mt-4">
        <!-- Cabecera -->
        <v-card-title class="headline">
          Detalle de Factura
        </v-card-title>

        <!-- Contenido del componente -->
        <v-card-text>
          <v-container>
            <!-- División en dos columnas -->
            <v-row>
              <!-- Columna izquierda con fondo gris, 1/5 del ancho -->
              <v-col cols="2" class="bg-grey-lighten-3 p-2">
                <p><strong>CLIENTE</strong></p>
                <p><strong>CREACIÓN</strong></p>
                <p><strong>TÉRMINOS Y CONDICIONES</strong></p>
                <p><strong>RESOLUCIÓN</strong></p>
                <p><strong>NÚMERO CAJA</strong></p>
              </v-col>

              <!-- Columna derecha con fondo blanco, 4/5 del ancho -->
              <v-col cols="10" class="bg-white p-2">
                <p>{{ facturaLista.cliente }}</p>
                <p>{{ facturaLista.creacion }}</p>
                <p>
                  Esta factura se asimila en todos sus efectos a una letra de cambio de
                  conformidad con el Art. 774 del Código de Comercio...
                </p>
                <p>#12345</p>
                <p>001</p>
              </v-col>
            </v-row>
          </v-container>

          <v-divider class="my-4" />

          <!-- Tabla de Items -->
          <table class="factura-table">
            <thead>
              <tr>
                <th>ITEM</th>
                <th>REFERENCIA</th>
                <th>PRECIO</th>
                <th>IVA</th>
                <th>DESCUENTO</th>
                <th>CANTIDAD</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in facturaLista.items" :key="index">
                <td>{{ item.item }}</td>
                <td>{{ item.ref }}</td>
                <td>${{ Number(item.precio).toFixed(2) }}</td> <!-- Conversión a número -->
                <td>16%</td>
                <td>${{ Number(item.descuento || 0).toFixed(2) }}</td> <!-- Conversión a número, con valor predeterminado -->
                <td>{{ item.cantidad }}</td>
                <td>
                  ${{ (Number(item.precio) * item.cantidad * 1.16).toFixed(2) }}
                </td> <!-- Calculo de IVA y Total con conversión a número -->
              </tr>
            </tbody>
          </table>

          <v-divider class="my-4" />

          <!-- Subtotales y Totales -->
          <v-container>
            <v-row>
              <v-col cols="6" />
              <v-col cols="6" class="d-flex justify-end">
                <table class="factura-table">
                  <tbody>
                    <tr>
                      <td><strong>SUB TOTAL:</strong></td>
                      <td>${{ Number(facturaLista.subtotal).toFixed(2) }}</td> <!-- Conversión a número -->
                    </tr>
                    <tr>
                      <td><strong>IVA (16%):</strong></td>
                      <td>${{ Number(facturaLista.iva).toFixed(2) }}</td> <!-- Conversión a número -->
                    </tr>
                    <tr>
                      <td><strong>TOTAL:</strong></td>
                      <td><strong>${{ Number(facturaLista.total).toFixed(2) }}</strong></td> <!-- Conversión a número -->
                    </tr>
                  </tbody>
                </table>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </div>
    <div style="background-color: #ffffff; padding: 5px; height: 50px; overflow: hidden;">
      <!-- Contenedor con display flex para centrar los botones en columnas -->
      <v-row class="d-flex justify-center align-center">
        <v-col cols="auto" class="d-flex justify-center">
          <v-btn color="#C4C4C4" dark @click="cancelar">
            Cancelar
          </v-btn>
        </v-col>
        <v-col cols="auto" class="d-flex justify-center">
          <v-btn color="#3282B8" dark @click="imprimir">
            Imprimir
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>

import { jsPDF } from 'jspdf'

export default {
  props: {
    facturaLista: { type: Object, default: null }
  },
  data () {
    return {
      factura: {}
    }
  },
  watch: {
    facturaLista: {
      immediate: true,
      handler (newValue) {
        if (newValue && this.update) {
          this.factura = { ...newValue }
        }
      }
    },
    update: {
      immediate: true,
      handler (isUpdate) {
        if (!isUpdate) {
          this.limpiarFormulario()
        }
      }
    }
  },
  created () {
    // Imprimir los valores de factura cuando el componente se cree
    console.log('Factura Recibida:', this.facturaLista)
  },
  methods: {
    cancelar () {
      this.$emit('click-cancel')
    },
    imprimir () {
      const doc = new jsPDF({
        unit: 'mm', // Usar milímetros en lugar de píxeles
        format: 'a4' // O el tamaño de página que desees, 'a4' es estándar
      })
      const element = document.getElementById('contenido-factura')

      // Ajustar el contenido dentro del documento
      doc.html(element, {
        callback: (doc) => {
          doc.save('factura.pdf')
        },
        margin: [10, 10],
        x: 10, // Ajusta la posición X de tu contenido
        y: 10, // Ajusta la posición Y de tu contenido
        width: 180, // Limitar el ancho para que no se salga de los márgenes
        windowWidth: 1000 // Asegúrate de que se ajuste al ancho de la ventana de tu página
      })
    },

    limpiarFormulario () {
      console.log('Limpiar formulario')
    }
  }
}
</script>

<style scoped>
.factura-header {
  margin-bottom: 16px;
  background-color: #f4f4f4; /* Color de fondo similar al de la imagen */
  padding: 16px;
  border-radius: 8px;
}

.factura-info p {
  margin: 8px 0;
  font-size: 14px;
  text-align: center; /* Para centrar el texto */
}

.factura-table th {
  background-color: #F0F0F0; /* Fondo gris claro */
  font-weight: bold; /* Opcional: Para que el texto sea más destacado */
  text-align: left; /* Alineación del texto */
  padding: 8px; /* Espaciado interno */
  border: 1px solid #ddd; /* Borde para separación */
}

.factura-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.totales p {
  margin: 8px 0;
}

.bg-grey-lighten-3 {
  background-color: #F0F0F0; /* Fondo gris claro */
}

.bg-white {
  background-color: #ffffff; /* Fondo blanco */
}

.v-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.v-col p {
  margin: 8px 0;
  font-size: 14px;
  line-height: 1.5;
}

.factura-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}

.factura-table th,
.factura-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.factura-table th {
  background-color: #F0F0F0;
  font-weight: bold;
  text-align: center;
}

.factura-table td {
  text-align: right; /* Alineación del contenido a la derecha */
}

.factura-table tbody tr td:first-child {
  text-align: left; /* La primera columna queda alineada a la izquierda */
}
.factura-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}

.factura-table th,
.factura-table td {
  border: none; /* Elimina todas las líneas */
  border-bottom: 1px solid #ddd; /* Solo líneas horizontales */
  padding: 8px;
  text-align: left;
}

.factura-table th {
  background-color: #F0F0F0;
  font-weight: bold;
}

.factura-table td {
  text-align: right;
}

.factura-table tbody tr td:first-child {
  text-align: left; /* Alinea la primera columna a la izquierda */
}

</style>
