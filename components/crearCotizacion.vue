<template>
  <v-container class="quote-container" width="600">
    <v-card flat elevation="0" color="#FFFFFF">
      <v-card-title>
        <div class="d-flex justify-space-between align-center" style="width: 100%;">
          <h1 class="title">
            NUEVA COTIZACIÓN
          </h1>
        </div>
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="guardarCotizacion">
          <!-- Información general -->
          <v-row>
            <v-col cols="12" sm="4" class="d-flex align-center">
              <h4 class="mr-2">
                Contacto
              </h4>
              <v-select
                v-model="contactoSeleccionado"
                :items="contactos"
                item-text="nombre"
                item-value="id"
                label="Contacto"
                dense
                outlined
                required
                @change="actualizarTelefono"
              />
            </v-col>
            <v-col cols="12" sm="4" class="d-flex align-center">
              <h4 class="mr-2">
                Teléfono
              </h4>
              <v-text-field
                v-model="telefono"
                label="Teléfono"
                outlined
                dense
                disabled
                required
                readonly
              />
            </v-col>
            <v-col cols="12" sm="4" class="d-flex align-center">
              <h4 class="mr-2">
                Número de Nota
              </h4>
              <v-text-field
                v-model="numeroNota"
                label="Número de Nota"
                outlined
                dense
                required
              />
            </v-col>
          </v-row>

          <!-- Fechas -->
          <v-row>
            <v-col cols="12" sm="6" class="d-flex align-center">
              <h4 class="mr-2">
                Fecha
              </h4>
              <v-menu
                ref="menu1"
                v-model="menuFecha"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="fecha"
                    label="Fecha"
                    readonly
                    dense
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker v-model="fecha" @input="menuFecha = false" />
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6" class="d-flex align-center">
              <h4 class="mr-2">
                Vencimiento
              </h4>
              <v-menu
                ref="menu2"
                v-model="menuVencimiento"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="fechaVencimiento"
                    label="Fecha de Vencimiento"
                    readonly
                    dense
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker v-model="fechaVencimiento" @input="menuVencimiento = false" />
              </v-menu>
            </v-col>
          </v-row>

          <!-- Tabla de ítems -->
          <div style="background-color: white; border-radius: 8px; padding: 20px; margin: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);">
            <div style="display: flex; background-color: #3282B8; color: white; padding: 10px; border-radius: 15px;">
              <div v-for="header in headers" :key="header.text" style="flex: 1; text-align: center; font-weight: bold;">
                {{ header.text }}
              </div>
            </div>
            <div v-for="(fila, index) in filas" :key="index" style="display: flex; padding: 10px; border-bottom: 1px solid #ccc;">
              <!-- Columna de Producto -->
              <div style="flex: 1; text-align: center;">
                <v-select
                  v-model="fila.item"
                  :items="productos"
                  item-text="nombre"
                  item-value="id"
                  label="Producto"
                  dense
                  outlined
                  @change="actualizarPrecio(index)"
                />
              </div>
              <div style="flex: 1; text-align: center;">
                {{ fila.referencia }}
              </div>
              <div style="flex: 1; text-align: center;">
                {{ fila.precio }}
              </div>
              <div style="flex: 1; text-align: center;">
                <v-text-field
                  v-model="fila.descuento"
                  type="number"
                  dense
                  outlined
                  @input="calcularTotal(index)"
                />
              </div>
              <div style="flex: 1; text-align: center;">
                <v-text-field
                  v-model="fila.impuesto"
                  type="number"
                  dense
                  outlined
                  @input="calcularTotal(index)"
                />
              </div>
              <div style="flex: 1; text-align: center;">
                {{ fila.descripcion }}
              </div>
              <div style="flex: 1; text-align: center;">
                <v-text-field
                  v-model="fila.cantidad"
                  type="number"
                  dense
                  outlined
                  @input="calcularTotal(index)"
                />
              </div>
              <div style="flex: 1; text-align: center;">
                {{ fila.total }}
              </div>
              <div style="flex: 1; text-align: center;">
                <v-btn icon color="red" @click="eliminarFila(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </div>
          </div>

          <v-btn class="my-3" color="blue" outlined @click="agregarFila">
            Agregar nueva fila
          </v-btn>

          <!-- Totales -->
          <v-row>
            <v-col cols="12" sm="4" offset-sm="8">
              <v-row>
                <v-col>
                  <p><strong>Subtotal:</strong> {{ subtotal }}</p>
                  <p><strong>Impuestos:</strong> {{ impuestos }}</p>
                  <p><strong>Total:</strong> {{ total }}</p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <!-- Firma -->
          <!--  <v-row>
            <v-col cols="12" class="text-center">
              <h4 class="mb-2">
                Firma
              </h4>
              <v-btn outlined color="blue">
                Usar Firma
              </v-btn>
            </v-col>
          </v-row> -->

          <!-- Notas -->
          <v-row>
            <v-col cols="12" class="d-flex align-center">
              <h4 class="mr-2">
                Notas
              </h4>
              <v-textarea v-model="notas" label="Notas" dense outlined />
            </v-col>
          </v-row>

          <!-- Botones -->
          <v-row>
            <v-col cols="12" class="d-flex justify-space-between">
              <v-btn outlined color="grey">
                Cancelar
              </v-btn>
              <v-btn color="blue" @click="guardarCotizacion">
                Guardar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        { text: 'Producto' },
        { text: 'Referencia' },
        { text: 'Precio' },
        { text: 'Descuento' },
        { text: 'Impuesto' },
        { text: 'Descripción' },
        { text: 'Cantidad' },
        { text: 'Total' },
        { text: 'Acciones' }
      ],
      contactos: [], // Lista de contactos obtenida desde la API
      productos: [], // Lista de productos obtenida desde la API
      filas: [
        {
          item: null,
          referencia: '',
          precio: 0,
          descuento: 0,
          impuesto: 0,
          descripcion: '',
          cantidad: 1,
          total: 0
        }
      ],
      subtotal: 0,
      impuestos: 0,
      total: 0,
      telefono: '',
      contactoSeleccionado: null,
      numeroNota: '',
      fecha: '',
      fechaVencimiento: '',
      menuFecha: false,
      menuVencimiento: false,
      notas: ''
    }
  },
  mounted () {
    this.getContactos()
    this.getProductos()
  },
  methods: {
    async getContactos () {
      try {
        const res = await this.$axios.get('/clientes')
        if (res.data && res.data.success) {
          this.contactos = res.data.clientes
        }
      } catch (error) {
        console.error('Error al obtener los contactos:', error)
      }
    },
    async getProductos () {
      try {
        const res = await this.$axios.get('/productos')
        if (res.data && res.data.success) {
          this.productos = res.data.productos
        }
      } catch (error) {
        console.error('Error al obtener los productos:', error)
      }
    },
    agregarFila () {
      this.filas.push({
        item: null,
        referencia: '',
        precio: 0,
        descuento: 0,
        impuesto: 0,
        descripcion: '',
        cantidad: 1,
        total: 0
      })
    },
    eliminarFila (index) {
      this.filas.splice(index, 1)
      this.calcularTotales()
    },
    actualizarPrecio (index) {
      const producto = this.productos.find(p => p.id === this.filas[index].item)
      if (producto) {
        this.filas[index].precio = producto.precio
        this.filas[index].referencia = producto.referencia || ''
        this.calcularTotal(index)
      }
    },
    calcularTotal (index) {
      const fila = this.filas[index]
      const subtotal = fila.precio * fila.cantidad
      const descuento = (fila.descuento / 100) * subtotal
      const impuesto = (fila.impuesto / 100) * (subtotal - descuento)
      fila.total = subtotal - descuento + impuesto
      this.calcularTotales()
    },
    calcularTotales () {
      this.subtotal = this.filas.reduce((sum, fila) => sum + fila.total, 0)
      this.impuestos = this.filas.reduce((sum, fila) => sum + (fila.impuesto / 100) * (fila.precio * fila.cantidad), 0)
      this.total = this.subtotal + this.impuestos
    },
    guardarCotizacion () {
      console.log('Cotización guardada')
    },
    actualizarTelefono () {
      const contacto = this.contactos.find(c => c.id === this.contactoSeleccionado)
      this.telefono = contacto ? contacto.telefono : ''
    }
  }
}
</script>

<style scoped>
.quote-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>
