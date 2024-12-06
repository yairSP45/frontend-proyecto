<template>
  <v-container class="quote-container" width="1000">
    <v-card flat elevation="0" color="#FFFFFF">
      <v-card-title>
        <div class="d-flex justify-space-between align-center">
          <h1 class="title">
            {{ inside && update ? 'Actualiza la Factura recurrente' : (inside ? 'Registra Nueva Factura Recurrente' : '') }}
          </h1>
        </div>
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="guardarFactura">
          <!-- Información general -->
          <v-row>
            <v-col cols="12" sm="4" class="d-flex align-center">
              <h4 class="mr-2">
                Numeración
              </h4>
              <v-text-field
                v-model="numeracionSeleccionada"
                label="Numeración"
                dense
                outlined
                required
              />
            </v-col>

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
                dense
                outlined
                disabled
                required
                readonly
              />
            </v-col>

          </v-row>

          <!-- Fechas -->
          <v-row>
            <v-col cols="12" sm="6" class="d-flex align-center">
              <h4 class="mr-2">
                Fecha de inicio
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
                    v-model="fechaInicio"
                    label="Fecha de inicio"
                    readonly
                    dense
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker v-model="fechaInicio" @input="menuFecha = false" />
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6" class="d-flex align-center">
              <h4 class="mr-2">
                Última fecha
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
                    v-model="ultimaFecha"
                    label="Última fecha"
                    readonly
                    dense
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker v-model="ultimaFecha" @input="menuVencimiento = false" />
              </v-menu>
            </v-col>
          </v-row>

          <!-- Término, Fecha de expiración, Frecuencia y Lista de precio -->
          <v-row>
            <v-col cols="12" sm="3" class="d-flex align-center">
              <h4 class="mr-2">
                Término
              </h4>
              <v-menu
                ref="menuTermino"
                v-model="menuTerminoVisible"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="terminoFecha"
                    label="Término"
                    readonly
                    dense
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker v-model="terminoFecha" @input="menuTerminoVisible = false" />
              </v-menu>
            </v-col>
            <v-col cols="12" sm="3" class="d-flex align-center">
              <h4 class="mr-2">
                Fecha de expiración
              </h4>
              <v-menu
                ref="menuExpiracion"
                v-model="menuExpiracionVisible"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="fechaExpiracion"
                    label="Fecha de expiración"
                    readonly
                    dense
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker v-model="fechaExpiracion" @input="menuExpiracionVisible = false" />
              </v-menu>
            </v-col>
            <v-col cols="12" sm="3" class="d-flex align-center">
              <h4 class="mr-2">
                Frecuencia
              </h4>
              <v-select
                v-model="frecuenciaSeleccionada"
                :items="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ]"
                item-text="nombre"
                item-value="id"
                label="Frecuencia"
                dense
                outlined
              />
            </v-col>
            <v-col cols="12" sm="3" class="d-flex align-center">
              <h4 class="mr-2">
                Lista de precio
              </h4>
              <v-select
                v-model="listaPrecioSeleccionada"
                :items="['General','Mayoritario']"
                item-text="nombre"
                item-value="id"
                label="Lista de precio"
                dense
                outlined
              />
            </v-col>
          </v-row>

          <!-- Notas de la factura -->
          <v-row>
            <v-col cols="12" sm="4" class="d-flex align-center">
              <h4 class="mr-2">
                Notas de Factura
              </h4>
              <v-textarea v-model="notas" label="Notas de Factura" dense outlined />
            </v-col>

            <v-col cols="12" sm="4" class="d-flex align-center">
              <h4 class="mr-2">
                Observaciones
              </h4>
              <v-textarea v-model="observaciones" label="Observaciones" dense outlined />
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
                  item-text="item"
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

          <v-row>
            <v-col cols="12" class="d-flex justify-space-between">
              <v-btn outlined color="grey" @click="cancelar">
                Cancelar
              </v-btn>
              <v-btn color="blue" @click="guardarFactura">
                {{ inside && update ? 'Actualizar' : (inside ? 'Guardar' : '') }}
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
  props: {
    inside: { type: Boolean, default: false },
    update: { type: Boolean, default: false },
    facturaEditada: { type: Object, default: null } 
  },
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
      numeracionSeleccionada: '',
      fechaInicio: '',
      ultimaFecha: '',
      terminoFecha: '',
      fechaExpiracion: '',
      menuFecha: false,
      menuVencimiento: false,
      menuTerminoVisible: false,
      menuExpiracionVisible: false,
      observaciones: '',
      listaPrecioSeleccionada: '',
      frecuenciaSeleccionada: ''
    }
  },
  watch: {
    facturaEditada (newValue) {
      if (newValue) {
        this.cargarFactura(newValue)
      }
    }
  },
  mounted () {
    this.getContactos()
    .then(() => this.getProductos())
    .then(() => {
        if (this.update && this.facturaEditada) {
          this.cargarFactura(this.facturaEditada)
        }
      })
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
        const res = await this.$axios.get('/inventarios')
        if (res.data && res.data.success) {
          this.productos = res.data.inventarios
        }
      } catch (error) {
        console.error('Error al obtener los productos:', error)
      }
    },
    cargarFactura (factura) {
      this.contactoSeleccionado = null
      this.telefono = ''
      this.filas = [{
        item: null,
        referencia: '',
        precio: 0,
        descuento: 0,
        impuesto: 0,
        descripcion: '',
        cantidad: 1,
        total: 0
      }]

      const contacto = this.contactos.find(c => c.nombre.trim() === factura.cliente.trim())

      if (contacto) {
        this.contactoSeleccionado = contacto.id
        this.telefono = contacto.telefono
      } 

      // Asignar datos básicos
      this.numeracionSeleccionada = factura.numeracion || ''   
      this.fechaInicio = factura.iniciofecha || ''
      this.ultimaFecha = factura.ultimafecha || ''
      this.terminoFecha = factura.termino || ''
      this.fechaExpiracion = factura.expiracion || ''
      this.frecuenciaSeleccionada = factura.frecuencia || ''
      this.listaPrecioSeleccionada = factura.listprecio || ''
      this.notas = factura.notafacturas || ''
      this.observaciones = factura.observaciones || ''

      // Asignar productos a las filas
      this.filas = factura.producto.map((producto) => {
        const prod = this.productos.find(p => p.item.trim() === producto.nombreproducto.trim())
        if (prod) {
          return {
            item: prod.id,
            referencia: producto.referencia || '',
            precio: producto.precio || 0,
            descuento: producto.descuento || 0,
            impuesto: producto.impuesto || 0,
            descripcion: producto.descripcion || '',
            cantidad: producto.cantidad || 1,
            total: producto.total || 0
          }
        } 
          return {
            item: null,
            referencia: producto.referencia || '',
            precio: producto.precio || 0,
            descuento: producto.descuento || 0,
            impuesto: producto.impuesto || 0,
            descripcion: producto.descripcion || '',
            cantidad: producto.cantidad || 1,
            total: producto.total || 0
          }
      })
      // Recalcular totales
      this.calcularTotales()
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
      const productoSeleccionado = this.filas[index].item
      const producto = this.productos.find(prod => prod.id === productoSeleccionado)

      if (producto) {
        // Asignar los valores correctamente
        this.filas[index].precio = producto.precio
        this.filas[index].referencia = producto.ref // Asegúrate de que este campo sea correcto
        this.filas[index].descripcion = producto.descripcion // Ahora se asigna la descripcion correctamente

        // Ahora asignamos el nombre del producto al campo 'item', no el objeto completo

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
    guardarFactura () {
      const productos = this.filas.map((fila) => {
        const producto = this.productos.find(prod => prod.id === fila.item)
        return {
          nombreproducto: producto?.item || '',
          referencia: fila.referencia || '',
          precio: parseFloat(fila.precio) || 0,
          descuento: parseFloat(fila.descuento) || 0,
          impuesto: parseFloat(fila.impuesto) || 0,
          descripcion: fila.descripcion || '',
          cantidad: parseInt(fila.cantidad) || 0,
          total: parseFloat(fila.total) || 0
        }
      })

      const productosValidos = productos.every(p =>
    p.nombreproducto &&
    p.referencia &&
    p.precio >= 0 &&
    p.cantidad > 0 &&
    p.total >= 0
      )

      if (!productosValidos) {
        alert('Hay errores en los datos de los productos. Por favor, verifica.')
        return
      }

      const contacto = this.contactos.find(c => c.id === this.contactoSeleccionado)

      const facturaData = {
        numeracion: this.numeracionSeleccionada,
        cliente: contacto.nombre,
        telefono: contacto.telefono,
        observaciones: this.observaciones,
        iniciofecha: this.fechaInicio,  
        ultimafecha: this.ultimaFecha,
        termino: this.terminoFecha,
        expiracion: this.fechaExpiracion,
        frecuencia: this.frecuenciaSeleccionada,
        listprecio: this.listaPrecioSeleccionada,
        notafacturas: this.notas,
        producto: productos,

        total: this.total
      }

      if (this.update) {
        // Si estamos en modo edición, actualiza la factura
        this.$axios.put(`/facturas/update/${this.facturaEditada.id}`, facturaData)
          .then((response) => {
            if (response.data.success) {
              this.limpiarFormulario()
              this.$emit('guardado')
            } else {
              console.error(response.data.message)
            }
          })
          .catch((error) => {
            console.error('Error al actualizar la factura', error)
          })
      } else {
        // Si estamos creando una factura nueva
        this.$axios.post('/facturas/create', facturaData)
          .then((response) => {
            if (response.data.success) {
              this.limpiarFormulario()
              this.$emit('guardado')
            } else {
              console.error(response.data.message)
            }
          })
          .catch((error) => {
            console.error('Error al guardar la factura', error)
          })
      }
    },
    limpiarFormulario () {
      this.contactoSeleccionado = null
      this.numeracionSeleccionada = ''
      this.observaciones = ''
      this.fechaInicio = ''
      this.ultimaFecha = ''
      this.terminoFecha = ''
      this.fechaExpiracion = ''
      this.frecuenciaSeleccionada = ''
      this.listaPrecioSeleccionada = ''
      this.notas = ''
      this.filas = [{
        item: null,
        referencia: '',
        precio: 0,
        descuento: 0,
        impuesto: 0,
        descripcion: '',
        cantidad: 1,
        total: 0
      }]
      this.subtotal = 0
      this.impuestos = 0
      this.total = 0
    },
    actualizarTelefono () {
      const contacto = this.contactos.find(c => c.id === this.contactoSeleccionado)
      this.telefono = contacto ? contacto.telefono : ''
    },
    cancelar () {
      this.$emit('click-cancel')
    }
  }
}
</script>

  <style scoped>
  .quote-container {
    margin: 0 auto;
  }
  </style>